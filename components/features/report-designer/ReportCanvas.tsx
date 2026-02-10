"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { ReportBlockItem } from "./types";
import { ReportBlock } from "./ReportBlock";
import { computeRows } from "./rowLayout";
import { cn } from "@/lib/utils";

interface ReportCanvasProps {
  blocks: ReportBlockItem[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
}

export function ReportCanvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
}: ReportCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "report-canvas",
  });

  const rows = computeRows(blocks);

  return (
    <div className="flex flex-1 flex-col overflow-auto bg-zinc-100/50 dark:bg-zinc-900/30">
      <div className="mx-auto w-full max-w-2xl flex-1 p-6">
        <div
          ref={setNodeRef}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("[data-sortable]")) return;
            onSelectBlock(null);
          }}
          className={cn(
            "min-h-[420px] rounded-xl border-2 border-dashed p-6 transition",
            isOver
              ? "border-blue-400 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/30"
              : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/50"
          )}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-3">
              {blocks.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-500 dark:text-zinc-400">
                  <p className="text-sm font-medium">Drop blocks here</p>
                  <p className="mt-1 text-xs">
                    Drag blocks from the left panel to build your report
                  </p>
                </div>
              )}
              {rows.map((row, rowIndex) => (
                <div
                  key={row.map((b) => b.id).join("-")}
                  className="flex w-full flex-row items-stretch gap-2"
                >
                  {row.map((block) => (
                    <div
                      key={block.id}
                      data-sortable
                      className="min-w-0 flex-shrink-0"
                      style={{
                        // When block is alone in row, wrapper is full width so block's width % is relative to full row
                        width: row.length === 1 ? "100%" : (block.props.width ?? "100%"),
                      }}
                    >
                      <ReportBlock
                        block={block}
                        isSelected={selectedBlockId === block.id}
                        onSelect={() => onSelectBlock(block.id)}
                        isAloneInRow={row.length === 1}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  );
}
