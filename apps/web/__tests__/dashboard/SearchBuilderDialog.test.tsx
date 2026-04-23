import { render, screen } from "@testing-library/react";
import { SearchBuilderDialog } from "../../components/dashboard/SearchBuilderDialog";
import "@testing-library/jest-dom";

describe("SearchBuilderDialog Component", () => {
  it("does not render when closed", () => {
    render(<SearchBuilderDialog />);
    expect(screen.queryByText(/Configurar Nueva Misión/i)).not.toBeInTheDocument();
  });
});
