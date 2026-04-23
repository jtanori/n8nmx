import { render, screen } from "@testing-library/react";
import { PitchGenerator } from "../../components/dashboard/PitchGenerator";
import "@testing-library/jest-dom";

describe("PitchGenerator Component", () => {
  const mockLead = {
    business_name: "Tacos El Gran Sabor",
    city: "Puerto Peñasco",
  };

  const mockService = {
    service: "AI-WhatsApp Concierge",
    reason: "Sin sitio web detectado",
    pitch: "Hola, vi que {business_name} en {city} no tiene web, podemos ayudarle."
  };

  it("renders the generated pitch correctly", () => {
    render(<PitchGenerator lead={mockLead} suggestion={mockService} />);
    expect(screen.getByText(/Hola, vi que Tacos El Gran Sabor en Puerto Peñasco no tiene web/i)).toBeInTheDocument();
  });
});
