import React, { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export function Select({ value, options, onChange, ...rest }: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value); // Extrai o valor e chama o onChange fornecido
  };

  return (
    <select
      className="w-full p-3 rounded-xl border border-gray-200 focus:border-background-primary
                 focus:outline-none focus:ring-2 focus:ring-background-primary/20"
      value={value}
      onChange={handleChange}
      {...rest}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
