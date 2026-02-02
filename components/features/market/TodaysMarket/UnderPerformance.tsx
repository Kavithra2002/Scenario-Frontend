"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PerformanceData } from "../types";

interface UnderPerformanceProps {
  data?: PerformanceData[];
  isLoading?: boolean;
}

export function UnderPerformance({ data = [], isLoading = false }: UnderPerformanceProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No performance data available</p>
        <p className="text-sm mt-1">Data will appear here once loaded</p>
      </div>
    );
  }

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead>Change %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={item.symbol || idx}>
              <TableCell className="font-medium">{item.company}</TableCell>
              <TableCell>{item.symbol}</TableCell>
              <TableCell>LKR {item.price.toFixed(2)}</TableCell>
              <TableCell
                className={item.change >= 0 ? "text-green-600" : "text-red-600"}
              >
                {item.change >= 0 ? "+" : ""}
                {item.change.toFixed(2)}
              </TableCell>
              <TableCell
                className={item.changePercent >= 0 ? "text-green-600" : "text-red-600"}
              >
                {item.changePercent >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

