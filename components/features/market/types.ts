// TypeScript types for Market page
// Data structure ready for backend integration

export interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  currency?: string;
}

export interface MarketVariable {
  name: string;
  value: number | string;
  change?: number;
  changePercent?: number;
  unit?: string;
}

export interface MarketNewsItem {
  id: string;
  title: string;
  summary?: string;
  imageUrl?: string;
  date?: string;
}

export interface PerformanceData {
  company: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface ChartData {
  value: number;
  change: number;
  changePercent: number;
  timeRange?: string;
  closedTime?: string;
  preMarket?: {
    value: number;
    change: number;
    changePercent: number;
  };
}

export interface MarketData {
  popularIndices?: IndexData[];
  topPerformance?: PerformanceData[];
  underPerformance?: PerformanceData[];
  indexVariables?: MarketVariable[];
  macroeconomicDeterminants?: MarketVariable[];
  marketSentiment?: MarketVariable[];
  news?: MarketNewsItem[];
  charts?: ChartData[];
}

