import { CardOperations } from "@/components/dashboard/card-operations";
import { useAuthContext } from "@/context/authContext";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

// Mocking external dependencies
jest.mock("@/context/authContext");
jest.mock("@/components/ui/loading", () => ({
  Loading: jest.fn(() => <div>Loading...</div>),
}));
jest.mock("@heroicons/react/16/solid", () => ({
  ArrowPathIcon: jest.fn(() => <svg>Arrow</svg>),
}));

const mockRevertOperation = jest.fn();

const operationHistory = [
  {
    id: "1",
    type: "transfer",
    recipientName: "jane_doe",
    revertId: undefined,
    timestamp: "2023-01-01",
    amount: 0,
    balance: 100,
  },
  {
    id: "2",
    type: "deposit",
    recipientName: "john_doe",
    revertId: undefined,
    timestamp: "2023-01-02",
    amount: 0,
    balance: 100,
  },
];

// Tipando o uso do mock
const mockUseAuthContext = useAuthContext as jest.Mock;

describe("CardOperations", () => {
  const mockOnRevertOperation = jest.fn();

  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      user: { username: "testuser" },
    });
  });

  it("should render loading state", () => {
    render(
      <CardOperations
        operationHistory={[]}
        loading={true}
        onRevertOperation={mockOnRevertOperation}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render message when no operations", () => {
    render(
      <CardOperations
        operationHistory={[]}
        loading={false}
        onRevertOperation={mockOnRevertOperation}
      />
    );

    expect(screen.getByText("Nenhuma operação realizada")).toBeInTheDocument();
  });

  it("should render operations and call onRevertOperation", () => {
    render(
      <CardOperations
        operationHistory={operationHistory}
        loading={false}
        onRevertOperation={mockOnRevertOperation}
      />
    );

    const revertButton = screen.getByRole("button");
    expect(revertButton).toBeInTheDocument();

    fireEvent.click(revertButton);

    expect(mockOnRevertOperation).toHaveBeenCalledWith(operationHistory[0]);
  });

  it("should display operations with revert button", () => {
    mockUseAuthContext.mockReturnValue({
      user: { username: "john_doe" },
    });

    render(
      <CardOperations
        operationHistory={operationHistory}
        loading={false}
        onRevertOperation={mockRevertOperation}
      />
    );

    const revertButton = screen.getByRole("button");
    expect(revertButton).toBeInTheDocument();

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(1);
  });

  it("should not show revert button for operations with the same recipientName", () => {
    mockUseAuthContext.mockReturnValue({
      user: { username: "john_doe" },
    });

    render(
      <CardOperations
        operationHistory={operationHistory}
        loading={false}
        onRevertOperation={mockRevertOperation}
      />
    );

    const revertButton = screen.getByRole("button");
    expect(revertButton).toBeInTheDocument();

    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBe(1);
  });
});
