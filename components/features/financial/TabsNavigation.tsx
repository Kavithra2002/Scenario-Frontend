"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "performance", label: "Performance" },
  { value: "valuation", label: "Valuation" },
  { value: "dividends", label: "Dividends" },
  { value: "profitability", label: "Profitability" },
  { value: "incomeStatement", label: "Income Statement" },
  { value: "balanceSheet", label: "Balance Sheet" },
  { value: "cashFlow", label: "Cash Flow" },
  { value: "technicals", label: "Technicals" },
];

export function TabsNavigation({
  activeTab = "overview",
  onTabChange,
}: TabsNavigationProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

