import { DepositResponse } from "@/app/api/balance/deposit/types";
import { RevertResponse } from "@/app/api/balance/revert/types";
import { TransferResponse } from "@/app/api/balance/transfer/types";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

export type OperationHistory =
  | DepositResponse
  | TransferResponse
  | RevertResponse;

export function useDashboardController() {
  const [balance, setBalance] = React.useState(0);
  const [operationHistory, setOperationHistory] = React.useState<
    OperationHistory[]
  >([]);
  const [amount, setAmount] = React.useState("");
  const [recipientId, setRecipientId] = React.useState("");
  const [activeOperation, setActiveOperation] = React.useState<
    "deposit" | "transfer" | "received"
  >("deposit");
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { user, setUser, clearUser } = useAuthContext();
  const router = useRouter();

  const transactionValidation = z.object({
    activeOperation: z.enum(["deposit", "transfer"]),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Valor da operação deve ser um número maior que 0",
    }),
    recipientId: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (activeOperation === "transfer" && (!val || val.trim() === "")) {
            return false;
          }
          return true;
        },
        {
          message:
            "ID do destinatário não pode estar vazio para transferências",
        }
      ),
  });

  const getUserData = React.useCallback(async () => {
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(`/api/user?id=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage =
          (await response.json()).message || "Erro ao buscar dados do usuário";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const { balance } = data;

      setBalance(balance);
    } catch (error) {}
  }, [user, setBalance]);

  const getUserOperations = React.useCallback(async () => {
    setLoading(true);
    if (!user?.id) {
      return;
    }

    try {
      const response = await fetch(`/api/operations?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setOperationHistory(data.operations || []);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleDeposit = React.useCallback(async () => {
    const depositAmount = Number(amount);

    const validationResult = transactionValidation.safeParse({
      amount,
      recipientId,
      activeOperation,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map(
        (err) => err.message
      );
      setErrors(validationErrors);
      return;
    }

    if (!depositAmount || depositAmount <= 0) {
      setErrors(["Valor inválido para depósito"]);
      return;
    }

    try {
      const response = await fetch("/api/balance/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          depositAmount,
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { balance, id, userId } = data;

        setBalance(balance);

        handleSetAmount("");
        setErrors([]);
      } else {
        setErrors([data.message || "Erro ao processar o depósito"]);
      }
    } catch (error) {
      setErrors(["Erro ao processar o depósito"]);
    } finally {
      getUserOperations();
    }
  }, [amount, operationHistory]);

  const handleTransfer = React.useCallback(async () => {
    const transferAmount = parseFloat(amount);

    const validationResult = transactionValidation.safeParse({
      amount,
      recipientId,
      activeOperation,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map(
        (err) => err.message
      );
      setErrors(validationErrors);
      return;
    }

    if (!transferAmount || transferAmount <= 0) {
      setErrors(["Valor inválido para transferência"]);
      return;
    }

    if (balance < transferAmount) {
      setErrors(["Saldo insuficiente para realizar a transferência"]);
      return;
    }

    try {
      const res = await fetch("/api/balance/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transferAmount,
          senderId: user?.id,
          receiverId: recipientId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors([data.message || "Erro ao realizar a transferência"]);
        return;
      }

      const newBalance = data.senderBalance;

      setBalance(newBalance);

      setAmount("");
      setRecipientId("");
      setErrors([]);
    } catch (error) {
      setErrors(["Erro ao se conectar com o servidor"]);
    } finally {
      getUserOperations();
    }
  }, [balance, amount, recipientId, user, operationHistory]);

  const handleRevert = React.useCallback(
    async (operation: OperationHistory) => {
      const amount = Number(operation.amount);
      let newBalance = Number(balance);

      let balanceAfterRevert = 0;

      if (operation.type === "deposit") {
        newBalance -= amount;
        balanceAfterRevert = newBalance;
      } else if (operation.type === "transfer") {
        if (operation.senderId === operation.userId) {
          newBalance -= amount;
        }
        balanceAfterRevert = newBalance;
      }

      if (isNaN(balanceAfterRevert)) {
        setErrors(["Erro ao calcular o saldo após a reversão"]);
        return;
      }

      setOperationHistory(operationHistory);

      try {
        const response = await fetch("/api/balance/revert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: operation.id,
            userId: operation.userId,
            amount: amount,
            type: `revert_${operation.type}`,
            balanceAfterRevert: balanceAfterRevert,
            senderId: operation.senderId,
            recipientId: operation.recipientId,
            recipientName: operation.recipientName,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          const { balance } = responseData;

          setBalance(balance);
          setErrors([]);
        } else {
          const errorData = await response.json();
          setErrors([errorData.message || "Erro ao reverter a operação"]);
        }
      } catch (error) {
        setErrors(["Erro ao se comunicar com o servidor"]);
      } finally {
        getUserOperations();
      }
    },
    [balance, operationHistory]
  );

  const handleSetAmount = React.useCallback(
    (amount: string) => {
      setAmount(amount);
    },
    [amount]
  );

  const handleSetRecipientId = React.useCallback(
    (recipientId: string) => {
      setRecipientId(recipientId);
    },
    [recipientId]
  );

  const handleSetActiveOperation = React.useCallback(
    (operation: "deposit" | "transfer") => {
      setActiveOperation(operation);
      setRecipientId("");
    },
    [activeOperation, recipientId]
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem("bolt-user");

    clearUser();

    router.push("/login");
  }, [user, router, localStorage]);

  React.useEffect(() => {
    if (user && user.id) {
      getUserData();

      getUserOperations();
    }
  }, [user]);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("bolt-user");

    if (!user || !user.id) {
      if (!storedUser) {
        router.push("/");
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, router, setUser]);

  return {
    balance,
    operationHistory,
    amount,
    recipientId,
    activeOperation,
    transactionValidation,
    errors,
    loading,
    logout,
    handleSetAmount,
    handleSetRecipientId,
    handleSetActiveOperation,
    handleTransfer,
    handleDeposit,
    handleRevert,
  };
}
