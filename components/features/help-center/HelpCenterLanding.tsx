"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ClipboardList,
  MessageSquare,
  Plus,
  Search,
  Star,
} from "lucide-react";

type HelpCenterSection = {
  title: string;
  Icon: LucideIcon;
  iconBadgeClassName: string;
  options: { label: string }[];
};

const HELP_CENTER_SECTIONS: HelpCenterSection[] = [
  {
    title: "Getting Started",
    Icon: Plus,
    iconBadgeClassName: "bg-blue-600 text-white",
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }, { label: "Option 4" }],
  },
  {
    title: "Report Management",
    Icon: ClipboardList,
    iconBadgeClassName: "bg-emerald-600 text-white",
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }, { label: "Option 4" }],
  },
  {
    title: "Communication & Collaboration",
    Icon: MessageSquare,
    iconBadgeClassName: "bg-indigo-600 text-white",
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }, { label: "Option 4" }],
  },
  {
    title: "Tips & Best Practices",
    Icon: Star,
    iconBadgeClassName: "bg-yellow-500 text-white",
    options: [{ label: "Option 1" }, { label: "Option 2" }, { label: "Option 3" }, { label: "Option 4" }],
  },
];

export default function HelpCenterLanding() {
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HELP_CENTER_SECTIONS;

    return HELP_CENTER_SECTIONS.map((section) => {
      const sectionMatches = section.title.toLowerCase().includes(q);
      const filteredOptions = section.options.filter((o) =>
        o.label.toLowerCase().includes(q)
      );

      if (sectionMatches) return section;
      if (filteredOptions.length === 0) return null;

      return { ...section, options: filteredOptions };
    }).filter(Boolean) as HelpCenterSection[];
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Help Center
            </h1>

            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <Input
                type="text"
                placeholder="How can we help?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-12 rounded-xl border-zinc-200 bg-white pl-12 text-base text-zinc-900 placeholder:text-zinc-400 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          </div>

          {filteredSections.length === 0 ? (
            <div className="mt-10">
              <Card className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      No results found
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Try a different keyword.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredSections.map((section) => (
                <Card
                  key={section.title}
                  className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${section.iconBadgeClassName}`}
                    >
                      <section.Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {section.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-col gap-1">
                      {section.options.map((option) => (
                        <Button
                          key={`${section.title}-${option.label}`}
                          type="button"
                          variant="link"
                          className="group h-auto w-full justify-between px-0 py-2 text-left text-sm font-normal text-zinc-700 no-underline hover:no-underline dark:text-zinc-300"
                        >
                          <span className="flex w-full items-center justify-between gap-3">
                            <span>{option.label}</span>
                            <ArrowRight className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
                          </span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

