import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Sku {
  id: string;
  name: string;
  price: number;
  cost: number;
}

interface SkusState {
  skus: Sku[];
}

const initialState: SkusState = {
  skus: [
    { id: "SKU001", name: "Wireless Bluetooth Headphones", price: 129, cost: 80 },
    { id: "SKU002", name: "Smartwatch with Fitness Tracker", price: 199, cost: 120 },
  ],
};

const skusSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSku: (state, action: PayloadAction<Sku>) => {
      state.skus.push(action.payload);
    },
    deleteSku: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter((sku) => sku.id !== action.payload);
    },
    updateSku: (state, action: PayloadAction<Sku>) => {
      const index = state.skus.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state.skus[index] = action.payload;
      }
    },
  },
});

export const { addSku, deleteSku, updateSku } = skusSlice.actions;
export default skusSlice.reducer;
