import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightLeft, Plus } from "lucide-react";

interface CardTransactionProps {
  activeOperation: "deposit" | "transfer";
  amount: string;
  recipientId?: string;
  onActiveOperation: (v: "deposit" | "transfer") => void;
  onSetAmount: (v: string) => void;
  onSetRecipientId: (v: string) => void;
  onSubmit: () => void;
}

export function CardTransaction({
  activeOperation,
  amount,
  recipientId,
  onSetRecipientId,
  onSetAmount,
  onActiveOperation,
  onSubmit,
}: CardTransactionProps) {
  return (
    <section className=" p-6 pt-0 space-y-4">
      <select
        className="w-full p-3 rounded-xl border border-gray-200 focus:border-background-primary
                     focus:outline-none focus:ring-2 focus:ring-background-primary/20"
        value={activeOperation}
        onChange={(e) =>
          onActiveOperation(e.target.value as "deposit" | "transfer")
        }
      >
        <option value="deposit">Depósito</option>
        <option value="transfer">Transferência</option>
      </select>

      <Input
        label="Valor da operação"
        type="number"
        placeholder="R$ 0,00"
        value={amount}
        onChange={(e) => onSetAmount(e.target.value)}
      />

      {activeOperation === "transfer" && (
        <Input
          label="ID do destinatário"
          placeholder="Digite o ID do destinatário"
          value={recipientId}
          onChange={(e) => onSetRecipientId(e.target.value)}
        />
      )}

      <Button
        className="flex items-center justify-center gap-4"
        onClick={onSubmit}
        variant="primary"
      >
        <div className="w-4 ">
          {activeOperation === "deposit" ? <Plus /> : <ArrowRightLeft />}
        </div>
        {activeOperation === "deposit" ? "Depositar" : "Transferir"}
      </Button>
    </section>
  );
}
