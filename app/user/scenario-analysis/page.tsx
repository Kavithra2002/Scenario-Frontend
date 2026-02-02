"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SelectCompany } from "@/components/features/scenario-management/SelectCompany";
import { CompanyDetails } from "@/components/features/scenario-analysis/CompanyDetails";
import { ScenarioOutput } from "@/components/features/scenario-analysis/ScenarioOutput";
import { AdjustScenarios } from "@/components/features/scenario-analysis/AdjustScenarios";
import type { Company } from "@/components/features/scenario-management/types";
import type { ScenarioAnalysisData } from "@/components/features/scenario-analysis/types";

export default function ScenarioAnalysis() {
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  
  // Empty data arrays - will be populated from backend later
  const companies: Company[] = [];
  const scenarioData: ScenarioAnalysisData | undefined = undefined;

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
    // TODO: Fetch company details and scenario output when backend is ready
    // Example:
    // fetchCompanyDetails(companyId).then(setCompanyDetails);
    // fetchScenarioOutput(companyId).then(setScenarioOutput);
    console.log("Company selected:", companyId);
  };

  // Get company type from selected company
  const selectedCompanyData = companies.find((c) => c.id === selectedCompany);
  const companyType = selectedCompanyData?.symbol ? "Bank" : undefined; // This will come from backend

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
            {selectedCompany && companyType && (
              <div className="mt-4 text-sm text-muted-foreground">
                Company Type: {companyType}
              </div>
            )}
          </Card>

          {/* Company Details Section */}
          <Card className="p-6">
            <CompanyDetails data={scenarioData?.companyDetails} />
          </Card>

          {/* Adjust Scenarios Section */}
          <Card className="p-6">
            <AdjustScenarios scenarios={scenarioData?.scenarios} />
          </Card>

          {/* Scenario Output Section */}
          <Card className="p-6">
            <ScenarioOutput data={scenarioData?.scenarioOutput} />
          </Card>
        </div>
      </main>
    </div>
  );
}

