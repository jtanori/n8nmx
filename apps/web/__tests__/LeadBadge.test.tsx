import { render, screen } from "@testing-library/react";
import { LeadBadge } from "../components/LeadBadge";
import "@testing-library/jest-dom";

describe("LeadBadge Component", () => {
  it("renders 'Alta Relevancia' for high score leads", () => {
    render(<LeadBadge score={90} />);
    expect(screen.getByText(/Alta Relevancia/i)).toBeInTheDocument();
  });

  it("renders 'Baja Relevancia' for low score leads", () => {
    render(<LeadBadge score={30} />);
    expect(screen.getByText(/Baja Relevancia/i)).toBeInTheDocument();
  });
});
