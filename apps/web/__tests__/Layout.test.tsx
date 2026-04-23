import { render, screen } from "@testing-library/react";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import "@testing-library/jest-dom";

describe("Layout - Global UI Components", () => {
  it("renders all required navigation items in Sidebar", () => {
    render(<Sidebar />);
    const navItems = ['Dashboard', 'Searches', 'Leads', 'Map View', 'AI Auditor', 'Settings', 'Account'];
    navItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("renders the primary CTA in Navbar", () => {
    render(<Navbar />);
    expect(screen.getByText(/Start New Regional Search/i)).toBeInTheDocument();
  });
});
