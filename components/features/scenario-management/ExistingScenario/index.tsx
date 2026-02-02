"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScenarioCard } from "./ScenarioCard";
import type { ExistingScenario } from "../types";

interface ExistingScenarioProps {
  scenarios?: ExistingScenario[];
  selectedScenario?: string;
  onScenarioSelect?: (scenarioId: string) => void;
  isLoading?: boolean;
}

export function ExistingScenario({
  scenarios = [],
  selectedScenario,
  onScenarioSelect,
  isLoading = false,
}: ExistingScenarioProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Existing Scenario</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading scenarios...</p>
            </div>
          </div>
        ) : scenarios.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">
              No existing scenarios available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                isSelected={selectedScenario === scenario.id}
                onSelect={onScenarioSelect}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


