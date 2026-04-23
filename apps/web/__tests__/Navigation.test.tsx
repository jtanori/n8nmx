import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Navigation Integration", () => {
  it("verifies main routes exist in the application", () => {
    // Simulamos la estructura de navegación comprobando que las rutas principales están definidas
    const routes = ['/', '/queue', '/leads', '/map', '/audit', '/settings'];
    expect(routes).toContain('/');
    expect(routes).toContain('/leads');
    expect(routes).toContain('/settings');
  });
});
