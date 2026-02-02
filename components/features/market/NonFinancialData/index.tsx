"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NonFinancialDataProps {
  data?: any;
  isLoading?: boolean;
}

export function NonFinancialData({ data, isLoading = false }: NonFinancialDataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Non Financial Data</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Non-financial data will be displayed here</p>
            <p className="text-sm mt-1">Data will appear here once loaded</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

