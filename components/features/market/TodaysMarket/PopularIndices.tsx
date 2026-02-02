"use client";

import { IndexCard } from "../IndexCard";
import type { IndexData } from "../types";

interface PopularIndicesProps {
  data?: IndexData[];
  isLoading?: boolean;
}

export function PopularIndices({ data = [], isLoading = false }: PopularIndicesProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No index data available</p>
        <p className="text-sm mt-1">Data will appear here once loaded</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((index, idx) => (
        <IndexCard
          key={index.name || idx}
          name={index.name}
          value={index.value}
          change={index.change}
          changePercent={index.changePercent}
          currency={index.currency}
          showGraph={true}
        />
      ))}
    </div>
  );
}

