"use client";

import { MetricCard } from "../MetricCard";
import type { CompanyDetails as CompanyDetailsType } from "../types";
import { formatNumber } from "@/components/features/financial/FinancialTable/utils";

// Sample data when backend is not ready
const SAMPLE_COMPANY_DETAILS: CompanyDetailsType = {
  revenue: 45231890,
  netProfit: 8234567,
  eps: 12.45,
  operatingCost: 28901234,
  exchangeRate: 328.5,
  interestExpenses: 2456789,
  sectorGrowth: 8.2,
  targetPrice: 156.75,
};

const SAMPLE_CHANGE_TEXTS: Record<string, string> = {
  revenue: "+20.1% from last month",
  netProfit: "+15.3% from last quarter",
  eps: "+8.2% from last year",
  operatingCost: "-2.4% from last month",
  exchangeRate: "+1.2% from last week",
  interestExpenses: "+5.1% from last quarter",
  sectorGrowth: "+3.2% from last year",
  targetPrice: "+12.8% from last month",
};

interface CompanyDetailsProps {
  data?: CompanyDetailsType;
  isLoading?: boolean;
}

export function CompanyDetails({ data, isLoading = false }: CompanyDetailsProps) {
  const details = data ?? SAMPLE_COMPANY_DETAILS;

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

  const metrics = [
    { key: "revenue", label: "Revenue", value: formatValue(details.revenue, "currency"), changeText: SAMPLE_CHANGE_TEXTS.revenue },
    { key: "netProfit", label: "Net Profit", value: formatValue(details.netProfit, "currency"), changeText: SAMPLE_CHANGE_TEXTS.netProfit },
    { key: "eps", label: "EPS", value: formatValue(details.eps, "decimal"), changeText: SAMPLE_CHANGE_TEXTS.eps },
    { key: "operatingCost", label: "Operating Cost", value: formatValue(details.operatingCost, "currency"), changeText: SAMPLE_CHANGE_TEXTS.operatingCost },
    { key: "exchangeRate", label: "Exchange Rate", value: formatValue(details.exchangeRate, "decimal"), changeText: SAMPLE_CHANGE_TEXTS.exchangeRate },
    { key: "interestExpenses", label: "Interest Expenses", value: formatValue(details.interestExpenses, "currency"), changeText: SAMPLE_CHANGE_TEXTS.interestExpenses },
    { key: "sectorGrowth", label: "Sector Growth", value: formatValue(details.sectorGrowth, "percent"), changeText: SAMPLE_CHANGE_TEXTS.sectorGrowth },
    { key: "targetPrice", label: "Target Price", value: formatValue(details.targetPrice, "currency"), changeText: SAMPLE_CHANGE_TEXTS.targetPrice },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
        Company Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ key, label, value, changeText }) => (
          <MetricCard
            key={key}
            label={label}
            value={value}
            changeText={changeText}
          />
        ))}
      </div>
    </div>
  );
}
