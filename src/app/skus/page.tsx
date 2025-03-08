"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteSku } from "../../redux/skusSlice";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SkuDialog from "../../components/Dialogs/SkuDialog";

interface Sku {
  id: string;
  name: string;
  price: number;
  cost: number;
}

export default function SkusPage() {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null);

  // Handle Open Dialog (for Add & Edit)
  const handleOpenDialog = (sku?: Sku) => {
    setSelectedSku(sku ?? null);
    setDialogOpen(true);
  };

  // Columns for MUI Data Grid
  const columns: GridColDef[] = [
    { field: "id", headerName: "SKU ID", flex: 1 },
    { field: "name", headerName: "SKU Name", flex: 2 },
    { field: "price", headerName: "Price ($)", flex: 1 },
    { field: "cost", headerName: "Cost ($)", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleOpenDialog(params.row)} color="info">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(deleteSku(params.row.id))}
            color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4">SKUs</Typography>
      <Button
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{ mt: 2 }}>
        Add SKU
      </Button>

      {/* Data Grid for SKUs */}
      <Box sx={{ height: 400, width: "100%", mt: 3 }}>
        <DataGrid
          rows={skus}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Dialog for Adding/Editing SKU */}
      <SkuDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        sku={selectedSku}
      />
    </Box>
  );
}
