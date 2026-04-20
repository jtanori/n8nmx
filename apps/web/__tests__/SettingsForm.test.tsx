import { render, screen } from "@testing-library/react";
import { SettingsForm } from "../components/SettingsForm";
import "@testing-library/jest-dom";

describe("SettingsForm Component", () => {
  it("renders email and phone input fields", () => {
    render(<SettingsForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument();
  });
});
