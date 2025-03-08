import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "@/components/layout/Sidebar";

// Mock useMediaQuery hook
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: () => false, // Desktop view by default
}));

describe("Sidebar", () => {
  it("renders navigation items", () => {
    const { getByText } = render(<Sidebar />);

    // Check if all navigation items are rendered
    expect(getByText("Stores")).toBeInTheDocument();
    expect(getByText("SKUs")).toBeInTheDocument();
    expect(getByText("Planning")).toBeInTheDocument();
    expect(getByText("Charts")).toBeInTheDocument();
  });

  it("renders all navigation links with correct paths", () => {
    const { getAllByRole } = render(<Sidebar />);

    const links = getAllByRole("link");
    expect(links).toHaveLength(4);

    const expectedPaths = ["/stores", "/skus", "/planning"];
    links.forEach((link: HTMLElement, index: number) => {
      expect(link).toHaveAttribute("href", expectedPaths[index]);
    });
  });

  it("renders as permanent drawer in desktop view", () => {
    const { queryByRole, container } = render(<Sidebar />);

    // In desktop view, the menu button should not be visible
    const menuButton = queryByRole("button");
    expect(menuButton).not.toBeInTheDocument();

    // Drawer should be visible
    const drawer = container.querySelector(".MuiDrawer-root");
    expect(drawer).toBeInTheDocument();
  });
});
