"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarketVariable } from "./types";

interface VariableCardProps {
  variable: MarketVariable;
}

export function VariableCard({ variable }: VariableCardProps) {
  const hasChange = variable.changePercent !== undefined;
  const isPositive = hasChange && variable.changePercent! >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const displayValue =
    typeof variable.value === "number"
      ? variable.value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : variable.value;

  return (
    <Card className="p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-sm text-foreground">{variable.name}</h3>
          <p className="text-lg font-bold mt-1">
            {displayValue} {variable.unit || ""}
          </p>
        </div>
        {hasChange && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            <TrendIcon className="h-4 w-4" />
            <span>
              {isPositive ? "+" : ""}
              {variable.changePercent!.toFixed(2)}%
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

