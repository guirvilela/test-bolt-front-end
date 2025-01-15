import { Register } from "@/components/register";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockOnSetUsername = jest.fn();
const mockOnSetPassword = jest.fn();
const mockOnSetEmail = jest.fn();
const mockOnSubmit = jest.fn();
const mockOnSetRegister = jest.fn();

describe("Register Component", () => {
  it("should call onSetUsername when the username is changed", async () => {
    render(
      <Register
        username=""
        password=""
        email=""
        error={null}
        loading={false}
        onSetUsername={mockOnSetUsername}
        onSetPassword={mockOnSetPassword}
        onSetEmail={mockOnSetEmail}
        onSubmit={mockOnSubmit}
        onSetRegister={mockOnSetRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Usuário"), {
      target: { value: "newUsername" },
    });

    expect(mockOnSetUsername).toHaveBeenCalledWith("newUsername");
  });

  it("should call onSetPassword when the password is changed", async () => {
    render(
      <Register
        username=""
        password=""
        email=""
        error={null}
        loading={false}
        onSetUsername={mockOnSetUsername}
        onSetPassword={mockOnSetPassword}
        onSetEmail={mockOnSetEmail}
        onSubmit={mockOnSubmit}
        onSetRegister={mockOnSetRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "newPassword123" },
    });

    expect(mockOnSetPassword).toHaveBeenCalledWith("newPassword123");
  });

  it("should call onSetEmail when the email is changed", async () => {
    render(
      <Register
        username=""
        password=""
        email=""
        error={null}
        loading={false}
        onSetUsername={mockOnSetUsername}
        onSetPassword={mockOnSetPassword}
        onSetEmail={mockOnSetEmail}
        onSubmit={mockOnSubmit}
        onSetRegister={mockOnSetRegister}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "user@example.com" },
    });

    expect(mockOnSetEmail).toHaveBeenCalledWith("user@example.com");
  });

  it("should call onSubmit when the form is submitted", async () => {
    const mockOnSubmit = jest.fn();

    const { getByTestId } = render(
      <Register
        username=""
        password=""
        email=""
        error={null}
        loading={false}
        onSetUsername={mockOnSetUsername}
        onSetPassword={mockOnSetPassword}
        onSetEmail={mockOnSetEmail}
        onSubmit={mockOnSubmit}
        onSetRegister={mockOnSetRegister}
      />
    );

    fireEvent.change(getByTestId("test-user-input"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByTestId("test-user-password"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByTestId("test-user-email"), {
      target: { value: "testuser@example.com" },
    });

    fireEvent.submit(getByTestId("test-auth-btn-login"));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });
});
