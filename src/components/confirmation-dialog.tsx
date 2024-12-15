import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogAction, DialogData } from "@/types/confirmation-dialog";
import { useState } from "react";

interface ConfirmationDialogProps<T> extends DialogData<T> {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const defaultConfirmationDialogData: DialogData<unknown> = {
  open: false,
  data: null,
  title: "",
  description: "",
  variant: "default",
  action: DialogAction.CREATE,
};

export function ConfirmationDialog<T>({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  variant = "default",
}: ConfirmationDialogProps<T>) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <Button variant={variant} onClick={handleConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
