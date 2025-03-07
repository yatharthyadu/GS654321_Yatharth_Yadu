import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "@/redux/storesSlice"; // Ensure correct path

export const store = configureStore({
  reducer: {
    stores: storesReducer,
  },
});

// ✅ Define RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
