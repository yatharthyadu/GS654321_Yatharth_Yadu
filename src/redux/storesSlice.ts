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
    { id: "ST066", name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: "ST073", name: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
    { id: "ST074", name: "New York Empire Eats", city: "New York", state: "NY" },
    { id: "ST091", name: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
    { id: "ST094", name: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
    { id: "ST097", name: "Boston Harbor Books", city: "Boston", state: "MA" },
    { id: "ST101", name: "Austin Vibe Co.", city: "Austin", state: "TX" },
    { id: "ST131", name: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
    { id: "ST150", name: "Houston Harvest Market", city: "Houston", state: "TX" },
    { id: "ST151", name: "Portland Evergreen Goods", city: "Portland", state: "OR" },
    { id: "ST156", name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
    { id: "ST163", name: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
    { id: "ST175", name: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
    { id: "ST176", name: "Miami Breeze Apparel", city: "Miami", state: "FL" },
    { id: "ST177", name: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
    { id: "ST193", name: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
    { id: "ST208", name: "Detroit Motor Gear", city: "Detroit", state: "MI" },
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
