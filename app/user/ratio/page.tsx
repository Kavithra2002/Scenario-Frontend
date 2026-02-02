"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import type { Company } from "@/components/features/scenario-management/types";

// Ratio data types - ready for backend integration
export interface RatioCardData {
  title: string;
  yoyValue: string;
  yoyChange: number;
  qoqValue: string;
  qoqChange: number;
}

export interface RatioTableData {
  ratio: string;
  yoyChange?: number; // Year-on-Year Change for Annual tab
  qoqChange?: number; // Quarter-on-Quarter Change for Quarter tab
  annualData?: {
    year: string; // e.g., "2025", "2024", "2023"
    value: string; // e.g., "LKR 7.20"
  }[];
  quarterData?: {
    quarter: string; // e.g., "2025 Quarter 2", "2025 Quarter 1", "2024 Quarter 4"
    value: string; // e.g., "LKR 7.05"
  }[];
}

export default function RatioAnalysis() {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [ratioCards, setRatioCards] = useState<RatioCardData[]>([]);
  const [annualRatios, setAnnualRatios] = useState<RatioTableData[]>([]);
  const [quarterRatios, setQuarterRatios] = useState<RatioTableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"annual" | "quarter">("quarter");

  // Define the four ratio card types
  const ratioCardTypes = [
    { id: "eps", title: "EPS" },
    { id: "pe", title: "P/E" },
    { id: "nav", title: "Net Asset Value" },
    { id: "pb", title: "P/B" },
  ];

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // TODO: Replace with actual API endpoint when backend is ready
        // Example:
        // const companiesResponse = await fetch('/api/user/companies');
        // const companiesData = await companiesResponse.json();
        // setCompanies(companiesData);
        
        // For now, set empty array until backend is ready
        setCompanies([]);
      } catch (err) {
        console.error('Error fetching companies:', err);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch ratio data from backend when company is selected
  useEffect(() => {
    const fetchRatioData = async () => {
      if (!selectedCompany) {
        // Reset ratio data when no company is selected
        setRatioCards([]);
        setAnnualRatios([]);
        setQuarterRatios([]);
        return;
      }

      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API endpoint when backend is ready
        // Example:
        // const ratiosResponse = await fetch(`/api/user/ratios?companyId=${selectedCompany}`);
        // const ratiosData = await ratiosResponse.json();
        // 
        // // Map backend data to ratio cards
        // const cards: RatioCardData[] = [
        //   {
        //     title: "EPS",
        //     yoyValue: ratiosData.eps.yoyValue,
        //     yoyChange: ratiosData.eps.yoyChange,
        //     qoqValue: ratiosData.eps.qoqValue,
        //     qoqChange: ratiosData.eps.qoqChange,
        //   },
        //   {
        //     title: "P/E",
        //     yoyValue: ratiosData.pe.yoyValue,
        //     yoyChange: ratiosData.pe.yoyChange,
        //     qoqValue: ratiosData.pe.qoqValue,
        //     qoqChange: ratiosData.pe.qoqChange,
        //   },
        //   {
        //     title: "Net Asset Value",
        //     yoyValue: ratiosData.nav.yoyValue,
        //     yoyChange: ratiosData.nav.yoyChange,
        //     qoqValue: ratiosData.nav.qoqValue,
        //     qoqChange: ratiosData.nav.qoqChange,
        //   },
        //   {
        //     title: "P/B",
        //     yoyValue: ratiosData.pb.yoyValue,
        //     yoyChange: ratiosData.pb.yoyChange,
        //     qoqValue: ratiosData.pb.qoqValue,
        //     qoqChange: ratiosData.pb.qoqChange,
        //   },
        // ];
        // setRatioCards(cards);
        // 
        // // Map annual ratios data
        // // Expected format: [{ ratio: "P/E", yoyChange: 3.6, annualData: [{ year: "2025", value: "LKR 7.20" }, { year: "2024", value: "LKR 6.95" }, { year: "2023", value: "LKR 6.65" }] }]
        // setAnnualRatios(ratiosData.annual);
        // 
        // // Map quarter ratios data
        // // Expected format: [{ ratio: "P/E", qoqChange: 1.4, quarterData: [{ quarter: "2025 Quarter 2", value: "LKR 7.05" }, { quarter: "2025 Quarter 1", value: "LKR 6.95" }, { quarter: "2024 Quarter 4", value: "LKR 6.65" }] }]
        // setQuarterRatios(ratiosData.quarter);
        
        // For now, set empty arrays until backend is ready
        setRatioCards([]);
        setAnnualRatios([]);
        setQuarterRatios([]);
      } catch (err) {
        console.error('Error fetching ratio data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatioData();
  }, [selectedCompany]);

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompany(companyId);
    // Data will be refetched via useEffect
  };

  const handleBack = () => {
    router.push("/user/report-management");
  };

  // Format percentage with color
  const formatPercentage = (value: number) => {
    const isPositive = value >= 0;
    return (
      <span className={isPositive ? "text-green-600" : "text-red-600"}>
        {isPositive ? "+" : ""}
        {value.toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Ratio Analysis
            </h1>
          </div>

          {/* Company Selection */}
          <Card>
            <CardHeader className="pb-3 pt-4 px-4">
              <CardTitle className="text-xs font-semibold">
                Select Company
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <Select
                value={selectedCompany}
                onValueChange={handleCompanyChange}
                disabled={isLoading || companies.length === 0}
              >
                <SelectTrigger className="w-full sm:w-80 h-9">
                  <SelectValue
                    placeholder={
                      isLoading
                        ? "Loading companies..."
                        : companies.length === 0
                        ? "No companies available"
                        : "Select Company"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.symbol
                        ? `${company.symbol} - ${company.name}`
                        : company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Key Ratio Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ratioCardTypes.map((cardType) => {
              // Find matching card data from backend
              const cardData = ratioCards.find(
                (card) => card.title === cardType.title
              );

              return (
                <Card key={cardType.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">
                      {cardType.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Year-on-Year
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {cardData
                            ? `Last Updated: ${cardData.yoyValue}`
                            : "Last Updated: —"}
                        </p>
                        {cardData && formatPercentage(cardData.yoyChange)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Quarter-on-Quarter
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {cardData
                            ? `Last Updated: ${cardData.qoqValue}`
                            : "Last Updated: —"}
                        </p>
                        {cardData && formatPercentage(cardData.qoqChange)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Ratios Table */}
          <Card>
            <CardContent className="pt-4">
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as "annual" | "quarter")
                }
                className="w-full"
              >
                <div className="flex items-start">
                  <TabsList className="inline-flex h-9 w-auto">
                    <TabsTrigger value="annual" className="text-xs px-3">
                      Annual Ratios
                    </TabsTrigger>
                    <TabsTrigger value="quarter" className="text-xs px-3">
                      Quarter Ratios
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Annual Ratios Tab */}
                <TabsContent value="annual" className="mt-3">
                  <div className="rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Ratios</TableHead>
                          <TableHead className="font-semibold">
                            Year-on-Year Change(%)
                          </TableHead>
                          {/* Dynamic year columns - will be populated from backend */}
                          {annualRatios.length > 0 && annualRatios[0]?.annualData ? (
                            annualRatios[0].annualData.map((data, idx) => (
                              <TableHead key={idx} className="font-semibold">
                                {data.year}
                              </TableHead>
                            ))
                          ) : (
                            <>
                              {/* Placeholder columns - will be replaced when backend provides data */}
                              <TableHead className="font-semibold">2025</TableHead>
                              <TableHead className="font-semibold">2024</TableHead>
                              <TableHead className="font-semibold">2023</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {annualRatios.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="h-24 text-center"
                            >
                              <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  No financial data available
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Data will appear here once loaded
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          annualRatios.map((row, index) => (
                            <TableRow key={row.ratio || index}>
                              <TableCell className="font-medium">
                                {row.ratio}
                              </TableCell>
                              <TableCell>
                                {row.yoyChange !== undefined
                                  ? formatPercentage(row.yoyChange)
                                  : "—"}
                              </TableCell>
                              {row.annualData?.map((data, idx) => (
                                <TableCell key={idx}>{data.value}</TableCell>
                              ))}
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* Quarter Ratios Tab */}
                <TabsContent value="quarter" className="mt-3">
                  <div className="rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">Ratios</TableHead>
                          <TableHead className="font-semibold">
                            Quarter-on-Quarter Change(%)
                          </TableHead>
                          {/* Dynamic quarter columns - will be populated from backend */}
                          {quarterRatios.length > 0 && quarterRatios[0]?.quarterData ? (
                            quarterRatios[0].quarterData.map((data, idx) => (
                              <TableHead key={idx} className="font-semibold">
                                {data.quarter}
                              </TableHead>
                            ))
                          ) : (
                            <>
                              {/* Placeholder columns - will be replaced when backend provides data */}
                              <TableHead className="font-semibold">2025 Quarter 2</TableHead>
                              <TableHead className="font-semibold">2025 Quarter 1</TableHead>
                              <TableHead className="font-semibold">2024 Quarter 4</TableHead>
                            </>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quarterRatios.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="h-24 text-center"
                            >
                              <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  No financial data available
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Data will appear here once loaded
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          quarterRatios.map((row, index) => (
                            <TableRow key={row.ratio || index}>
                              <TableCell className="font-medium">
                                {row.ratio}
                              </TableCell>
                              <TableCell>
                                {row.qoqChange !== undefined
                                  ? formatPercentage(row.qoqChange)
                                  : "—"}
                              </TableCell>
                              {row.quarterData?.map((data, idx) => (
                                <TableCell key={idx}>{data.value}</TableCell>
                              ))}
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
