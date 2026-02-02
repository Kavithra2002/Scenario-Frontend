"use client";

import { useState } from "react";
import { ESGSectorCard } from "@/components/features/market/non-financial-data/ESGSectorCard";
import { ESGScoreOverview } from "@/components/features/market/non-financial-data/ESGScoreOverview";
import { ESGPerformanceChart } from "@/components/features/market/non-financial-data/ESGPerformanceChart";
import { EmployeeGrowthChart } from "@/components/features/market/non-financial-data/EmployeeGrowthChart";
import { SustainabilityScoreChart } from "@/components/features/market/non-financial-data/SustainabilityScoreChart";
import { ESGCompanyList } from "@/components/features/market/non-financial-data/ESGCompanyList";
import type { NonFinancialDataPageData } from "@/components/features/market/non-financial-data/types";
import { defaultESGSectors } from "@/components/features/market/non-financial-data/sectors";
import type { ESGSectorData } from "@/components/features/market/non-financial-data/types";

export default function NonFinancialData() {
  const [selectedSector, setSelectedSector] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"analysis" | "company-list">("analysis");

  // Empty data - will be populated from backend later
  const [nonFinancialData] = useState<NonFinancialDataPageData | undefined>(undefined);
  
  // Use backend data if available, otherwise use default sectors - limit to first 3
  const sectors: ESGSectorData[] = nonFinancialData?.sectors && nonFinancialData.sectors.length > 0
    ? nonFinancialData.sectors.slice(0, 3)
    : defaultESGSectors.slice(0, 3);

  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId);
    // TODO: Fetch sector-specific data when backend is ready
    console.log("Sector selected:", sectorId);
  };

  const handleTabChange = (sectorId: string, tab: "analysis" | "company-list") => {
    setActiveTab(tab);
    // TODO: Fetch data based on selected tab when backend is ready
    console.log("Tab changed:", sectorId, tab);
  };

  return (
    <div className="w-full space-y-6">
      {/* Sector Cards - Only 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {sectors.map((sector) => (
          <ESGSectorCard
            key={sector.id}
            sector={sector}
            isSelected={selectedSector === sector.id}
            onSelect={handleSectorSelect}
            onTabChange={handleTabChange}
          />
        ))}
      </div>

      {/* ESG Score Overview Chart */}
      <ESGScoreOverview data={nonFinancialData?.esgScoreOverview} />

      {/* Three Chart Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ESGPerformanceChart data={nonFinancialData?.esgPerformance} />
        <EmployeeGrowthChart data={nonFinancialData?.employeeGrowth} />
        <SustainabilityScoreChart data={nonFinancialData?.sustainabilityScore} />
      </div>

      {/* Company List */}
      <ESGCompanyList data={nonFinancialData?.companies} />
    </div>
  );
}

