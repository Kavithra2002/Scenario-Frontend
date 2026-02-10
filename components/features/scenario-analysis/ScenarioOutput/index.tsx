"use client";

import { MetricCard } from "../MetricCard";
import type { ScenarioOutput as ScenarioOutputType } from "../types";
import { formatNumber } from "@/components/features/financial/FinancialTable/utils";

// Sample data when backend is not ready
const SAMPLE_SCENARIO_OUTPUT: ScenarioOutputType = {
  revenue: 48123456,
  netProfit: 9123456,
  eps: 13.82,
  operatingCost: 27890123,
  exchangeRate: 332.2,
  interestExpenses: 2589012,
  sectorGrowth: 9.1,
  targetPrice: 172.5,
};

const SAMPLE_CHANGE_TEXTS: Record<string, string> = {
  revenue: "+6.4% from base scenario",
  netProfit: "+10.8% from base scenario",
  eps: "+11.0% from base scenario",
  operatingCost: "-3.5% from base scenario",
  exchangeRate: "+1.1% from base scenario",
  interestExpenses: "+5.4% from base scenario",
  sectorGrowth: "+11.0% from base scenario",
  targetPrice: "+10.0% from base scenario",
};

interface ScenarioOutputProps {
  data?: ScenarioOutputType;
  isLoading?: boolean;
}

export function ScenarioOutput({ data, isLoading = false }: ScenarioOutputProps) {
  const output = data ?? SAMPLE_SCENARIO_OUTPUT;

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
    { key: "revenue", label: "Revenue", value: formatValue(output.revenue, "currency"), changeText: SAMPLE_CHANGE_TEXTS.revenue },
    { key: "netProfit", label: "Net Profit", value: formatValue(output.netProfit, "currency"), changeText: SAMPLE_CHANGE_TEXTS.netProfit },
    { key: "eps", label: "EPS", value: formatValue(output.eps, "decimal"), changeText: SAMPLE_CHANGE_TEXTS.eps },
    { key: "operatingCost", label: "Operating Cost", value: formatValue(output.operatingCost, "currency"), changeText: SAMPLE_CHANGE_TEXTS.operatingCost },
    { key: "exchangeRate", label: "Exchange Rate", value: formatValue(output.exchangeRate, "decimal"), changeText: SAMPLE_CHANGE_TEXTS.exchangeRate },
    { key: "interestExpenses", label: "Interest Expenses", value: formatValue(output.interestExpenses, "currency"), changeText: SAMPLE_CHANGE_TEXTS.interestExpenses },
    { key: "sectorGrowth", label: "Sector Growth", value: formatValue(output.sectorGrowth, "percent"), changeText: SAMPLE_CHANGE_TEXTS.sectorGrowth },
    { key: "targetPrice", label: "Target Price", value: formatValue(output.targetPrice, "currency"), changeText: SAMPLE_CHANGE_TEXTS.targetPrice },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
        Scenario Output
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(({ key, label, value, changeText }) => (
          <MetricCard
            key={key}
            label={label}
            value={value}
            changeText={changeText}
            showChartIcon={true}
          />
        ))}
      </div>
    </div>
  );
}
