import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  fullWidth = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "p-3 font-semibold rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-background-primary hover:bg-background-secondary focus:ring-cyan-400 text-white",
    secondary:
      "bg-transparent border border-white/20 hover:bg-white/10 text-white focus:ring-white/20",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={cn(baseStyles, variants[variant], widthClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
