"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Box, Typography } from "@mui/material";
import PlanningGrid from "@/components/grid/PlanningGrid";

export default function PlanningPage() {
  // Fetch stores & SKUs dynamically from Redux
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);

  // Sample Planning Data
  const planningData = [
    // Store: San Francisco Bay Trends (ST035)
    { store: "ST035", sku: "SKU001", week: "W01", salesUnits: 58 },
    { store: "ST035", sku: "SKU001", week: "W03", salesUnits: 75 },
    { store: "ST035", sku: "SKU001", week: "W05", salesUnits: 90 },
    { store: "ST035", sku: "SKU001", week: "W07", salesUnits: 107 },

    { store: "ST035", sku: "SKU002", week: "W02", salesUnits: 30 },
    { store: "ST035", sku: "SKU002", week: "W04", salesUnits: 45 },
    { store: "ST035", sku: "SKU002", week: "W06", salesUnits: 60 },
    { store: "ST035", sku: "SKU002", week: "W08", salesUnits: 85 },
  ];

  //  Sample Calendar Data (Weeks grouped under Months)
  const calendarData = [
    { week: "W01", weekLabel: "Week 01", month: "M02", monthLabel: "Feb" },
    { week: "W02", weekLabel: "Week 02", month: "M02", monthLabel: "Feb" },
  ];

  return (
    <Box>
      <Typography variant="h4">Planning</Typography>
      <PlanningGrid
        stores={stores}
        skus={skus}
        calendarData={calendarData}
        planningData={planningData}
      />
    </Box>
  );
}
