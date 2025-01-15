import { Input } from "@/components/ui/input";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Input Component", () => {
  it("should render the input with the label", () => {
    render(<Input label="Test Label" placeholder="Enter something" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter something")).toBeInTheDocument();
  });

  it("should render the input without the label when not provided", () => {
    render(<Input placeholder="Enter something" />);

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter something")).toBeInTheDocument();
  });

  it("should apply error class and show error message when error is provided", () => {
    render(
      <Input
        label="Test Label"
        placeholder="Enter something"
        error="This field is required"
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter something");

    expect(screen.getByText("This field is required")).toBeInTheDocument();

    expect(inputElement).toHaveClass("border-red-300");
    expect(inputElement).toHaveClass("focus:border-red-500");
    expect(inputElement).toHaveClass("focus:ring-red-200");
  });

  it("should not apply error class if no error is provided", () => {
    render(<Input label="Test Label" placeholder="Enter something" />);

    const inputElement = screen.getByPlaceholderText("Enter something");

    expect(inputElement).not.toHaveClass("border-red-300");
    expect(inputElement).not.toHaveClass("focus:border-red-500");
    expect(inputElement).not.toHaveClass("focus:ring-red-200");
  });

  it("should call onChange when typing in the input", () => {
    const handleChange = jest.fn();
    render(
      <Input
        label="Test Label"
        placeholder="Enter something"
        onChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter something");

    fireEvent.change(inputElement, { target: { value: "New value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
