"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MarketNewsItem } from "../types";

interface MarketNewsFeedProps {
  data?: MarketNewsItem[];
  isLoading?: boolean;
  onLoadMore?: () => void;
}

export function MarketNewsFeed({
  data = [],
  isLoading = false,
  onLoadMore,
}: MarketNewsFeedProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Market News Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No news available</p>
            <p className="text-sm mt-1">News will appear here once loaded</p>
          </div>
        ) : (
          <>
            {data.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
              >
                {item.imageUrl && (
                  <div className="w-16 h-16 rounded-md bg-muted shrink-0 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 line-clamp-2">{item.title}</h3>
                  {item.summary && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.summary}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  )}
                </div>
              </div>
            ))}
            {onLoadMore && (
              <Button
                variant="outline"
                className="w-full"
                onClick={onLoadMore}
              >
                Load More News
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

