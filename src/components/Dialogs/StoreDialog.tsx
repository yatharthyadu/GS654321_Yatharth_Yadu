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

interface StoreDialogProps {
  open: boolean;
  onClose: () => void;
  store : any;
}

export default function StoreDialog({ open, onClose, store }: StoreDialogProps) {
  const dispatch = useDispatch();
  const [storeName, setStoreName] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeState, setStoreState] = useState("");

  useEffect(() => {
    if (store) {
      setStoreName(store.name);
      setStoreCity(store.city);
      setStoreState(store.state);
    } else {
      setStoreName("");
      setStoreCity("");
      setStoreState("");
    }
  }, [store]);

  // Handle Add / Edit store
  const handleSave = () => {
    if (store) {
      // Updating an existing store
      dispatch(updateStore({ id: store.id, name: storeName, city: storeCity, state: storeState }));
    } else {
      // Adding a new store
      dispatch(addStore({ id: Date.now().toString(), name: storeName, city: storeCity, state: storeState }));
    }
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{store ? "Edit Store" : "Add Store"}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} fullWidth />
          <TextField label="City" value={storeCity} onChange={(e) => setStoreCity(e.target.value)} fullWidth />
          <TextField label="State" value={storeState} onChange={(e) => setStoreState(e.target.value)} fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          {store ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
