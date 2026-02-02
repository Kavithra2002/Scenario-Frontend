"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SummaryData } from "./types";
import { formatNumber } from "@/components/features/financial/FinancialTable/utils";

interface SummaryChartProps {
  data?: SummaryData;
  isLoading?: boolean;
}

export function SummaryChart({ data, isLoading = false }: SummaryChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const total = data.revenue + data.netIncome + data.marketCap;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 w-48 mx-auto">
          {/* Donut chart placeholder */}
          <div className="relative h-48 w-48 rounded-full border-8 border-blue-500 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-teal-500 border-t-0 border-r-0" />
            <div className="absolute inset-0 rounded-full border-8 border-gray-400 border-t-0 border-l-0" />
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(data.marketCap)}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="text-muted-foreground">Price to earning ratio (P/E)</div>
          <div className="font-medium">{data.pe.toFixed(2)}</div>
          <div className="text-muted-foreground">Price to sales ratio (P/S)</div>
          <div className="font-medium">{data.ps.toFixed(2)}</div>
        </div>
        <div className="mt-4 flex gap-4 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs">Market Cap</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-teal-500" />
            <span className="text-xs">Net Income</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs">Revenue</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

