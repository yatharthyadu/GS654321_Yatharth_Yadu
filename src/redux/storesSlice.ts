import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  id: string; 
  name: string;
  city: string;
  state: string;
}

interface StoresState {
  stores: Store[];
}


const initialState: StoresState = {
  stores: [
    { id: "ST035", name: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
    { id: "ST046", name: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
    { id: "ST064", name: "Dallas Ranch Supply", city: "Dallas", state: "TX" },

  
  ],
};

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
    updateStore: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const store = state.stores.find((store) => store.id === action.payload.id);
      if (store) {
        store.name = action.payload.name;
      }
    },
  },
});

export const { addStore, deleteStore, updateStore } = storesSlice.actions;
export default storesSlice.reducer;