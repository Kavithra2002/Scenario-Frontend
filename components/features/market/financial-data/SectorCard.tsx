"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SectorData } from "./types";

interface SectorCardProps {
  sector: SectorData;
  isSelected?: boolean;
  onSelect?: (sectorId: string) => void;
  onTabChange?: (sectorId: string, tab: "analysis" | "company-list") => void;
}

export function SectorCard({
  sector,
  isSelected = false,
  onSelect,
  onTabChange,
}: SectorCardProps) {
  return (
    <Card
      className={`min-w-[320px] cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={() => onSelect?.(sector.id)}
    >
      <CardHeader>
        <CardTitle className="text-lg">{sector.name}</CardTitle>
        <Tabs defaultValue="analysis" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="analysis"
              onClick={(e) => {
                e.stopPropagation();
                onTabChange?.(sector.id, "analysis");
              }}
            >
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="company-list"
              onClick={(e) => {
                e.stopPropagation();
                onTabChange?.(sector.id, "company-list");
              }}
            >
              Company List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm">
          <span className="text-muted-foreground">No of Companies: </span>
          <span className="font-medium">
            {sector.noOfCompanies > 0 ? sector.noOfCompanies : "—"}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Contribution to ASPI: </span>
          <span className="font-medium">
            {sector.contributionToASPI > 0 ? `${sector.contributionToASPI}%` : "—"}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Total Market Cap: </span>
          <span className="font-medium">
            {sector.totalMarketCap > 0
              ? `LKR ${sector.totalMarketCap} Trillion`
              : "—"}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Avg Dividend Yield: </span>
          <span className="font-medium">
            {sector.avgDividendYield > 0 ? `${sector.avgDividendYield}%` : "—"}
          </span>
        </div>
        {sector.lastUpdated && (
          <div className="text-xs text-muted-foreground mt-3">
            Last Updated: {sector.lastUpdated}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

