"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { financialColumns } from "./columns";
import { FinancialData, ColumnDef } from "./types";

// Re-export types and columns for convenience
export type { FinancialData, ColumnDef } from "./types";
export { financialColumns } from "./columns";

interface FinancialTableProps {
  data?: FinancialData[];
  columns?: ColumnDef<FinancialData>[];
  isLoading?: boolean;
}

export function FinancialTable({
  data = [],
  columns = financialColumns,
  isLoading = false,
}: FinancialTableProps) {
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className="font-semibold">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Loading data...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    No financial data available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Data will appear here once loaded
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={row.symbol || index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.cell
                      ? column.cell(row)
                      : (row[column.accessorKey] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

