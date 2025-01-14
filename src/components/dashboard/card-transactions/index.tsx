import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ArrowRightLeft, Plus } from "lucide-react";
import React from "react";

interface CardTransactionProps {
  activeOperation: "deposit" | "transfer";
  amount: string;
  recipientId?: string;
  errors: string[];
  onActiveOperation: (v: "deposit" | "transfer") => void;
  onSetAmount: (v: string) => void;
  onSetRecipientId: (v: string) => void;
  onSubmit: () => void;
}

export function CardTransaction({
  activeOperation,
  amount,
  recipientId,
  errors,
  onSetRecipientId,
  onSetAmount,
  onActiveOperation,
  onSubmit,
}: CardTransactionProps) {
  const handleActiveOperationChange = (value: string) => {
    onActiveOperation(value as "deposit" | "transfer");
  };

  const options = React.useMemo(
    () => [
      { value: "deposit", label: "Depósito" },
      { value: "transfer", label: "Transferência" },
    ],
    []
  );

  return (
    <section className=" p-6 pt-0 space-y-4">
      <Select
        value={activeOperation}
        onChange={handleActiveOperationChange}
        options={options}
      />

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

      {errors.length > 0 && (
        <ul className="list-disc pl-5 ">
          {errors.map((err, index) => (
            <li key={index} className="text-sm text-red-600">
              {err}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
