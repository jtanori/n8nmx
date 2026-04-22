import { render, screen } from "@testing-library/react";
import { LeadTable } from "../components/LeadTable";
import "@testing-library/jest-dom";

describe("LeadTable Component", () => {
  it("renders a column for City", () => {
    render(<LeadTable leads={[]} />);
    expect(screen.getByText(/Ciudad/i)).toBeInTheDocument();
    expect(screen.getByText(/Acciones/i)).toBeInTheDocument();
  });

  it("renders lead data correctly", () => {
    const leads = [{ 
        id: "1", 
        business_name: "Negocio Test", 
        city: "Hermosillo", 
        is_high_quality: true, 
        relevance_score: 90 
    }];
    render(<LeadTable leads={leads as any} />);
    expect(screen.getByText("Negocio Test")).toBeInTheDocument();
    expect(screen.getByText("Hermosillo")).toBeInTheDocument();
    expect(screen.getByText(/Alta Relevancia/i)).toBeInTheDocument();
  });
});
