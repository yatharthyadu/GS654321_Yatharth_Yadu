"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteStore } from "@/redux/storesSlice";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StoreDialog from "../../components/Dialogs/StoreDialog";

interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
}

export default function StoresPage() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Open dialog for adding a new store
  const handleAddStore = () => {
    setSelectedStore(null); // No pre-filled data
    setDialogOpen(true);
  };

  // Open dialog for editing an existing store
  const handleEditStore = (store: Store) => {
    setSelectedStore(store);
    setDialogOpen(true);
  };

  // Columns for MUI Data Grid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Store Name", flex: 2 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditStore(params.row)} color="info">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(deleteStore(params.row.id))}
            color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4">Stores</Typography>

      {/* Add Store Button */}
      <Box sx={{ margin: "20px 0" }}>
        <Button variant="contained" onClick={handleAddStore}>
          Add Store
        </Button>
      </Box>

      {/* Data Grid */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={stores}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>

      {/* Store Dialog Component */}
      <StoreDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        store={selectedStore}
      />
    </Box>
  );
}
