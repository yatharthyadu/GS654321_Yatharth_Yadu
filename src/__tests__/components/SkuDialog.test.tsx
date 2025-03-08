import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import skusReducer from "@/redux/skusSlice";
import SkuDialog from "@/components/Dialogs/SkuDialog";

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      skus: skusReducer,
    },
  });
};

describe("SkuDialog", () => {
  const mockHandleClose = jest.fn();
  const mockSku = {
    id: "SKU001",
    name: "Test SKU",
    price: 99.99,
    cost: 49.99,
  };

  beforeEach(() => {
    mockHandleClose.mockClear();
  });

  it("renders add SKU dialog correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <SkuDialog open={true} handleClose={mockHandleClose} sku={null} />
      </Provider>
    );

    // Check dialog title
    expect(screen.getByText("Add SKU")).toBeInTheDocument();

    // Check if all input fields are present
    expect(screen.getByLabelText("SKU ID")).toBeInTheDocument();
    expect(screen.getByLabelText("SKU Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Cost")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders edit SKU dialog correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <SkuDialog open={true} handleClose={mockHandleClose} sku={mockSku} />
      </Provider>
    );

    // Check dialog title
    expect(screen.getByText("Edit SKU")).toBeInTheDocument();

    // Check if input fields have correct values
    expect(screen.getByLabelText("SKU ID")).toHaveValue(mockSku.id);
    expect(screen.getByLabelText("SKU Name")).toHaveValue(mockSku.name);
    expect(screen.getByLabelText("Price")).toHaveValue(mockSku.price);
    expect(screen.getByLabelText("Cost")).toHaveValue(mockSku.cost);

    // Check if SKU ID is disabled in edit mode
    expect(screen.getByLabelText("SKU ID")).toBeDisabled();
  });

  it("handles input changes correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <SkuDialog open={true} handleClose={mockHandleClose} sku={null} />
      </Provider>
    );

    // Get input fields
    const nameInput = screen.getByLabelText("SKU Name");
    const priceInput = screen.getByLabelText("Price");
    const costInput = screen.getByLabelText("Cost");

    // Simulate input changes
    fireEvent.change(nameInput, { target: { value: "New SKU" } });
    fireEvent.change(priceInput, { target: { value: "199.99" } });
    fireEvent.change(costInput, { target: { value: "99.99" } });

    // Check if inputs have new values
    expect(nameInput).toHaveValue("New SKU");
    expect(priceInput).toHaveValue(199.99);
    expect(costInput).toHaveValue(99.99);
  });

  it("calls handleClose when Cancel button is clicked", () => {
    render(
      <Provider store={createMockStore()}>
        <SkuDialog open={true} handleClose={mockHandleClose} sku={null} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockHandleClose).toHaveBeenCalled();
  });
  it("validates required fields before saving", () => {
    render(
      <Provider store={createMockStore()}>
        <SkuDialog open={true} handleClose={mockHandleClose} sku={null} />
      </Provider>
    );

    // Try to save without filling required fields
    fireEvent.click(screen.getByText("Save"));

    // Dialog should still be open (handleClose not called) because validation failed
    expect(mockHandleClose).not.toHaveBeenCalled();

    // Fill in required fields
    fireEvent.change(screen.getByLabelText("SKU Name"), {
      target: { value: "Test SKU" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "10.99" },
    });
    fireEvent.change(screen.getByLabelText("Cost"), {
      target: { value: "5.99" },
    });

    // Try to save again with filled fields
    fireEvent.click(screen.getByText("Save"));

    // Now the dialog should close
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
