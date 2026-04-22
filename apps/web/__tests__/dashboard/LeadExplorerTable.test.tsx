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

  it("renders lead data correctly", () => {
    const mockLeads = [{
        id: "1",
        business_name: "Test Business",
        city: "Hermosillo",
        relevance_score: 0.9,
        is_high_quality: true,
        category: "Logistics"
    }];
    render(<LeadExplorerTable leads={mockLeads} />);
    expect(screen.getByText("Test Business")).toBeInTheDocument();
    expect(screen.getByText("Hermosillo")).toBeInTheDocument();
    expect(screen.getByText("0.9")).toBeInTheDocument();
  });
});
