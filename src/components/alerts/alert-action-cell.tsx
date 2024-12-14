"use client";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Alert } from "@/types/alerts";
import { DetailsDialog } from "../details-dialog";
import { safeJsonParse } from "@/utils/json-parser";

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

  const data = safeJsonParse(row.original.details) || {};
  return (
    <>
      <DataTableRowActions row={row} actions={actions} />
      <DetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        data={data}
      />
    </>
  );
}
