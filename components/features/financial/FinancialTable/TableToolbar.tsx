"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TableToolbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  resultCount?: number;
}

export function TableToolbar({
  searchValue = "",
  onSearchChange,
  resultCount,
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2 flex-1 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stocks..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {resultCount !== undefined && (
          <span className="text-sm text-muted-foreground">
            Symbol {resultCount}
          </span>
        )}
      </div>
    </div>
  );
}

