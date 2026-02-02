// TypeScript types for Scenario Analysis
// Data structure ready for backend integration

export interface CompanyDetails {
  revenue?: number;
  netProfit?: number;
  eps?: number;
  operatingCost?: number;
  exchangeRate?: number;
  interestExpenses?: number;
  sectorGrowth?: number;
  targetPrice?: number;
}

export interface ScenarioOutput extends CompanyDetails {
  // Same structure as CompanyDetails, but will contain calculated scenario values
}

export interface ScenarioAnalysisData {
  companyId?: string;
  companyName?: string;
  companyType?: string;
  companyDetails?: CompanyDetails;
  scenarioOutput?: ScenarioOutput;
  scenarios?: Array<{
    id: string;
    name: string;
  }>;
}

