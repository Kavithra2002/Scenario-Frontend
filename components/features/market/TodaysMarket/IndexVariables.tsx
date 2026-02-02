"use client";

import { VariableCard } from "../VariableCard";
import type { MarketVariable } from "../types";

interface IndexVariablesProps {
  data?: MarketVariable[];
  isLoading?: boolean;
}

export function IndexVariables({ data = [], isLoading = false }: IndexVariablesProps) {
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
        <p>No variable data available</p>
        <p className="text-sm mt-1">Data will appear here once loaded</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {data.map((variable, idx) => (
        <VariableCard key={variable.name || idx} variable={variable} />
      ))}
    </div>
  );
}

