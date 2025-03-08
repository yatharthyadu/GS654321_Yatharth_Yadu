import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "@/redux/storesSlice";
import StoreDialog from "@/components/Dialogs/StoreDialog";

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      stores: storesReducer,
    },
  });
};

describe("StoreDialog", () => {
  const mockOnClose = jest.fn();
  const mockStore = {
    id: "ST001",
    name: "Test Store",
    city: "Test City",
    state: "TS",
  };

  it("renders add store dialog correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <StoreDialog open={true} onClose={mockOnClose} />
      </Provider>
    );

    // Check dialog title
    expect(screen.getByText("Add Store")).toBeInTheDocument();

    // Check if all input fields are present
    expect(screen.getByLabelText("Store ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Store Name")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("State")).toBeInTheDocument();

    // Check buttons
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("renders edit store dialog correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <StoreDialog open={true} onClose={mockOnClose} store={mockStore} />
      </Provider>
    );

    // Check dialog title
    expect(screen.getByText("Edit Store")).toBeInTheDocument();

    // Check if input fields have correct values
    expect(screen.getByLabelText("Store ID")).toHaveValue(mockStore.id);
    expect(screen.getByLabelText("Store Name")).toHaveValue(mockStore.name);
    expect(screen.getByLabelText("City")).toHaveValue(mockStore.city);
    expect(screen.getByLabelText("State")).toHaveValue(mockStore.state);

    // Check if Store ID is disabled in edit mode
    expect(screen.getByLabelText("Store ID")).toBeDisabled();

    // Check buttons
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <StoreDialog open={true} onClose={mockOnClose} />
      </Provider>
    );

    // Get input fields
    const nameInput = screen.getByLabelText("Store Name");
    const cityInput = screen.getByLabelText("City");
    const stateInput = screen.getByLabelText("State");

    // Simulate input changes
    fireEvent.change(nameInput, { target: { value: "New Store" } });
    fireEvent.change(cityInput, { target: { value: "New City" } });
    fireEvent.change(stateInput, { target: { value: "NC" } });

    // Check if inputs have new values
    expect(nameInput).toHaveValue("New Store");
    expect(cityInput).toHaveValue("New City");
    expect(stateInput).toHaveValue("NC");
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <Provider store={createMockStore()}>
        <StoreDialog open={true} onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
