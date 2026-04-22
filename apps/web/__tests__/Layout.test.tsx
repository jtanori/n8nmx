import { render, screen } from "@testing-library/react";
import RootLayout from "../app/layout";
import "@testing-library/jest-dom";

// Mock del children para el layout
const MockChildren = () => <div>Dashboard Content</div>;

describe("Global Layout Integration", () => {
  it("renders Sidebar and Navbar within the layout", () => {
    render(
      <RootLayout>
        <MockChildren />
      </RootLayout>
    );
    
    // Verificamos que los componentes principales estén presentes
    expect(screen.getByText(/Sonora Engine/i)).toBeInTheDocument();
    expect(screen.getByText(/Start New Regional Search/i)).toBeInTheDocument();
    expect(screen.getByText("Dashboard Content")).toBeInTheDocument();
  });
});
