"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addStore, deleteStore } from "@/redux/storesSlice";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StoresPage() {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [storeName, setStoreName] = useState("");
  const [storeCity, setStoreCity] = useState("");
  const [storeState, setStoreState] = useState("");


  const columns: GridColDef[] = [
    { field: "name", headerName: "Store Name", flex: 2 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => dispatch(deleteStore(params.row.id))}
          color="error">
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4">Stores</Typography>

   
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label="Store Name"
          variant="outlined"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <TextField
          label="City"
          variant="outlined"
          value={storeCity}
          onChange={(e) => setStoreCity(e.target.value)}
        />
        <TextField
          label="State"
          variant="outlined"
          value={storeState}
          onChange={(e) => setStoreState(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (storeName.trim() && storeCity.trim() && storeState.trim()) {
              dispatch(
                addStore({
                  id: Date.now().toString(),
                  name: storeName,
                  city: storeCity,
                  state: storeState,
                })
              );
              setStoreName("");
              setStoreCity("");
              setStoreState("");
            }
          }}>
          Add Store
        </Button>
      </Box>

   
      <Box sx={{ height: 400, width: "100%", mt: 3 }}>
        <DataGrid
          rows={stores}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
}
