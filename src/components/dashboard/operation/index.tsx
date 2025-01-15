import { OperationHistory } from "@/hooks/dashboard";
import { formatCurrency } from "@/lib/currency";
import { parseIso } from "@/lib/date";

interface OperationProps {
  operation: OperationHistory;
}

export function Operation({ operation }: OperationProps) {
  return (
    <div>
      <p className="font-medium text-gray-800">
        {operation.type.startsWith("revert")
          ? "Reversão de operação"
          : operation.type === "deposit"
          ? "Depósito"
          : operation.type === "received"
          ? `Transferência recebida de ${operation.senderName}`
          : `Transferência para ${operation.recipientName}`}
      </p>
      <p
        className={`text-xl font-medium ${
          operation.type === "deposit" || operation.type === "received"
            ? "text-green-500"
            : operation.type === "transfer"
            ? "text-red-500"
            : ""
        }`}
      >
        {operation.type === "deposit" || operation.type === "received"
          ? `+${formatCurrency(operation.amount)}`
          : `${formatCurrency(operation.amount)}`}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        {parseIso(String(operation.timestamp))}
      </p>
    </div>
  );
}
