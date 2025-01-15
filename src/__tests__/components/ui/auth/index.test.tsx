import { AuthForm } from "@/components/ui/auth";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("AuthForm Component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnSetUsername = jest.fn();
  const mockOnSetPassword = jest.fn();
  const mockOnSetEmail = jest.fn();
  const mockOnToggleMode = jest.fn();

  const defaultProps = {
    title: "Login",
    username: "",
    password: "",
    email: "",
    error: null,
    loading: false,
    onSetUsername: mockOnSetUsername,
    onSetPassword: mockOnSetPassword,
    onSetEmail: mockOnSetEmail,
    onSubmit: mockOnSubmit,
    onToggleMode: mockOnToggleMode,
    toggleButtonText: "Switch to Register",
    submitButtonText: "Login",
  };

  it("should render the AuthForm correctly", async () => {
    render(<AuthForm {...defaultProps} />);

    expect(
      await screen.findByRole("heading", { name: /login/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Usuário")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Switch to Register")).toBeInTheDocument();
  });

  it("should call onSubmit when the form is submitted", async () => {
    render(<AuthForm {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Usuário"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password" },
    });

    const loginButton = await screen.findByTestId("test-auth-btn-login");
    fireEvent.submit(loginButton);

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("should disable the submit button when loading", () => {
    render(<AuthForm {...defaultProps} loading={true} />);
    expect(screen.getByTestId("test-auth-btn-login")).toBeDisabled();
    expect(screen.getByTestId("normal-loading")).toBeInTheDocument();
  });

  it("should display error message when error prop is provided", () => {
    render(<AuthForm {...defaultProps} error="Invalid credentials" />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("should show email input if showEmail is true", () => {
    render(<AuthForm {...defaultProps} showEmail={true} />);
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
  });

  it("should not show email input if showEmail is false", () => {
    render(<AuthForm {...defaultProps} showEmail={false} />);
    expect(screen.queryByPlaceholderText("E-mail")).not.toBeInTheDocument();
  });

  it("should toggle form mode when toggle button is clicked", () => {
    render(<AuthForm {...defaultProps} />);
    fireEvent.click(screen.getByText("Switch to Register"));
    expect(mockOnToggleMode).toHaveBeenCalled();
  });

  it("should call onSetEmail when email is entered", () => {
    const mockOnSetEmail = jest.fn();
    render(
      <AuthForm
        {...defaultProps}
        showEmail={true}
        onSetEmail={mockOnSetEmail}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });

    expect(mockOnSetEmail).toHaveBeenCalledWith("test@example.com");
  });
});
