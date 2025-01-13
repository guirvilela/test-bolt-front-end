"use client";

import { Wallet } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  return (
    <div className=" max-w-7xl mx-auto  bg-white p-8 h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Financeiro
          </h1>

          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
            <Wallet className="text-green-600" />
            <span className="text-green-700 font-semibold">
              Saldo: R$ {balance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
