"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReportDesigner } from "@/components/features/report-designer";

export default function CreateReport() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/admin/task-management");
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-shrink-0 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
              Create New Report
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <ReportDesigner mode="create" />
        </div>
      </main>
    </div>
  );
}
