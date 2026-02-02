"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndexCardProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  currency?: string;
  showGraph?: boolean;
}

export function IndexCard({
  name,
  value,
  change,
  changePercent,
  currency = "LKR",
  showGraph = true,
}: IndexCardProps) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className="p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-sm text-foreground">{name}</h3>
          <p className="text-lg font-bold mt-1">
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {currency}
          </p>
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          <TrendIcon className="h-4 w-4" />
          <span>
            {isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
      {showGraph && (
        <div className="mt-3 h-12 w-full bg-muted/30 rounded flex items-end justify-center">
          {/* Placeholder for graph - will be replaced with actual chart component */}
          <div className="w-full h-full flex items-end">
            <div className="w-full h-8 bg-gradient-to-t from-primary/20 to-primary/5 rounded" />
          </div>
        </div>
      )}
    </Card>
  );
}

