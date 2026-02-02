"use client";

import { MetricCard } from "../MetricCard";
import type { CompanyDetails as CompanyDetailsType } from "../types";
import { formatNumber } from "@/components/features/financial/FinancialTable/utils";

interface CompanyDetailsProps {
  data?: CompanyDetailsType;
  isLoading?: boolean;
}

export function CompanyDetails({ data, isLoading = false }: CompanyDetailsProps) {
  // Format values for display
  const formatValue = (value: number | undefined, type: "currency" | "number" | "percent" | "decimal") => {
    if (value === undefined || value === null) return undefined;
    
    switch (type) {
      case "currency":
        return `LKR ${formatNumber(value)}`;
      case "number":
        return formatNumber(value);
      case "percent":
        return `${value.toFixed(1)}%`;
      case "decimal":
        return value.toFixed(2);
      default:
        return String(value);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
        Company Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* First Row */}
        <MetricCard
          label="Revenue"
          value={formatValue(data?.revenue, "currency")}
        />
        <MetricCard
          label="Net Profit"
          value={formatValue(data?.netProfit, "currency")}
        />
        <MetricCard
          label="EPS"
          value={formatValue(data?.eps, "decimal")}
        />
        <MetricCard
          label="Operating Cost"
          value={formatValue(data?.operatingCost, "currency")}
        />
        
        {/* Second Row */}
        <MetricCard
          label="Exchange Rate"
          value={formatValue(data?.exchangeRate, "decimal")}
        />
        <MetricCard
          label="Interest Expenses"
          value={formatValue(data?.interestExpenses, "currency")}
        />
        <MetricCard
          label="Sector Growth"
          value={formatValue(data?.sectorGrowth, "percent")}
        />
        <MetricCard
          label="Target Price"
          value={formatValue(data?.targetPrice, "currency")}
        />
      </div>
    </div>
  );
}

