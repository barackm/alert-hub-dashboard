import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const parsedDetails = JSON.parse(details);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Alert Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[500px]">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(parsedDetails).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {key.replace(/_/g, " ").toUpperCase()}
                </p>
                <p className="text-sm">{value as string}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
