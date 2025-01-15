import { Loading } from "@/components/ui/loading";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Loading Component", () => {
  it("should render the default loading spinner", () => {
    const { getByTestId } = render(<Loading />);

    const spinner = getByTestId("normal-loading");
    expect(spinner).toBeInTheDocument();
  });

  it("should have the correct data-testid when 'dark' prop is true", () => {
    const { getByTestId } = render(<Loading dark />);

    const spinner = getByTestId("dark-loading");
    expect(spinner).toBeInTheDocument();
  });
});
