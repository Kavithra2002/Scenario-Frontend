// TypeScript types for Scenario Management
// Data structure ready for backend integration

export interface Company {
  id: string;
  name: string;
  symbol?: string;
}

export interface ScenarioValue {
  label: string;
  value: number;
  unit?: string;
}

export interface Scenario {
  id: string;
  name: string;
  values: ScenarioValue[];
  price?: number;
  currency?: string;
  description?: string;
  category?: string;
}

export interface ExistingScenario extends Scenario {
  createdAt?: string;
  updatedAt?: string;
  status?: "active" | "inactive" | "draft";
}

export interface RecommendedScenario extends Scenario {
  recommendationReason?: string;
  confidence?: number;
  bankName?: string;
}


