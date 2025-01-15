import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Button Component", () => {
  it("should render the button ", () => {
    const { getByText } = render(
      <Button loading={false}>Button Component</Button>
    );

    const Btn = getByText("Button Component");
    expect(Btn).toBeInTheDocument();
  });

  it("should render the loading component ", () => {
    const { getByTestId } = render(<Button loading>Button Component</Button>);

    expect(getByTestId("test-button-loading")).toBeInTheDocument();
  });

  it("should render the Primary Button Component with correct classes", () => {
    const { getByText } = render(
      <Button variant="primary" loading={false}>
        Primary Button Component
      </Button>
    );

    const Btn = getByText("Primary Button Component");
    expect(Btn).toBeInTheDocument();

    expect(Btn).toHaveClass("bg-background-primary");
    expect(Btn).toHaveClass("hover:bg-background-secondary");
    expect(Btn).toHaveClass("focus:ring-cyan-400");
  });

  it("should render the secondary button with correct classes", () => {
    const { getByText } = render(
      <Button variant="secondary" loading={false}>
        Secondary Button
      </Button>
    );

    const Btn = getByText("Secondary Button");
    expect(Btn).toBeInTheDocument();

    expect(Btn).toHaveClass("bg-transparent");
    expect(Btn).toHaveClass("border-white/20");
    expect(Btn).toHaveClass("hover:bg-white/10");
    expect(Btn).toHaveClass("focus:ring-white/20");
  });

  it("should not apply 'w-full' class when fullWidth is false", () => {
    const { getByText } = render(
      <Button fullWidth={false} loading={false}>
        Non Full Width Button
      </Button>
    );

    const Btn = getByText("Non Full Width Button");
    expect(Btn).not.toHaveClass("w-full");
  });
});
