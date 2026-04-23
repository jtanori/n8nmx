import { render, screen } from "@testing-library/react";
import { SalesStrategyPanel } from "../../components/dashboard/SalesStrategyPanel";
import "@testing-library/jest-dom";

describe("SalesStrategyPanel Component", () => {
  it("renders a message when no suggestions are provided", () => {
    render(<SalesStrategyPanel suggestions={[]} />);
    expect(screen.getByText(/No hay sugerencias de venta disponibles/i)).toBeInTheDocument();
  });

  it("renders suggestions when data is provided", () => {
    const suggestions = [{ service: "Test Service", reason: "Test Reason" }];
    render(<SalesStrategyPanel suggestions={suggestions} />);
    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Test Reason")).toBeInTheDocument();
  });
});
