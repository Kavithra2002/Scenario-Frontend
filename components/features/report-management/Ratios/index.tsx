"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import type { RatioData } from "../types";
import type { Company } from "@/components/features/scenario-management/types";

interface RatiosProps {
  data?: RatioData[];
  companies?: Company[];
  selectedCompany?: string;
  onCompanyChange?: (companyId: string) => void;
  isLoading?: boolean;
}

export function Ratios({
  data = [],
  companies = [],
  selectedCompany,
  onCompanyChange,
  isLoading = false,
}: RatiosProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Ratios</CardTitle>
          <Link
            href="/user/ratio"
            className="text-sm text-primary hover:underline"
          >
            See all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company Selection */}
        <Select
          value={selectedCompany}
          onValueChange={onCompanyChange}
          disabled={isLoading || companies.length === 0}
        >
          <SelectTrigger className="w-full">
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
                {company.symbol ? `${company.symbol} - ${company.name}` : company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Table */}
        <div className="rounded-md max-h-[500px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ratio</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Change (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">Loading data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        No ratio data available
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Data will appear here once loaded
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={row.ratio || index}>
                    <TableCell className="font-medium">{row.ratio}</TableCell>
                    <TableCell>{row.value.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          row.changePercent >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {row.changePercent >= 0 ? "+" : ""}
                        {row.changePercent.toFixed(1)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

