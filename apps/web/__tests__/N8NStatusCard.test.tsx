import { render, screen } from "@testing-library/react";
import { N8NStatusCard } from "../components/N8NStatusCard";
import "@testing-library/jest-dom";

describe("N8NStatusCard Component", () => {
  it("shows online status when isActive is true", () => {
    render(<N8NStatusCard isActive={true} />);
    expect(screen.getByText(/Online/i)).toBeInTheDocument();
  });

  it("shows offline status when isActive is false", () => {
    render(<N8NStatusCard isActive={false} />);
    expect(screen.getByText(/Offline/i)).toBeInTheDocument();
  });
});
