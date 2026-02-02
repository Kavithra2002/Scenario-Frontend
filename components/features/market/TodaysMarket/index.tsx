"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PopularIndices } from "./PopularIndices";
import { TopPerformance } from "./TopPerformance";
import { UnderPerformance } from "./UnderPerformance";
import { IndexVariables } from "./IndexVariables";
import type { MarketData } from "../types";

interface TodaysMarketProps {
  data?: MarketData;
  isLoading?: boolean;
}

export function TodaysMarket({ data, isLoading = false }: TodaysMarketProps) {
  const [activeSubTab, setActiveSubTab] = useState("popular-indices");
  const [activeVariableTab, setActiveVariableTab] = useState("index-variables");

  return (
    <div className="space-y-6">
      {/* First Set of Sub-tabs: Popular Indices, Top Performance, Under Performance */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList>
          <TabsTrigger value="popular-indices">Popular Indices</TabsTrigger>
          <TabsTrigger value="top-performance">Top Performance</TabsTrigger>
          <TabsTrigger value="under-performance">Under Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="popular-indices" className="mt-4">
          <PopularIndices data={data?.popularIndices} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="top-performance" className="mt-4">
          <TopPerformance data={data?.topPerformance} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="under-performance" className="mt-4">
          <UnderPerformance data={data?.underPerformance} isLoading={isLoading} />
        </TabsContent>
      </Tabs>

      {/* Second Set of Sub-tabs: Index Variables, Macroeconomic Determinants, Market Sentiment */}
      <Tabs value={activeVariableTab} onValueChange={setActiveVariableTab}>
        <TabsList>
          <TabsTrigger value="index-variables">Index Variables</TabsTrigger>
          <TabsTrigger value="macroeconomic-determinants">
            Macroeconomic Determinants
          </TabsTrigger>
          <TabsTrigger value="market-sentiment">Market Sentiment</TabsTrigger>
        </TabsList>

        <TabsContent value="index-variables" className="mt-4">
          <IndexVariables data={data?.indexVariables} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="macroeconomic-determinants" className="mt-4">
          <IndexVariables
            data={data?.macroeconomicDeterminants}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="market-sentiment" className="mt-4">
          <IndexVariables data={data?.marketSentiment} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

