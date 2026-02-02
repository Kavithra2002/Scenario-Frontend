"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { FilterSection } from "@/components/features/financial/FilterSection";
import { FinancialTable, type FinancialData } from "@/components/features/financial/FinancialTable";
import { TableToolbar } from "@/components/features/financial/FinancialTable/TableToolbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FilterState } from "@/components/features/financial/FilterSection";

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

export default function FinancialView() {
  const [filters, setFilters] = useState<FilterState | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Empty data array - will be populated later
  // TODO: Fetch data based on activeTab when backend is ready
  // Example:
  // const { data, isLoading } = useFinancialData(activeTab, filters);
  const allFinancialData: FinancialData[] = [];

  // Filter data based on active tab
  // When backend is ready, this will fetch different data for each tab
  const financialData = useMemo(() => {
    // TODO: Replace with actual API call based on activeTab
    // For now, return empty array - will be populated from backend
    // Each tab should fetch different data:
    // - overview: general financial data
    // - performance: performance metrics
    // - valuation: valuation metrics
    // - dividends: dividend information
    // - profitability: profitability ratios
    // - incomeStatement: income statement data
    // - balanceSheet: balance sheet data
    // - cashFlow: cash flow data
    // - technicals: technical indicators
    
    return allFinancialData;
  }, [activeTab, filters, allFinancialData]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Filter logic will be implemented later when data is available
    console.log("Filters changed:", newFilters);
    console.log("Active tab:", activeTab);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // TODO: Fetch new data for the selected tab when backend is ready
    console.log("Tab changed to:", value);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* Page Title */}
          <div>
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Financial View
            </h1>
          </div>

          {/* Filter Section */}
          <Card className="p-6">
            <FilterSection onFilterChange={handleFilterChange} />
          </Card>

          {/* Combined Tabs, Toolbar, and Table in One Card */}
          <Card className="p-0 overflow-hidden">
            {/* Tabs Navigation - Integrated at the top */}
            <div className="border-b border-border bg-muted/30 px-6 pt-4">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 h-auto p-1 bg-transparent">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="text-xs sm:text-sm px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Table Toolbar and Table - Connected below tabs */}
            <div className="p-6">
              <div className="mb-4">
                <TableToolbar
                  searchValue={searchQuery}
                  onSearchChange={setSearchQuery}
                  resultCount={financialData.length}
                />
              </div>
              
              {/* Table - Shows data based on active tab */}
              <div className="border rounded-md">
                <FinancialTable data={financialData} />
              </div>
              
              {/* Tab indicator - shows which view is active */}
              <div className="mt-3 text-xs text-muted-foreground">
                Showing: <span className="font-medium capitalize">{tabs.find(t => t.value === activeTab)?.label || activeTab}</span> data
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

