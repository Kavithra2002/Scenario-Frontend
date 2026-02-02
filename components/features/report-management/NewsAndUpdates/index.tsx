"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import type { NewsItem } from "../types";

interface NewsAndUpdatesProps {
  data?: NewsItem[];
  isLoading?: boolean;
}

export function NewsAndUpdates({ data = [], isLoading = false }: NewsAndUpdatesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from news items
  const categories = Array.from(
    new Set(data.map((item) => item.category).filter(Boolean))
  ) as string[];

  // Filter data based on search query and category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">News and Updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  setSelectedCategory(selectedCategory === category ? null : category)
                }
              >
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* News List */}
        <div className="space-y-4 max-h-[500px] overflow-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading news...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <p className="text-sm font-medium text-muted-foreground">
                No news available
              </p>
              <p className="text-xs text-muted-foreground">
                News will appear here once loaded
              </p>
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-md bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  {item.category && (
                    <Badge variant="outline" className="shrink-0">
                      {item.category}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

