import { Select } from "@/components/ui/select";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Select Component", () => {
  it("should render the select element with options", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    render(<Select value="1" options={options} onChange={jest.fn()} />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("should select the correct option", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    const handleChange = jest.fn();
    const { rerender } = render(
      <Select value="1" options={options} onChange={handleChange} />
    );

    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toHaveValue("1");

    fireEvent.change(selectElement, { target: { value: "2" } });

    rerender(<Select value="2" options={options} onChange={handleChange} />);

    expect(selectElement).toHaveValue("2");
  });

  it("should call onChange when the selection is changed", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    const handleChange = jest.fn();
    render(<Select value="1" options={options} onChange={handleChange} />);

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "2" } });

    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("should render with a custom className", () => {
    const options = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];
    render(
      <Select
        value="1"
        options={options}
        onChange={jest.fn()}
        className="custom-class"
      />
    );

    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toHaveClass("custom-class");
  });
});
