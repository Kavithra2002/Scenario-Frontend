"use client";

import { useState } from "react";
import { filterCategories } from "./filterConfig";
import { FilterState } from "./types";
import { Button } from "@/components/ui/button";

// Re-export types for convenience
export type { FilterState, FilterCategory, FilterOption } from "./types";

interface FilterSectionProps {
  onFilterChange?: (filters: FilterState) => void;
}

const initialFilterState: FilterState = {
  marketPerformance: "allStocks",
  marketCap: "largeCap",
  financialMetrics: "highestRevenue",
  trading: "unusualVolume",
  priceLevels: "mostExpensive",
  other: "largestEmployers",
};

export function FilterSection({ onFilterChange }: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  const handleFilterSelect = (categoryId: string, value: string) => {
    const newFilters = {
      ...filters,
      [categoryId]: value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const isSelected = (categoryId: string, value: string) => {
    return filters[categoryId as keyof FilterState] === value;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {filterCategories.map((category) => (
          <div key={category.id} className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
              {category.title}
            </h3>
            <div className="flex flex-col gap-2">
              {category.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  suppressHydrationWarning
                  className={`text-left text-sm font-normal transition-colors ${
                    isSelected(category.id, option.value)
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                  onClick={() => handleFilterSelect(category.id, option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

