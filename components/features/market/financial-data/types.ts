// TypeScript types for Financial Data page
// Data structure ready for backend integration

export interface SectorData {
  id: string;
  name: string;
  noOfCompanies: number;
  contributionToASPI: number;
  totalMarketCap: number;
  avgDividendYield: number;
  lastUpdated: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface ValuationRatioData {
  quarter: string;
  pe: number;
  ps: number;
}

export interface DividendHistoryData {
  year: string;
  dividendsPerShare: number;
  dividendYield: number;
}

export interface SummaryData {
  revenue: number;
  netIncome: number;
  marketCap: number;
  pe: number;
  ps: number;
}

export interface CompanyData {
  company: string;
  symbol: string;
  esgScore: number;
  employees: number;
  sustainability: string;
  diversity: number;
  communityImpact: number;
}

export interface FinancialDataPageData {
  sectors?: SectorData[];
  overviewChart?: ChartDataPoint[];
  valuationRatios?: ValuationRatioData[];
  dividendHistory?: DividendHistoryData[];
  summary?: SummaryData;
  companies?: CompanyData[];
}

