"use client";

import { useState } from "react";
import { SectorCard } from "@/components/features/market/financial-data/SectorCard";
import { OverviewChart } from "@/components/features/market/financial-data/OverviewChart";
import { ValuationRatiosChart } from "@/components/features/market/financial-data/ValuationRatiosChart";
import { DividendHistoryChart } from "@/components/features/market/financial-data/DividendHistoryChart";
import { SummaryChart } from "@/components/features/market/financial-data/SummaryChart";
import { CompanyList } from "@/components/features/market/financial-data/CompanyList";
import type { FinancialDataPageData } from "@/components/features/market/financial-data/types";
import { defaultFinancialSectors } from "@/components/features/market/financial-data/sectors";
import type { SectorData } from "@/components/features/market/financial-data/types";

export default function FinancialData() {
  const [selectedSector, setSelectedSector] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"analysis" | "company-list">("analysis");

  // Empty data - will be populated from backend later
  const [financialData] = useState<FinancialDataPageData | undefined>(undefined);
  
  // Use backend data if available, otherwise use default sectors - limit to first 3
  const sectors: SectorData[] = financialData?.sectors && financialData.sectors.length > 0
    ? financialData.sectors.slice(0, 3)
    : defaultFinancialSectors.slice(0, 3);

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
          <SectorCard
            key={sector.id}
            sector={sector}
            isSelected={selectedSector === sector.id}
            onSelect={handleSectorSelect}
            onTabChange={handleTabChange}
          />
        ))}
      </div>

      {/* Overview Chart */}
      <OverviewChart data={financialData?.overviewChart} />

      {/* Three Chart Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ValuationRatiosChart data={financialData?.valuationRatios} />
        <DividendHistoryChart data={financialData?.dividendHistory} />
        <SummaryChart data={financialData?.summary} />
      </div>

      {/* Company List */}
      <CompanyList data={financialData?.companies} />
    </div>
  );
}

