"use client";

import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value?: string | number;
  showChartIcon?: boolean;
  bgColor?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  showChartIcon = false,
  bgColor,
  className,
}: MetricCardProps) {
  const displayValue = value !== undefined && value !== null ? String(value) : "—";

  return (
    <Card
      className={cn(
        "p-4 flex flex-col justify-between min-h-[100px] transition-all hover:shadow-md",
        bgColor,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {showChartIcon && (
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="mt-2">
        <span className="text-lg font-semibold text-foreground">{displayValue}</span>
      </div>
    </Card>
  );
}

