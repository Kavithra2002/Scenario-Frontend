"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SustainabilityScoreData } from "./types";

interface SustainabilityScoreChartProps {
  data?: SustainabilityScoreData;
  isLoading?: boolean;
}

export function SustainabilityScoreChart({
  data,
  isLoading = false,
}: SustainabilityScoreChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sustainability Score</CardTitle>
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
          <CardTitle>Sustainability Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-48 w-48 mx-auto">
          {/* Donut chart placeholder */}
          <div className="relative h-48 w-48 rounded-full border-8 border-green-500 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-0 border-r-0" />
            <div className="absolute inset-0 rounded-full border-8 border-gray-400 border-t-0 border-l-0" />
            <div className="text-center">
              <div className="text-2xl font-bold">{data.total}%</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs">Environmental</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs">Social</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-xs">Governance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

