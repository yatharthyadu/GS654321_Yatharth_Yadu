"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStore, updateStore } from "@/redux/storesSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
}

interface StoreDialogProps {
  open: boolean;
  onClose: () => void;
  store?: Store;
}

export default function StoreDialog({
  open,
  onClose,
  store,
}: StoreDialogProps) {
  const dispatch = useDispatch();
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeState, setStoreState] = useState("");

  useEffect(() => {
    if (store) {
      setStoreId(store.id);
      setStoreName(store.name);
      setStoreCity(store.city);
      setStoreState(store.state);
    } else {
      setStoreId("");
      setStoreName("");
      setStoreCity("");
      setStoreState("");
    }
  }, [store]);

  // Handle Add / Edit store
  const handleSave = () => {
    if (store) {
      // Updating an existing store
      dispatch(
        updateStore({
          id: store.id,
          name: storeName,
          city: storeCity,
          state: storeState,
        })
      );
    } else {
      // Adding a new store
      dispatch(
        addStore({
          id: storeId || Date.now().toString(),
          name: storeName,
          city: storeCity,
          state: storeState,
        })
      );
    }
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{store ? "Edit Store" : "Add Store"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Store ID"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
            disabled={!!store}
            fullWidth
          />
          <TextField
            label="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            fullWidth
          />
          <TextField
            label="City"
            value={storeCity}
            onChange={(e) => setStoreCity(e.target.value)}
            fullWidth
          />
          <TextField
            label="State"
            value={storeState}
            onChange={(e) => setStoreState(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained">
          {store ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
