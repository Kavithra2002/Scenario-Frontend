// Types for Select Company component

import type { Company } from "../types";

export interface SelectCompanyProps {
  selectedCompany?: string;
  onCompanyChange?: (companyId: string) => void;
  companies?: Company[];
  isLoading?: boolean;
}

