import { FilterCategory } from "./types";

export const filterCategories: FilterCategory[] = [
  {
    id: "marketPerformance",
    title: "Market Performance",
    options: [
      { value: "allStocks", label: "All stocks" },
      { value: "topGainers", label: "Top gainers" },
      { value: "biggestLosers", label: "Biggest losers" },
      { value: "bestPerforming", label: "Best performing" },
      { value: "mostActive", label: "Most active" },
      { value: "mostVolatile", label: "Most volatile" },
    ],
  },
  {
    id: "marketCap",
    title: "Market Cap",
    options: [
      { value: "largeCap", label: "Large-cap" },
      { value: "smallCap", label: "Small-cap" },
    ],
  },
  {
    id: "financialMetrics",
    title: "Financial Metrics",
    options: [
      { value: "highestRevenue", label: "Highest revenue" },
      { value: "highestNetIncome", label: "Highest net income" },
      { value: "highestCash", label: "Highest cash" },
      { value: "highestProfitPerEmployee", label: "Highest profit per employee" },
      { value: "highestRevenuePerEmployee", label: "Highest revenue per employee" },
    ],
  },
  {
    id: "trading",
    title: "Trading",
    options: [
      { value: "unusualVolume", label: "Unusual volume" },
      { value: "highBeta", label: "High beta" },
      { value: "overbought", label: "Overbought" },
      { value: "oversold", label: "Oversold" },
    ],
  },
  {
    id: "priceLevels",
    title: "Price Levels",
    options: [
      { value: "mostExpensive", label: "Most expensive" },
      { value: "pennyStocks", label: "Penny stocks" },
      { value: "allTimeHigh", label: "All-time high" },
      { value: "allTimeLow", label: "All-time low" },
      { value: "52WeekHigh", label: "52-week high" },
      { value: "52WeekLow", label: "52-week low" },
    ],
  },
  {
    id: "other",
    title: "Other",
    options: [
      { value: "largestEmployers", label: "Largest employers" },
      { value: "highDividend", label: "High-dividend" },
    ],
  },
];

