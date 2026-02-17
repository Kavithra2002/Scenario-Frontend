"use client";


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
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Select Company
        </h3>
      </div>
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
        <p className="text-[0.8rem] text-muted-foreground">
          Selected: {companies.find((c) => c.id === selectedCompany)?.name || selectedCompany}
        </p>
      )}
    </div>
  );
}


