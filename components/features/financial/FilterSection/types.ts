// Types for Filter Section

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
}

export interface FilterState {
  marketPerformance: string;
  marketCap: string;
  financialMetrics: string;
  trading: string;
  priceLevels: string;
  other: string;
}

