"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PopularIndices } from "@/components/features/market/TodaysMarket/PopularIndices";
import { TopPerformance } from "@/components/features/market/TodaysMarket/TopPerformance";
import { UnderPerformance } from "@/components/features/market/TodaysMarket/UnderPerformance";
import { IndexVariables } from "@/components/features/market/TodaysMarket/IndexVariables";
import { ChartCard } from "@/components/features/market/ChartCard";
import type { MarketData } from "@/components/features/market/types";

export default function TodayMarket() {
  const [activeSubTab, setActiveSubTab] = useState("popular-indices");
  const [activeVariableTab, setActiveVariableTab] = useState("index-variables");
  
  // Empty data - will be populated from backend later
  const [marketData] = useState<MarketData | undefined>(undefined);

  const handleTimeRangeChange = (range: string) => {
    // TODO: Fetch chart data for selected time range when backend is ready
    console.log("Time range changed:", range);
  };

  return (
    <div className="w-full space-y-6">
      {/* First Set of Sub-tabs: Popular Indices, Top Performance, Under Performance */}
      <Card className="p-6">
        <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
          <TabsList>
            <TabsTrigger value="popular-indices">Popular Indices</TabsTrigger>
            <TabsTrigger value="top-performance">Top Performance</TabsTrigger>
            <TabsTrigger value="under-performance">Under Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="popular-indices" className="mt-4">
            <PopularIndices data={marketData?.popularIndices} />
          </TabsContent>

          <TabsContent value="top-performance" className="mt-4">
            <TopPerformance data={marketData?.topPerformance} />
          </TabsContent>

          <TabsContent value="under-performance" className="mt-4">
            <UnderPerformance data={marketData?.underPerformance} />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Second Set of Sub-tabs: Index Variables, Macroeconomic Determinants, Market Sentiment */}
      <Card className="p-6">
        <Tabs value={activeVariableTab} onValueChange={setActiveVariableTab}>
          <TabsList>
            <TabsTrigger value="index-variables">Index Variables</TabsTrigger>
            <TabsTrigger value="macroeconomic-determinants">
              Macroeconomic Determinants
            </TabsTrigger>
            <TabsTrigger value="market-sentiment">Market Sentiment</TabsTrigger>
          </TabsList>

          <TabsContent value="index-variables" className="mt-4">
            <IndexVariables data={marketData?.indexVariables} />
          </TabsContent>

          <TabsContent value="macroeconomic-determinants" className="mt-4">
            <IndexVariables data={marketData?.macroeconomicDeterminants} />
          </TabsContent>

          <TabsContent value="market-sentiment" className="mt-4">
            <IndexVariables data={marketData?.marketSentiment} />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Chart Components - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          data={marketData?.charts?.[0]}
          onTimeRangeChange={handleTimeRangeChange}
        />
        <ChartCard
          data={marketData?.charts?.[1]}
          onTimeRangeChange={handleTimeRangeChange}
        />
      </div>
    </div>
  );
}

