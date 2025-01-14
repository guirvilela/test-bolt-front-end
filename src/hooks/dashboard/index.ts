import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

export interface Operation {
  id: string | number;
  type: "deposit" | "transfer" | `revert${string}`;
  amount: number;
  timestamp: string | number;
  originalOperation?: string | number;
  recipient?: string;
  balance: number;
}

export function useDashboardController() {
  const [balance, setBalance] = React.useState(0);
  const [operationHistory, setOperationHistory] = React.useState<Operation[]>(
    []
  );
  const [amount, setAmount] = React.useState("");
  const [recipientId, setRecipientId] = React.useState("");
  const [activeOperation, setActiveOperation] = React.useState<
    "deposit" | "transfer"
  >("deposit");
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const { user, clearUser } = useAuthContext();
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
      console.error("ID do usuário não está disponível");
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
      const { id, balance, name, email } = data;

      setBalance(balance);

      const operation: Operation = {
        id,
        type: "deposit",
        amount: balance,
        timestamp: new Date().toISOString(),
        balance,
      };

      console.log("Operação registrada:", operation);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }, [user, setBalance]);

  const getUserOperations = React.useCallback(async () => {
    setLoading(true);
    if (!user?.id) {
      console.error("ID do usuário não está disponível");
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
      console.log("Operações carregadas:", data.operations);
    } catch (error) {
      console.error("Erro ao buscar operações do usuário:", error);
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
        const { balance, name, email, id } = data;

        setBalance(balance);
        const operation: Operation = {
          id,
          type: "deposit",
          amount: depositAmount,
          timestamp: new Date().toISOString(),
          balance,
        };

        setOperationHistory([operation, ...operationHistory]);
        handleSetAmount("");
        setErrors([]);

        console.log(`Depósito feito com sucesso para ${name} (${email})`);
      } else {
        // Caso a resposta não seja ok, exibe os erros
        setErrors([data.message || "Erro ao processar o depósito"]);
      }
    } catch (error) {
      console.error("Erro ao chamar a API de depósito", error);
      setErrors(["Erro ao processar o depósito"]);
    }
  }, [amount, operationHistory]);

  const handleTransfer = React.useCallback(() => {
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

    const newBalance = balance - transferAmount;
    const operation: Operation = {
      id: Date.now(),
      type: "transfer",
      amount: transferAmount,
      recipient: recipientId,
      timestamp: new Date().toISOString(),
      balance: newBalance,
    };

    setBalance(newBalance);
    setOperationHistory([operation, ...operationHistory]);

    setAmount("");
    setRecipientId("");
    setErrors([]);
  }, [balance, amount, recipientId, activeOperation, operationHistory]);

  const handleRevert = React.useCallback(
    (operation: Operation) => {
      const isAlreadyReverted = operationHistory.some(
        (op) => op.originalOperation === operation.id
      );

      if (isAlreadyReverted) {
        setErrors(["Essa operação já foi revertida"]);
        return;
      }

      let newBalance = balance;
      if (operation.type === "deposit") {
        newBalance -= operation.amount;
      } else if (operation.type === "transfer") {
        newBalance += operation.amount;
      }

      const revertOperation: Operation = {
        id: Date.now(),
        type: `revert_${operation.type}`,
        amount: operation.amount,
        originalOperation: operation.id,
        timestamp: new Date().toISOString(),
        balance: newBalance,
      };

      setBalance(newBalance);
      setOperationHistory([revertOperation, ...operationHistory]);

      setErrors([]);
    },
    [balance, operationHistory]
  );

  const logout = React.useCallback(() => {
    clearUser();
    router.push("/");
  }, [user, router]);

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
    },
    [activeOperation]
  );

  React.useEffect(() => {
    if (user && user.id) {
      getUserData();

      getUserOperations();
    }
  }, [user]);

  React.useEffect(() => {
    if (!user || !user.id) {
      router.push("/");
    }
  }, [user, router]);

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
