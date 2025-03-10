"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSku, updateSku } from "@/redux/skusSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface Sku {
  id: string;
  name: string;
  price: number;
  cost: number;
}
interface SkuDialogProps {
  open: boolean;
  handleClose: () => void;
  sku: Sku | null;
}

export default function SkuDialog({ open, handleClose, sku }: SkuDialogProps) {
  const dispatch = useDispatch();
  const [skuData, setSkuData] = useState({
    id: "",
    name: "",
    price: 0,
    cost: 0,
  });

  useEffect(() => {
    if (sku) {
      setSkuData({
        ...sku,
        price: Number(sku.price),
        cost: Number(sku.cost),
      });
    } else {
      setSkuData({ id: "", name: "", price: 0, cost: 0 });
    }
  }, [sku]);

  const handleSave = () => {
    // Validate all required fields
    if (!skuData.name || !skuData.price || !skuData.cost) {
      return; // Don't proceed if required fields are empty
    }

    if (sku) {
      dispatch(updateSku({ ...skuData }));
    } else {
      // For new SKUs, ensure we have an ID
      const newSkuData = {
        ...skuData,
        id: skuData.id || `SKU${Date.now()}`,
      };
      dispatch(addSku(newSkuData));
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{sku ? "Edit SKU" : "Add SKU"}</DialogTitle>
      <DialogContent>
        <TextField
          label="SKU ID"
          fullWidth
          margin="dense"
          value={skuData.id}
          onChange={(e) => setSkuData({ ...skuData, id: e.target.value })}
          disabled={!!sku} // Disable editing for existing SKUs
          placeholder="Leave empty to auto-generate"
        />
        <TextField
          label="SKU Name"
          fullWidth
          margin="dense"
          value={skuData.name}
          onChange={(e) => setSkuData({ ...skuData, name: e.target.value })}
        />
        <TextField
          label="Price"
          fullWidth
          margin="dense"
          type="number"
          value={skuData.price}
          onChange={(e) =>
            setSkuData({ ...skuData, price: Number(e.target.value) })
          }
        />
        <TextField
          label="Cost"
          fullWidth
          margin="dense"
          type="number"
          value={skuData.cost}
          onChange={(e) =>
            setSkuData({ ...skuData, cost: Number(e.target.value) })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
