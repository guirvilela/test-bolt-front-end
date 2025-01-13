import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React from "react";

interface Operation {
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

  const { user, clearUser } = useAuthContext();
  const router = useRouter();

  const handleDeposit = React.useCallback(() => {
    const depositAmount = parseFloat(amount);
    if (!depositAmount || depositAmount <= 0) return;

    const newBalance = balance + depositAmount;
    const operation: Operation = {
      id: Date.now(),
      type: "deposit",
      amount: depositAmount,
      timestamp: new Date().toISOString(),
      balance: newBalance,
    };

    setBalance(newBalance);
    setOperationHistory([operation, ...operationHistory]);
    handleSetAmount("");
  }, [balance, amount, operationHistory]);

  const handleTransfer = () => {
    const transferAmount = parseFloat(amount);
    if (!transferAmount || transferAmount <= 0 || !recipientId) return;
    if (transferAmount > balance) {
      alert("Saldo insuficiente");
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
  };

  const handleRevert = (operation: Operation) => {
    if (operation.type === "deposit") {
      setBalance(balance - operation.amount);
    } else if (operation.type === "transfer") {
      setBalance(balance + operation.amount);
    }

    const revertOperation: Operation = {
      id: Date.now(),
      type: `revert_${operation.type}`,
      amount: operation.amount,
      originalOperation: operation.id,
      timestamp: new Date().toISOString(),
      balance:
        operation.type === "deposit"
          ? balance - operation.amount
          : balance + operation.amount,
    };

    setOperationHistory([revertOperation, ...operationHistory]);
  };

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

  return {
    balance,
    operationHistory,
    amount,
    recipientId,
    activeOperation,
    logout,
    handleSetAmount,
    handleSetRecipientId,
    handleSetActiveOperation,
    handleTransfer,
    handleDeposit,
    handleRevert,
  };
}
