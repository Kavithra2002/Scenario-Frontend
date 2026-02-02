"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";
import type { ExistingScenario } from "../types";
import { cn } from "@/lib/utils";

interface ScenarioCardProps {
  scenario: ExistingScenario;
  isSelected?: boolean;
  onSelect?: (scenarioId: string) => void;
}

export function ScenarioCard({
  scenario,
  isSelected = false,
  onSelect,
}: ScenarioCardProps) {
  const formatPrice = (price?: number, currency = "LKR") => {
    if (price === undefined || price === null) return "—";
    return `${price.toLocaleString()} ${currency}`;
  };

  return (
    <Card
      className={cn(
        "w-full cursor-pointer transition-all hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect?.(scenario.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{scenario.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Scenario Values */}
        <div className="grid grid-cols-2 gap-3">
          {scenario.values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col rounded-md border bg-muted/50 p-2"
            >
              <span className="text-xs text-muted-foreground">{value.label}</span>
              <div className="flex items-center gap-1 mt-1">
                {value.value < 0 ? (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                ) : (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                )}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    value.value < 0 ? "text-red-600" : "text-green-600"
                  )}
                >
                  {value.value > 0 ? "+" : ""}
                  {value.value}
                  {value.unit && ` ${value.unit}`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Price */}
        {scenario.price !== undefined && (
          <div className="flex items-center justify-between border-t pt-3">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="text-base font-semibold">
              {formatPrice(scenario.price, scenario.currency)}
            </span>
          </div>
        )}

        {/* Status Badge */}
        {scenario.status && (
          <div className="flex items-center gap-2">
            <Badge
              variant={
                scenario.status === "active"
                  ? "default"
                  : scenario.status === "draft"
                  ? "secondary"
                  : "outline"
              }
              className="text-xs"
            >
              {scenario.status}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


