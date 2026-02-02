"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ChartDataPoint } from "./types";

interface OverviewChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

const timeRanges = ["1 day", "5 days", "1 month", "6 months", "1 year"];

export function OverviewChart({ data = [], isLoading = false }: OverviewChartProps) {
  const [selectedRange, setSelectedRange] = useState("1 month");

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Overview</CardTitle>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={selectedRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No chart data available</p>
            <p className="text-sm mt-1">Chart will appear here once loaded</p>
          </div>
        ) : (
          <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center relative">
            <div className="absolute top-2 left-2 text-xs text-muted-foreground">
              {Math.max(...data.map((d) => d.value)).toFixed(2)}
            </div>
            {/* Placeholder for actual chart - will be replaced with chart library */}
            <div className="w-full h-full flex items-end justify-center p-4">
              <div className="w-full h-3/4 bg-gradient-to-t from-green-500/20 to-green-500/5 rounded" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

