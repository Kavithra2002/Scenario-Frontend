"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmployeeGrowthData } from "./types";

interface EmployeeGrowthChartProps {
  data?: EmployeeGrowthData[];
  isLoading?: boolean;
}

export function EmployeeGrowthChart({
  data = [],
  isLoading = false,
}: EmployeeGrowthChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Employee Growth</CardTitle>
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
        <CardTitle>Employee Growth</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No data available</p>
          </div>
        ) : (
          <div className="h-48 w-full bg-muted/30 rounded-md flex items-center justify-center relative">
            {/* Placeholder for actual chart - will be replaced with chart library */}
            <div className="w-full h-full flex items-end justify-center p-4">
              <div className="flex items-end gap-4 w-full h-full">
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-1/4 bg-teal-500 rounded-t" />
                  <div className="w-full h-1 border-t-2 border-orange-500" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-1/3 bg-teal-500 rounded-t" />
                  <div className="w-full h-1 border-t-2 border-orange-500" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-2/3 bg-teal-500 rounded-t" />
                  <div className="w-full h-1 border-t-2 border-orange-500" />
                </div>
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-full bg-teal-500 rounded-t" />
                  <div className="w-full h-1 border-t-2 border-orange-500" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-xs">Employee Count</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-xs">Growth Rate</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

