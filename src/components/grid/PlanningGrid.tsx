import { useMemo } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridCellParams,
} from "@mui/x-data-grid";

interface Store {
  id: string;
  name: string;
}

interface Sku {
  id: string;
  name: string;
  price: number;
  cost: number;
}

interface PlanningData {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
}

interface CalendarData {
  week: string;
  weekLabel: string;
  month: string;
  monthLabel: string;
}

interface PlanningGridProps {
  stores: Store[];
  skus: Sku[];
  planningData: PlanningData[];
  calendarData: CalendarData[];
}

export default function PlanningGrid({
  stores,
  skus,
  planningData,
  calendarData,
}: PlanningGridProps) {
  console.log("🟢 Redux Stores:", stores);
  console.log("🟢 Redux SKUs:", skus);
  console.log("🟢 Planning Data:", planningData);
  console.log("🟢 Calendar Data:", calendarData);

  // ✅ Creating SKU Map for quick lookup
  const skuMap = new Map(skus.map((sku) => [sku.id, sku]));

  // ✅ Creating Planning Map
  const planningMap = useMemo(() => {
    const map = new Map();
    planningData.forEach((p) => {
      const key = `${p.store}-${p.sku}-${p.week}`;
      map.set(key, p.salesUnits);
    });
    console.log("✅ Planning Map:", map);
    return map;
  }, [planningData]);

  // ✅ Generating Grid Data Map
  const gridDataMap = new Map();

  stores.forEach((store) => {
    skus.forEach((sku) => {
      const rowKey = `${store.id}-${sku.id}`;

      // Ensure the row exists in gridDataMap
      if (!gridDataMap.has(rowKey)) {
        gridDataMap.set(rowKey, {
          id: rowKey,
          storeName: store.name,
          skuName: sku.name,
        });
      }

      calendarData.forEach((week) => {
        const key = `${store.id}-${sku.id}-${week.week}`;
        const salesUnits = planningMap.get(key) ?? 0;
        const price = skuMap.get(sku.id)?.price ?? 0;
        const cost = skuMap.get(sku.id)?.cost ?? 0;

        console.log(
          `🟢 Processing -> Store: ${store.id}, SKU: ${sku.id}, Week: ${week.week}`
        );
        console.log(`🔹 Key Used: ${key}`);
        console.log(`🔹 Found Sales Units:`, salesUnits);
        console.log(`🔹 Price: ${price}, Cost: ${cost}`);

        const salesDollars = salesUnits * price;
        const gmDollars = salesDollars - salesUnits * cost;
        const gmPercentage = salesDollars
          ? (gmDollars / salesDollars) * 100
          : 0;

        // Store values in grid row
        if (!gridDataMap.has(rowKey)) {
          console.warn(`⚠️ Missing rowKey in gridDataMap: ${rowKey}`);
          return;
        }

        gridDataMap.get(rowKey)[`salesUnits-${week.week}`] = salesUnits;
        gridDataMap.get(rowKey)[`salesDollars-${week.week}`] = Number(
          salesDollars.toFixed(2)
        );
        gridDataMap.get(rowKey)[`gmDollars-${week.week}`] = Number(
          gmDollars.toFixed(2)
        );
        gridDataMap.get(rowKey)[`gmPercentage-${week.week}`] = Number(
          gmPercentage.toFixed(2)
        );

        console.log(
          `✅ Updated gridDataMap for ${rowKey}:`,
          gridDataMap.get(rowKey)
        );
      });
    });
  });

  const gridData = Array.from(gridDataMap.values());
  console.log("🟢 Final Grid Data Before Render:", gridData);

  // ✅ Define Static Columns (Store & SKU)
  const staticColumns: GridColDef[] = [
    { field: "storeName", headerName: "Store", flex: 2 },
    { field: "skuName", headerName: "SKU", flex: 2 },
  ];

  // ✅ Define Dynamic Week Columns (Including Sales Units, Sales $, GM $, GM %)
  const weekColumns: GridColDef[] = calendarData.flatMap((week) => [
    {
      field: `salesUnits-${week.week}`,
      headerName: "Sales Units",
      flex: 1,
      editable: true,
      type: "number",
    },
    {
      field: `salesDollars-${week.week}`,
      headerName: "Sales $",
      flex: 1,
      type: "number",
      valueFormatter: (params) =>
        params.value !== undefined
          ? `$${Number(params.value).toFixed(2)}`
          : "$0.00",
    },
    {
      field: `gmDollars-${week.week}`,
      headerName: "GM $",
      flex: 1,
      type: "number",
      valueFormatter: (params) =>
        params.value !== undefined
          ? `$${Number(params.value).toFixed(2)}`
          : "$0.00",
    },
    {
      field: `gmPercentage-${week.week}`,
      headerName: "GM %",
      flex: 1,
      type: "number",
      valueFormatter: (params) =>
        params.value !== undefined
          ? `${Number(params.value).toFixed(2)}%`
          : "0.00%",
      cellClassName: (params: GridCellParams) => {
        const value = Number(params.value);
        if (value >= 40) return "green-cell";
        if (value >= 10) return "yellow-cell";
        if (value > 5) return "orange-cell";
        return "red-cell";
      },
    },
  ]);

  // ✅ Define Column Grouping: Weeks inside Months
  const columnGroupingModel: GridColumnGroupingModel = [];

  const groupedMonths = new Map();

  calendarData.forEach((week) => {
    if (!groupedMonths.has(week.month)) {
      groupedMonths.set(week.month, {
        groupId: week.month,
        headerName: week.monthLabel,
        children: [],
      });
    }

    groupedMonths.get(week.month).children.push({
      groupId: week.week,
      headerName: week.weekLabel,
      children: [
        { field: `salesUnits-${week.week}` },
        { field: `salesDollars-${week.week}` },
        { field: `gmDollars-${week.week}` },
        { field: `gmPercentage-${week.week}` },
      ],
    });
  });

  columnGroupingModel.push(...Array.from(groupedMonths.values()));

  // ✅ Final Column List
  const columns: GridColDef[] = [...staticColumns, ...weekColumns];

  return (
    <Box sx={{ height: 600, width: "100%", mt: 3 }}>
      <DataGrid
        rows={gridData}
        columns={columns}
        pageSizeOptions={[10]}
        columnGroupingModel={columnGroupingModel}
      />
    </Box>
  );
}
