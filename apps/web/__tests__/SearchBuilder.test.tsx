import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBuilder } from "../components/SearchBuilder";
import "@testing-library/jest-dom";

describe("SearchBuilder Component", () => {
  it("disables save button when no locations selected", () => {
    render(<SearchBuilder />);
    const saveButton = screen.getByRole("button", { name: /Guardar Tarea/i });
    expect(saveButton).toBeDisabled();
  });
});
