"use client";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { AlertDetailsDialog } from "./alert-details-dialog";
import { Alert } from "@/types/alerts";

interface AlertActionsCellProps {
  row: Row<Alert>;
}

export function AlertActionsCell({ row }: AlertActionsCellProps) {
  const [showDetails, setShowDetails] = useState(false);

  const actions = [
    {
      label: "View Details",
      onClick: () => setShowDetails(true),
    },
    {
      label: "Edit Alert",
      onClick: (alert: Alert) => console.log("Edit", alert),
    },
    {
      label: "Delete Alert",
      onClick: (alert: Alert) => console.log("Delete", alert),
      shortcut: "⌘⌫",
      separator: true,
    },
  ];

  return (
    <>
      <DataTableRowActions row={row} actions={actions} />
      <AlertDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        details={row.original.details}
      />
    </>
  );
}
