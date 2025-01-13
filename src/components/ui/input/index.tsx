import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-md font-medium  text-gray-700">
          {label}
        </label>
      )}
      <input
        {...rest}
        className={cn(
          `w-full p-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 
           rounded-xl transition-all duration-200 hover:border-background-primary/50 
           focus:border-background-primary focus:outline-none focus:ring-2 focus:ring-background-primary/20`,
          error && "border-red-300 focus:border-red-500 focus:ring-red-200",
          rest.className
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
