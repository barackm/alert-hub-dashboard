"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface AlertDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: string;
}

export function AlertDetailsDialog({
  open,
  onOpenChange,
  details,
}: AlertDetailsProps) {
  const [parsedDetails, setParsedDetails] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof details === "object" && details !== null) {
        setParsedDetails(details);
      } else if (typeof details === "string") {
        setParsedDetails(JSON.parse(details));
      } else {
        throw new Error("Invalid data type");
      }
      setError(null);
    } catch (err) {
      setError("Invalid data format");
      console.error("Parse error:", err);
      setParsedDetails({});
    }
  }, [details]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Alert Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[500px]">
          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(parsedDetails).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {key.replace(/_/g, " ").toUpperCase()}
                  </p>
                  <p className="text-sm">{String(value)}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
