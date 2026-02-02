"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import type { Company } from "../types";

interface SelectCompanyProps {
  selectedCompany?: string;
  onCompanyChange?: (companyId: string) => void;
  companies?: Company[];
  isLoading?: boolean;
}

export function SelectCompany({
  selectedCompany,
  onCompanyChange,
  companies = [],
  isLoading = false,
}: SelectCompanyProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Building2 className="h-5 w-5" />
          Select Company
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                  : "Select a company"
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
        {selectedCompany && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected: {companies.find((c) => c.id === selectedCompany)?.name || selectedCompany}
          </p>
        )}
      </CardContent>
    </Card>
  );
}


