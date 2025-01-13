"use client";

import { CardTransaction } from "@/components/dashboard/card-transactions";
import { Wallet } from "@/components/dashboard/wallet";
import { Button } from "@/components/ui/button";
import { useDashboardController } from "@/hooks/dashboard";
import { ArrowRightLeft, BadgePlus, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const {
    activeOperation,
    amount,
    balance,
    operationHistory,
    recipientId,
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
        />

        <hr />

        <div className="rounded-xl   bg-white shadow-sm">
          <header className="p-6 pb-2">
            <h3 className="text-xl font-semibold leading-none tracking-tight  flex items-center gap-2 text-gray-800">
              <div className="text-background-primary">
                <RotateCcw />
              </div>
              Histórico de Operações
            </h3>
          </header>

          <section className="p-6 pt-0">
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {operationHistory.map((operation) => (
                <div
                  key={operation.id}
                  className="p-4 rounded-xl border border-gray-100 hover:border-background-primary/30 
                             transition-all duration-200 bg-white shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">
                        {operation.type.startsWith("revert")
                          ? "Reversão de operação"
                          : operation.type === "deposit"
                          ? "Depósito"
                          : "Transferência"}
                      </p>
                      <p className="text-[#5bc4be] font-semibold">
                        R$ {operation.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(operation.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!operation.type.startsWith("revert") && (
                      <Button
                        fullWidth={false}
                        onClick={() => handleRevert(operation)}
                        className="hover:text-[#5bc4be]"
                      >
                        <RotateCcw />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {operationHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Nenhuma operação realizada
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
