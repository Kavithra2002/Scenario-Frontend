// TypeScript types for Financial Data
// This defines the structure of data that will be added later

export interface FinancialData {
  symbol: string;
  price: number;
  changePercent: number;
  volume: number;
  relVolume: number;
  marketCap: number;
  pe: number | null;
  epsDilTTM: number;
  epsDilGrowthTTM: number;
  divYield: number;
  sector: string;
  analystRating: string;
}

// Column definition structure
export interface ColumnDef<T = any> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
}

