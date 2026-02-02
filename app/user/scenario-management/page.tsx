"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SelectCompany } from "@/components/features/scenario-management/SelectCompany";
import { ExistingScenario } from "@/components/features/scenario-management/ExistingScenario";
import { RecommendedScenario } from "@/components/features/scenario-management/RecommendedScenario";
import type {
  Company,
  ExistingScenario as ExistingScenarioType,
  RecommendedScenario as RecommendedScenarioType,
} from "@/components/features/scenario-management/types";

export default function ScenarioManagement() {
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  const [selectedExistingScenario, setSelectedExistingScenario] = useState<
    string | undefined
  >();
  const [selectedRecommendedScenario, setSelectedRecommendedScenario] =
    useState<string | undefined>();

  // Empty data arrays - will be populated from backend later
  const companies: Company[] = [];
  const existingScenarios: ExistingScenarioType[] = [];
  const recommendedScenarios: RecommendedScenarioType[] = [];

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
    // Fetch scenarios for selected company
    console.log("Company selected:", companyId);
  };

  const handleExistingScenarioSelect = (scenarioId: string) => {
    setSelectedExistingScenario(scenarioId);
    console.log("Existing scenario selected:", scenarioId);
  };

  const handleRecommendedScenarioSelect = (scenarioId: string) => {
    setSelectedRecommendedScenario(scenarioId);
    console.log("Recommended scenario selected:", scenarioId);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* Select Company Section */}
          <Card className="p-6">
            <SelectCompany
              selectedCompany={selectedCompany}
              onCompanyChange={handleCompanyChange}
              companies={companies}
            />
          </Card>

          {/* Existing Scenario Section */}
          <Card className="p-6">
            <ExistingScenario
              scenarios={existingScenarios}
              selectedScenario={selectedExistingScenario}
              onScenarioSelect={handleExistingScenarioSelect}
            />
          </Card>

          {/* Recommended Scenario Section */}
          <Card className="p-6">
            <RecommendedScenario
              scenarios={recommendedScenarios}
              selectedScenario={selectedRecommendedScenario}
              onScenarioSelect={handleRecommendedScenarioSelect}
            />
          </Card>
        </div>
      </main>
    </div>
  );
}

