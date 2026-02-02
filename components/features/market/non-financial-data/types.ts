// TypeScript types for Non Financial Data page
// Data structure ready for backend integration

export interface ESGSectorData {
  id: string;
  name: string;
  noOfCompanies: number;
  avgESGScore: number;
  avgEmployees: number;
  sustainabilityRating: string;
  diversityIndex: number;
  lastUpdated: string;
}

export interface ESGChartDataPoint {
  day: string;
  score: number;
}

export interface ESGPerformanceData {
  year: string;
  environmental: number;
  social: number;
  governance: number;
}

export interface EmployeeGrowthData {
  year: string;
  employeeCount: number;
  growthRate: number;
}

export interface SustainabilityScoreData {
  environmentalImpact: number;
  socialResponsibility: number;
  governance: number;
  total: number;
}

export interface ESGCompanyData {
  company: string;
  symbol: string;
  esgScore: number;
  employees: number;
  sustainability: string;
  diversity: number;
  communityImpact: number;
}

export interface NonFinancialDataPageData {
  sectors?: ESGSectorData[];
  esgScoreOverview?: ESGChartDataPoint[];
  esgPerformance?: ESGPerformanceData[];
  employeeGrowth?: EmployeeGrowthData[];
  sustainabilityScore?: SustainabilityScoreData;
  companies?: ESGCompanyData[];
}

