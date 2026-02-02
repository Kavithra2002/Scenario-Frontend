"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilterCategory } from "./types";
import { cn } from "@/lib/utils";

interface FilterBoxProps {
  category: FilterCategory;
  selectedValue: string;
  onSelect: (categoryId: string, value: string) => void;
}

export function FilterBox({
  category,
  selectedValue,
  onSelect,
}: FilterBoxProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2 pt-3 px-3">
        <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {category.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5 px-3 pb-3">
        {category.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <Button
              key={option.value}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(category.id, option.value)}
              className={cn(
                "h-7 text-xs px-2.5",
                isSelected && "bg-primary text-primary-foreground"
              )}
            >
              {option.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}

