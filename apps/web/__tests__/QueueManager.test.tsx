import { render, screen } from "@testing-library/react";
import { QueueManager } from "../components/QueueManager";
import "@testing-library/jest-dom";

describe("QueueManager Component", () => {
  it("renders a list of search queries", () => {
    const mockQueries = [
      { id: "1", term: "Talleres", priority_order: 1 },
      { id: "2", term: "Hoteles", priority_order: 2 },
    ];
    render(<QueueManager queries={mockQueries} />);
    
    expect(screen.getByText("Talleres")).toBeInTheDocument();
    expect(screen.getByText("Hoteles")).toBeInTheDocument();
  });
});
