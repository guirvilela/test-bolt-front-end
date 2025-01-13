import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cn(
        `w-full p-3 bg-white/10  text-white placeholder:text-content-placeholder placeholder-white/70 rounded-xl 
            border border-transparent hover:border-border-secondary hover:text-content-body active:border-border-tertiary  focus:outline-none focus:ring-2 
                          focus:ring-cyan-500`,
        rest.className
      )}
    />
  );
}
