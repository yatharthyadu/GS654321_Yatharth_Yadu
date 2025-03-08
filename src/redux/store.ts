import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "../redux/storesSlice";
import skusReducer from "../redux/skusSlice"; 



export const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
  },
});

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
