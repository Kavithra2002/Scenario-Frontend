"use client";

import { ColumnDef } from "./types";
import { FinancialData } from "./types";
import { formatCurrency, formatPercent, formatNumber } from "./utils";

export const financialColumns: ColumnDef<FinancialData>[] = [
  {
    id: "symbol",
    header: "Symbol",
    accessorKey: "symbol",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded bg-yellow-500" />
        <span className="font-medium">{row.symbol}</span>
      </div>
    ),
    sortable: true,
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "price",
    cell: (row) => formatCurrency(row.price),
    sortable: true,
  },
  {
    id: "changePercent",
    header: "Change %",
    accessorKey: "changePercent",
    cell: (row) => (
      <span
        className={
          row.changePercent >= 0 ? "text-green-600" : "text-red-600"
        }
      >
        {formatPercent(row.changePercent)}
      </span>
    ),
    sortable: true,
  },
  {
    id: "volume",
    header: "Volume",
    accessorKey: "volume",
    cell: (row) => formatNumber(row.volume),
    sortable: true,
  },
  {
    id: "relVolume",
    header: "Rel Volume",
    accessorKey: "relVolume",
    cell: (row) => row.relVolume.toFixed(1),
    sortable: true,
  },
  {
    id: "marketCap",
    header: "Market cap",
    accessorKey: "marketCap",
    cell: (row) => formatCurrency(row.marketCap),
    sortable: true,
  },
  {
    id: "pe",
    header: "P/E",
    accessorKey: "pe",
    cell: (row) => (row.pe ? row.pe.toFixed(2) : "—"),
    sortable: true,
  },
  {
    id: "epsDilTTM",
    header: "EPS dil TTM",
    accessorKey: "epsDilTTM",
    cell: (row) => formatCurrency(row.epsDilTTM),
    sortable: true,
  },
  {
    id: "epsDilGrowthTTM",
    header: "EPS dil growth TTM YoY",
    accessorKey: "epsDilGrowthTTM",
    cell: (row) => (
      <span
        className={
          row.epsDilGrowthTTM >= 0 ? "text-green-600" : "text-red-600"
        }
      >
        {formatPercent(row.epsDilGrowthTTM)}
      </span>
    ),
    sortable: true,
  },
  {
    id: "divYield",
    header: "Div yield % TTM",
    accessorKey: "divYield",
    cell: (row) => `${row.divYield.toFixed(2)}%`,
    sortable: true,
  },
  {
    id: "sector",
    header: "Sector",
    accessorKey: "sector",
    cell: (row) => row.sector,
    sortable: true,
  },
  {
    id: "analystRating",
    header: "Analyst Rating",
    accessorKey: "analystRating",
    cell: (row) => (
      <span className="px-2 py-1 rounded-md bg-muted text-sm">
        {row.analystRating}
      </span>
    ),
    sortable: true,
  },
];

