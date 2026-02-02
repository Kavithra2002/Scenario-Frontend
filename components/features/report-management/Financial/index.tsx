"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import type { FinancialData } from "../types";
import { formatCurrency, formatNumber } from "@/components/features/financial/FinancialTable/utils";

interface FinancialProps {
  data?: FinancialData[];
  isLoading?: boolean;
}

export function Financial({ data = [], isLoading = false }: FinancialProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string>("");

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Financial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterValue} onValueChange={setFilterValue}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Top Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="top10">Top 10</SelectItem>
              <SelectItem value="top20">Top 20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md max-h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Market Cap</TableHead>
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
                        No financial data available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Data will appear here once loaded
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((row, index) => (
                  <TableRow key={row.symbol || index}>
                    <TableCell className="font-medium">{row.company}</TableCell>
                    <TableCell>{row.symbol}</TableCell>
                    <TableCell>LKR {row.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          row.change >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {row.change >= 0 ? "+" : ""}
                        {row.change.toFixed(2)} ({row.changePercent >= 0 ? "+" : ""}
                        {row.changePercent.toFixed(2)}%)
                      </span>
                    </TableCell>
                    <TableCell>{formatNumber(row.marketCap)}</TableCell>
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

