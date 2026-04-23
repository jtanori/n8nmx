import { render, screen } from "@testing-library/react";
import { LeadExplorerTable } from "../../components/dashboard/LeadExplorerTable";
import "@testing-library/jest-dom";

describe("LeadExplorerTable Component", () => {
  it("renders correct table headers", () => {
    render(<LeadExplorerTable leads={[]} />);
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
  });
});
