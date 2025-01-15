import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useAuthContext } from "@/context/authContext";
import { OperationHistory } from "@/hooks/dashboard";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { Operation } from "../operation";

interface CardOperationsProps {
  operationHistory: OperationHistory[];
  loading: boolean;
  onRevertOperation: (operation: OperationHistory) => void;
}

export function CardOperations({
  operationHistory,
  loading,
  onRevertOperation,
}: CardOperationsProps) {
  const revertedIds = new Set(
    operationHistory
      .filter((operation) => operation.revertId)
      .map((operation) => operation.revertId)
  );

  const { user } = useAuthContext();

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <header className="p-6 pb-2">
        <h3 className="text-xl font-semibold leading-none tracking-tight flex items-center gap-2 text-gray-800">
          <div className="text-background-primary">
            <ArrowPathIcon className="size-5" />
          </div>
          Histórico de Operações
        </h3>
      </header>

      <section className="p-6 pt-0">
        {loading ? (
          <Loading dark />
        ) : operationHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma operação realizada
          </div>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {operationHistory.map((operation, index) => (
              <div
                key={operation.id || `${operation.timestamp}-${operation.type}`}
                className="p-4 rounded-xl border border-gray-100 hover:border-background-primary/30 transition-all duration-200 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <Operation operation={operation} />

                  {index === 0 &&
                    !operation.type.startsWith("revert") &&
                    !revertedIds.has(operation.id) &&
                    (operation.type === "deposit" ||
                      (operation.type === "transfer" &&
                        operation.recipientName !== user?.username)) && (
                      <Button
                        fullWidth={false}
                        onClick={() => onRevertOperation(operation)}
                        className="hover:text-background-primary"
                      >
                        <ArrowPathIcon className="size-6" />
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
