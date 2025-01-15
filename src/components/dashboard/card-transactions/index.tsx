import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ArrowsRightLeftIcon, PlusIcon } from "@heroicons/react/16/solid";

import React from "react";

interface CardTransactionProps {
  activeOperation: "deposit" | "transfer" | "received";
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
  const options = React.useMemo(
    () => [
      { value: "deposit", label: "Depósito" },
      { value: "transfer", label: "Transferência" },
    ],
    [activeOperation]
  );

  return (
    <section className=" p-6 pt-0 space-y-4">
      <Select
        value={activeOperation}
        onChange={(v) => onActiveOperation(v as "deposit" | "transfer")}
        options={options}
      />

      <Input
        label="Valor da operação"
        type="number"
        placeholder="R$ 0,00"
        value={amount}
        onChange={(e) => onSetAmount(e.target.value)}
        data-testid="test-card-transaction-value"
      />

      {activeOperation === "transfer" && (
        <Input
          label="ID do destinatário"
          placeholder="Digite o ID do destinatário"
          value={recipientId}
          onChange={(e) => onSetRecipientId(e.target.value)}
          data-testid="test-card-transaction-id"
        />
      )}

      <Button
        className="flex items-center justify-center gap-4"
        onClick={onSubmit}
        variant="primary"
      >
        <div className="w-4 ">
          {activeOperation === "deposit" ? (
            <PlusIcon className="size-6" />
          ) : (
            <ArrowsRightLeftIcon className="size-6" />
          )}
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
