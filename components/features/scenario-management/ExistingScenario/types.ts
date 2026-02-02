// Types for Existing Scenario component

import type { ExistingScenario } from "../types";

export interface ExistingScenarioProps {
  scenarios?: ExistingScenario[];
  selectedScenario?: string;
  onScenarioSelect?: (scenarioId: string) => void;
  isLoading?: boolean;
}


