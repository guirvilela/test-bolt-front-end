import { formatCurrency } from "@/lib/currency";
import { WalletIcon } from "@heroicons/react/16/solid";

interface WalletProps {
  value: number;
}
export function Wallet({ value }: WalletProps) {
  return (
    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
      <WalletIcon className="text-green-600 size-5 " />
      <span className="text-green-700 font-semibold">
        Saldo: {formatCurrency(value)}
      </span>
    </div>
  );
}
