"use client";

import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value?: string | number;
  /** Secondary line under the value, e.g. "+20.1% from last month" */
  changeText?: string;
  showChartIcon?: boolean;
  bgColor?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  changeText,
  showChartIcon = false,
  bgColor,
  className,
}: MetricCardProps) {
  const displayValue = value !== undefined && value !== null ? String(value) : "—";

  return (
    <div
      className={cn(
        "rounded-lg p-5 flex flex-col justify-between min-h-[120px] transition-all",
        "bg-[#2C2C2C] dark:bg-[#2C2C2C] border-0",
        "hover:bg-[#353535]",
        bgColor,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-zinc-400">{label}</span>
        {showChartIcon && (
          <BarChart3 className="h-4 w-4 text-zinc-500 shrink-0" />
        )}
      </div>
      <div className="mt-2 flex-1 flex flex-col justify-center">
        <span className="text-2xl font-bold text-white tracking-tight">
          {displayValue}
        </span>
        {changeText && (
          <span className="text-sm text-zinc-400 mt-1">{changeText}</span>
        )}
      </div>
    </div>
  );
}
