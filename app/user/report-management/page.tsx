"use client";

import { useState } from "react";
import { Financial } from "@/components/features/report-management/Financial";
import { Ratios } from "@/components/features/report-management/Ratios";
import { NewsAndUpdates } from "@/components/features/report-management/NewsAndUpdates";
import { LatestStockPredictions } from "@/components/features/report-management/LatestStockPredictions";
import type { ReportManagementData } from "@/components/features/report-management/types";
import type { Company } from "@/components/features/scenario-management/types";

export default function ReportManagement() {
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  
  // Empty data arrays - will be populated from backend later
  const companies: Company[] = [];
  const reportData: ReportManagementData | undefined = undefined;

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
    // TODO: Fetch ratios for selected company when backend is ready
    // Example:
    // fetchRatios(companyId).then(setRatios);
    console.log("Company selected for ratios:", companyId);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          {/* Grid Layout: 2x2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Left: Financial */}
            <div className="lg:col-span-1">
              <Financial data={reportData?.financial} />
            </div>

            {/* Top Right: Ratios */}
            <div className="lg:col-span-1">
              <Ratios
                data={reportData?.ratios}
                companies={companies}
                selectedCompany={selectedCompany}
                onCompanyChange={handleCompanyChange}
              />
            </div>

            {/* Bottom Left: News and Updates */}
            <div className="lg:col-span-1">
              <NewsAndUpdates data={reportData?.news} />
            </div>

            {/* Bottom Right: Latest Stock Predictions */}
            <div className="lg:col-span-1">
              <LatestStockPredictions data={reportData?.predictions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

