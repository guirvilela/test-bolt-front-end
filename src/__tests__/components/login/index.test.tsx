import { Login } from "@/components/login";
import { fireEvent, render, waitFor } from "@testing-library/react";

test("should call onSubmit when the form is submitted", async () => {
  const mockOnSubmit = jest.fn();
  const mockOnSetUsername = jest.fn();
  const mockOnSetPassword = jest.fn();
  const mockOnSetRegister = jest.fn();

  const { getByTestId } = render(
    <Login
      username=""
      password=""
      error={null}
      loading={false}
      onSetUsername={mockOnSetUsername}
      onSetPassword={mockOnSetPassword}
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

  fireEvent.submit(getByTestId("test-auth-btn-login"));

  await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
});
