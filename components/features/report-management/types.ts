// TypeScript types for Report Management
// Data structure ready for backend integration

export interface FinancialData {
  company: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
}

export interface RatioData {
  ratio: string;
  value: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category?: string;
  content?: string;
}

export interface StockPrediction {
  company: string;
  current: number;
  target: number;
  upside: number;
  rec: string; // Recommendation (e.g., "Buy", "Hold", "Sell")
}

export interface ReportManagementData {
  financial?: FinancialData[];
  ratios?: RatioData[];
  news?: NewsItem[];
  predictions?: StockPrediction[];
}

