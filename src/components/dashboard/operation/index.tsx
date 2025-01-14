import { Operation as OperationProp } from "@/hooks/dashboard";
import { formatCurrency } from "@/lib/currency";

interface OperationProps {
  operation: OperationProp;
}

export function Operation({ operation }: OperationProps) {
  return (
    <div>
      <p className="font-medium text-gray-800">
        {operation.type.startsWith("revert")
          ? "Reversão de operação"
          : operation.type === "deposit"
          ? "Depósito"
          : `Transferência para ${operation.recipient}`}
      </p>
      <p className="text-background-primary font-medium text-xl">
        {formatCurrency(operation.amount)}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        {new Date(operation.timestamp).toLocaleString()}
      </p>
    </div>
  );
}
