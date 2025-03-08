import { useMemo } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
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
  // ✅ Create a map to store sales unit values for quick lookup
  const planningMap = useMemo(() => {
    const map = new Map();
    planningData.forEach((p) => {
      map.set(`${p.store}-${p.sku}-${p.week}`, p.salesUnits);
    });
    return map;
  }, [planningData]);

  // ✅ Create a map of SKU prices and costs for quick lookup
  const skuPriceMap = useMemo(() => {
    const map = new Map();
    skus.forEach((sku) => {
      map.set(sku.id, sku.price);
    });
    return map;
  }, [skus]);

  const skuCostMap = useMemo(() => {
    const map = new Map();
    skus.forEach((sku) => {
      map.set(sku.id, sku.cost);
    });
    return map;
  }, [skus]);

  // ✅ Create Rows: Store + SKU as fixed columns
  const gridDataMap = new Map();

  console.log("skus", skus);

  stores.forEach((store) => {
    skus.forEach((sku) => {
      const rowKey = `${store.id}-${sku.id}`;

      if (!gridDataMap.has(rowKey)) {
        gridDataMap.set(rowKey, {
          id: rowKey,
          storeName: store.name,
          skuName: sku.name,
        });
      }

      // Assign sales units, sales dollars and GM dollars for each week dynamically
      calendarData.forEach((week) => {
        const salesUnits =
          planningMap.get(`${store.id}-${sku.id}-${week.week}`) || 0;
        const skuPrice = skuPriceMap.get(sku.id) || 0;
        const skuCost = skuCostMap.get(sku.id) || 0;
        const salesDollars = salesUnits * skuPrice;
        const gmDollars = salesDollars - salesUnits * skuCost;
        const gmPercentage =
          salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;

        gridDataMap.get(rowKey)[`salesUnits-${week.week}`] = salesUnits;
        gridDataMap.get(rowKey)[`salesDollars-${week.week}`] = salesDollars;
        gridDataMap.get(rowKey)[`gmDollars-${week.week}`] = gmDollars;
        gridDataMap.get(rowKey)[`gmPercentage-${week.week}`] = gmPercentage;
      });
    });
  });

  const gridData = Array.from(gridDataMap.values());

  console.log("gridData", gridData);

  // ✅ Define Static Columns (Store & SKU)
  const staticColumns: GridColDef[] = [
    { field: "storeName", headerName: "Store", flex: 2 },
    { field: "skuName", headerName: "SKU", flex: 2 },
  ];

  // ✅ Define Dynamic Sales Unit and Sales Dollars Columns (Nested inside Weeks)
  const weekColumns: GridColDef[] = calendarData
    .map((week) => [
      {
        field: `salesUnits-${week.week}`,
        headerName: "Sales Units",
        flex: 1,
        editable: true,
        type: "number" as const,
      },
      {
        field: `salesDollars-${week.week}`,
        headerName: "Sales Dollars",
        flex: 1,
        type: "number" as const,
        valueFormatter: (params: { value: number }) => {
          return `$${params || 0}`;
        },
      },
      {
        field: `gmDollars-${week.week}`,
        headerName: "GM Dollars",
        flex: 1,
        type: "number" as const,
        valueFormatter: (params: { value: number }) => {
          return `$${params || 0}`;
        },
      },
      {
        field: `gmPercentage-${week.week}`,
        headerName: "GM %",
        flex: 1,
        type: "number" as const,
        editable: false,
        valueFormatter: (params: { value: number }) => {
          const value = params || 0;
          return `${value.toFixed(1)}%`;
        },
        cellClassName: (params: GridCellParams) => {
          const value = params.value as number;
          if (value >= 40) return "gm-percentage-high";
          if (value >= 10) return "gm-percentage-medium";
          if (value > 5) return "gm-percentage-low";
          console.log("value", value);
          return "gm-percentage-critical";
        },
      },
    ])
    .flat();

  // ✅ Define Column Grouping: Weeks inside Months, Sales Units & Dollars inside Weeks
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

  // Add processRowUpdate handler
  const processRowUpdate = (newRow: GridRowModel) => {
    const [, skuId] = newRow.id.toString().split("-");
    const updatedRow = { ...newRow };

    // Get SKU price and cost
    const skuPrice = skuPriceMap.get(skuId) || 0;
    const skuCost = skuCostMap.get(skuId) || 0;

    // Update calculations for all weeks
    calendarData.forEach((week) => {
      const salesUnitsField = `salesUnits-${week.week}`;
      if (salesUnitsField in newRow) {
        const salesUnits = Number(newRow[salesUnitsField]) || 0;
        const salesDollars = salesUnits * skuPrice;
        const gmDollars = salesDollars - salesUnits * skuCost;
        const gmPercentage =
          salesDollars > 0 ? (gmDollars / salesDollars) * 100 : 0;

        updatedRow[`salesDollars-${week.week}`] = salesDollars;
        updatedRow[`gmDollars-${week.week}`] = gmDollars;
        updatedRow[`gmPercentage-${week.week}`] = gmPercentage;
      }
    });

    return updatedRow;
  };

  return (
    <Box sx={{ height: 600, width: "100%", mt: 3 }}>
      <DataGrid
        rows={gridData}
        columns={columns}
        pageSizeOptions={[10]}
        columnGroupingModel={columnGroupingModel}
        processRowUpdate={processRowUpdate}
        sx={{
          "& .gm-percentage-high": {
            backgroundColor: "#e6ffe6",
          },
          "& .gm-percentage-medium": {
            backgroundColor: "#ffffcc",
          },
          "& .gm-percentage-low": {
            backgroundColor: "#ffe6cc",
          },
          "& .gm-percentage-critical": {
            backgroundColor: "#ffcccc",
          },
        }}
      />
    </Box>
  );
}
