"use client";

import { TrendingUp } from "lucide-react";

export function Overview() {
  // Simple bar representation for "chart" - no recharts dependency
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ];
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex h-[200px] items-end gap-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className="w-full rounded-t bg-primary/80 transition-all"
              style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: "8px" }}
            />
            <span className="text-xs text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <TrendingUp className="mr-2 h-4 w-4" />
        <span>+20.1% from last month</span>
      </div>
    </div>
  );
}
