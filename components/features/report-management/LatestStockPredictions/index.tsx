"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import type { StockPrediction } from "../types";
import { formatCurrency } from "@/components/features/financial/FinancialTable/utils";

interface LatestStockPredictionsProps {
  data?: StockPrediction[];
  isLoading?: boolean;
}

export function LatestStockPredictions({
  data = [],
  isLoading = false,
}: LatestStockPredictionsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    return item.company.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Latest Stock Predictions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search predictions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-md max-h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Upside</TableHead>
                <TableHead>Rec</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">Loading data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        No prediction data available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Data will appear here once loaded
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((row, index) => (
                  <TableRow key={row.company || index}>
                    <TableCell className="font-medium">{row.company}</TableCell>
                    <TableCell>{formatCurrency(row.current)}</TableCell>
                    <TableCell>{formatCurrency(row.target)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          row.upside >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {row.upside >= 0 ? "+" : ""}
                        {row.upside.toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          row.rec.toLowerCase() === "buy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : row.rec.toLowerCase() === "sell"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {row.rec}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

