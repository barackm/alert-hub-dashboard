"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Record<string, any>;
  title?: string;
}

export function DetailsDialog({
  open,
  onOpenChange,
  data,
  title = "Details",
}: DetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[500px]">
          <div className="grid grid-cols-2 gap-4 pb-6">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {key.replace(/_/g, " ").toUpperCase()}
                </p>
                <p className="text-sm">{String(value)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
