"use client";

import { CardOperations } from "@/components/dashboard/card-operations";
import { CardTransaction } from "@/components/dashboard/card-transactions";
import { Wallet } from "@/components/dashboard/wallet";
import { Button } from "@/components/ui/button";
import { useDashboardController } from "@/hooks/dashboard";
import { ArrowRightLeft, BadgePlus } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const {
    activeOperation,
    amount,
    balance,
    operationHistory,
    recipientId,
    errors,
    loading,
    logout,
    handleDeposit,
    handleRevert,
    handleTransfer,
    handleSetActiveOperation,
    handleSetAmount,
    handleSetRecipientId,
  } = useDashboardController();

  return (
    <div className=" flex flex-col gap-3 max-w-7xl mx-auto p-8 h-screen">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="mb-4">
          <img src="/images/logo.svg" />
        </Link>

        <Button className="max-w-32 w-32" onClick={logout}>
          Sair
        </Button>
      </div>

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Financeiro
        </h1>

        <Wallet value={balance} />
      </header>

      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white shadow-sm">
        <header className="p-6 pb-2">
          <h3 className=" text-xl font-semibold leading-none tracking-tight  flex items-center gap-2 text-gray-800">
            <div className="text-background-primary">
              {activeOperation === "deposit" ? (
                <BadgePlus />
              ) : (
                <ArrowRightLeft />
              )}
            </div>
            {activeOperation === "deposit"
              ? "Realizar Depósito"
              : "Realizar Transferência"}
          </h3>
        </header>

        <CardTransaction
          activeOperation={activeOperation}
          amount={amount}
          recipientId={recipientId}
          onActiveOperation={handleSetActiveOperation}
          onSetAmount={handleSetAmount}
          onSetRecipientId={handleSetRecipientId}
          onSubmit={() =>
            activeOperation === "deposit" ? handleDeposit() : handleTransfer()
          }
          errors={errors}
        />

        <hr />

        <CardOperations
          operationHistory={operationHistory}
          onRevertOperation={handleRevert}
          loading={loading}
        />
      </div>
    </div>
  );
}
