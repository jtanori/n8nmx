import { render, screen } from "@testing-library/react";
import { LeadTable } from "../components/LeadTable";
import "@testing-library/jest-dom";

describe("LeadTable Component", () => {
  it("renders a column for City", () => {
    render(<LeadTable leads={[]} />);
    expect(screen.getByText(/Ciudad/i)).toBeInTheDocument();
  });

  it("renders lead data correctly", () => {
    const leads = [{ id: "1", name: "John Doe", city: "Hermosillo" }];
    render(<LeadTable leads={leads} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Hermosillo")).toBeInTheDocument();
  });
});
