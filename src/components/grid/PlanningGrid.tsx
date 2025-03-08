import { useMemo } from "react";
import { Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
} from "@mui/x-data-grid";

interface Store {
  id: string;
  name: string;
}

interface Sku {
  id: string;
  name: string;
  price: number;
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

  // ✅ Create a map of SKU prices for quick lookup
  const skuPriceMap = useMemo(() => {
    const map = new Map();
    skus.forEach((sku) => {
      map.set(sku.id, sku.price);
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

      // Assign sales units and sales dollars for each week dynamically
      calendarData.forEach((week) => {
        const salesUnits =
          planningMap.get(`${store.id}-${sku.id}-${week.week}`) || 0;
        const skuPrice = skuPriceMap.get(sku.id) || 0;
        gridDataMap.get(rowKey)[`salesUnits-${week.week}`] = salesUnits;
        gridDataMap.get(rowKey)[`salesDollars-${week.week}`] =
          salesUnits * skuPrice;
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
      },
      {
        field: `salesDollars-${week.week}`,
        headerName: "Sales Dollars",
        flex: 1,
        valueFormatter: (params: { value: number }) => {
          return `$${params}`;
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
