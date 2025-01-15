import { Wallet } from "@/components/dashboard/wallet";
import * as currencyModule from "@/lib/currency";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

jest.mock("@/lib/currency");

test("should display formatted value", () => {
  const value = 1000;
  (currencyModule.formatCurrency as jest.Mock).mockReturnValue("R$ 1,000.00");

  const { getByText } = render(<Wallet value={value} />);

  expect(currencyModule.formatCurrency).toHaveBeenCalledWith(value);

  //Não encontra o texto com tipo monetário, então precisa quebrar em partes
  expect(getByText(/R\$\s?1,000\.00/)).toBeInTheDocument();
});
