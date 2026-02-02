"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ESGCompanyData } from "./types";

interface ESGCompanyListProps {
  data?: ESGCompanyData[];
  isLoading?: boolean;
}

export function ESGCompanyList({ data = [], isLoading = false }: ESGCompanyListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Company List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company List</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No company data available</p>
            <p className="text-sm mt-1">Data will appear here once loaded</p>
          </div>
        ) : (
          <div className="rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>ESG Score</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Sustainability</TableHead>
                  <TableHead>Diversity</TableHead>
                  <TableHead>Community Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((company, idx) => (
                  <TableRow key={company.symbol || idx}>
                    <TableCell className="font-medium">{company.company}</TableCell>
                    <TableCell>{company.symbol}</TableCell>
                    <TableCell>{company.esgScore.toFixed(1)}</TableCell>
                    <TableCell>{company.employees.toLocaleString()}</TableCell>
                    <TableCell>{company.sustainability}</TableCell>
                    <TableCell>{company.diversity.toFixed(1)}%</TableCell>
                    <TableCell>{company.communityImpact.toFixed(1)}/10</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

