"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChartData {
  value: number;
  change: number;
  changePercent: number;
  timeRange?: string;
  closedTime?: string;
  preMarket?: {
    value: number;
    change: number;
    changePercent: number;
  };
}

interface ChartCardProps {
  title?: string;
  data?: ChartData;
  isLoading?: boolean;
  timeRanges?: string[];
  activeTimeRange?: string;
  onTimeRangeChange?: (range: string) => void;
}

export function ChartCard({
  title,
  data,
  isLoading = false,
  timeRanges = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "Max"],
  activeTimeRange = "1D",
  onTimeRangeChange,
}: ChartCardProps) {
  const [selectedRange, setSelectedRange] = useState(activeTimeRange);

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    onTimeRangeChange?.(range);
  };

  const isPositive = data?.changePercent ? data.changePercent >= 0 : false;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : data ? (
          <>
            {/* Change Indicator */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-lg font-semibold",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {data.change >= 0 ? "+" : ""}
                {data.change.toFixed(2)} ({data.changePercent >= 0 ? "+" : ""}
                {data.changePercent.toFixed(2)}%){" "}
                {isPositive ? "▲" : "▼"} today
              </span>
            </div>

            {/* Closed Time */}
            {data.closedTime && (
              <p className="text-sm text-muted-foreground">
                Closed: {data.closedTime} Disclaimer
              </p>
            )}

            {/* Pre-market Data */}
            {data.preMarket && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Pre-market</span>
                <span className="text-sm">
                  {data.preMarket.value.toFixed(2)}{" "}
                  {data.preMarket.change >= 0 ? "+" : ""}
                  {data.preMarket.change.toFixed(2)} (
                  {data.preMarket.changePercent >= 0 ? "+" : ""}
                  {data.preMarket.changePercent.toFixed(2)}%)
                </span>
              </div>
            )}

            {/* Time Range Buttons */}
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRangeChange(range)}
                  className="h-8"
                >
                  {range}
                </Button>
              ))}
            </div>

            {/* Chart Placeholder */}
            <div className="h-64 w-full bg-muted/30 rounded-md flex items-center justify-center relative">
              <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                10.0
              </div>
              {/* Placeholder for actual chart - will be replaced with chart library */}
              <div className="w-full h-full flex items-end justify-center p-4">
                <div
                  className={cn(
                    "w-full h-3/4 rounded-t",
                    isPositive
                      ? "bg-gradient-to-t from-green-500/20 to-green-500/5"
                      : "bg-gradient-to-t from-red-500/20 to-red-500/5"
                  )}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No chart data available</p>
            <p className="text-sm mt-1">Chart will appear here once loaded</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

