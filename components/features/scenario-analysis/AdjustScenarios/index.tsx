"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface AdjustScenariosProps {
  scenarios?: Array<{
    id: string;
    name: string;
  }>;
  isLoading?: boolean;
}

export function AdjustScenarios({ scenarios = [], isLoading = false }: AdjustScenariosProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
        Adjust Scenarios
      </h2>
      <Card>
        <CardContent className="p-6">
          {scenarios.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Settings className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No scenarios available. Add scenarios from Scenario Management page.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <span className="font-medium">{scenario.name}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

