"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    if (pathname?.includes("/financial-data")) return "financial-data";
    if (pathname?.includes("/non-financial-data")) return "non-financial-data";
    return "today-market"; // default
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
          <Tabs value={getActiveTab()}>
            <TabsList>
              <TabsTrigger value="today-market" asChild>
                <Link href="/user/market/today-market">Today Market</Link>
              </TabsTrigger>
              <TabsTrigger value="financial-data" asChild>
                <Link href="/user/market/financial-data">Financial Data</Link>
              </TabsTrigger>
              <TabsTrigger value="non-financial-data" asChild>
                <Link href="/user/market/non-financial-data">Non Financial Data</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

