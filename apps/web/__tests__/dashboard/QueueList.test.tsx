import { render, screen } from "@testing-library/react";
import { QueueList } from "../../components/dashboard/QueueList";
import "@testing-library/jest-dom";

describe("QueueList Component", () => {
  it("renders queue items with correct terms", () => {
    const mockQueries = [
      { id: "1", term: "Agencia Aduanal", priority_order: 1 },
      { id: "2", term: "Logistics Centers", priority_order: 2 },
    ];
    render(<QueueList queries={mockQueries} />);
    
    expect(screen.getByText("Agencia Aduanal")).toBeInTheDocument();
    expect(screen.getByText("Logistics Centers")).toBeInTheDocument();
  });
});
