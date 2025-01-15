import { CardTransaction } from "@/components/dashboard/card-transactions";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock functions
const mockOnActiveOperation = jest.fn();
const mockOnSetAmount = jest.fn();
const mockOnSetRecipientId = jest.fn();
const mockOnSubmit = jest.fn();

describe("CardTransaction", () => {
  it("should render with deposit operation", () => {
    render(
      <CardTransaction
        activeOperation="deposit"
        amount="100"
        errors={[]}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByDisplayValue("Depósito")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("R$ 0,00")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Depositar/i })
    ).toBeInTheDocument();
  });

  it("should render with transfer operation", () => {
    render(
      <CardTransaction
        activeOperation="transfer"
        amount="50"
        recipientId="123"
        errors={[]}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByDisplayValue("Transferência")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("R$ 0,00")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite o ID do destinatário")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Transferir/i })
    ).toBeInTheDocument();
  });

  it("should call onSubmit when the button is clicked", () => {
    render(
      <CardTransaction
        activeOperation="deposit"
        amount="100"
        errors={[]}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole("button", { name: /Depositar/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should show errors if errors array is not empty", () => {
    const errors = ["Campo obrigatório", "Valor inválido"];

    render(
      <CardTransaction
        activeOperation="deposit"
        amount="100"
        errors={errors}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Valor inválido")).toBeInTheDocument();
  });

  it("should change operation when Select is changed", () => {
    render(
      <CardTransaction
        activeOperation="deposit"
        amount="100"
        errors={[]}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "transfer" } });

    expect(mockOnActiveOperation).toHaveBeenCalledWith("transfer");
  });

  it("should call onSetAmount when the input value is changed", () => {
    render(
      <CardTransaction
        activeOperation="deposit"
        amount="100"
        errors={[]}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    // Verificar se o input de valor da operação chama onSetAmount
    const inputValue = screen.getByTestId("test-card-transaction-value");
    fireEvent.change(inputValue, { target: { value: "200" } });

    expect(mockOnSetAmount).toHaveBeenCalledWith("200");
  });

  it("should call onSetRecipientId when the recipient ID input value is changed", () => {
    render(
      <CardTransaction
        activeOperation="transfer"
        amount="50"
        recipientId="123"
        errors={[]}
        onActiveOperation={mockOnActiveOperation}
        onSetAmount={mockOnSetAmount}
        onSetRecipientId={mockOnSetRecipientId}
        onSubmit={mockOnSubmit}
      />
    );

    // Verificar se o input de ID do destinatário chama onSetRecipientId
    const inputRecipientId = screen.getByTestId("test-card-transaction-id");
    fireEvent.change(inputRecipientId, { target: { value: "456" } });

    expect(mockOnSetRecipientId).toHaveBeenCalledWith("456");
  });
});
