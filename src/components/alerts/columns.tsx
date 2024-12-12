"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Alert } from "@/types/alerts";
import { AlertDetailsDialog } from "./alert-details-dialog";
import { useState } from "react";

export const columns: ColumnDef<Alert>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      return format(new Date(row.getValue("created_at")), "PPp");
    },
  },
  {
    accessorKey: "incident_type",
    header: "Incident Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "ACTIVE"
              ? "destructive"
              : status === "PENDING"
              ? "default"
              : "secondary"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "province",
    header: "Province",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "sector",
    header: "Sector",
  },
  {
    accessorKey: "cell",
    header: "Cell",
  },
  {
    accessorKey: "village",
    header: "Village",
  },
  {
    accessorKey: "reporter_phone",
    header: "Reporter Phone",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [showDetails, setShowDetails] = useState(false);

      const actions = [
        {
          label: "View Details",
          onClick: () => setShowDetails(true),
        },
        // ...existing actions...
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
    },
  },
];

export const sampleData: Alert[] = [
  {
    id: 7,
    created_at: "2024-11-24 21:49:13.041041+00",
    incident_type: "Human Disease",
    province: "Kigali",
    district: "Gasabo",
    sector: "Bumbogo",
    cell: "Kinyaga",
    village: "Akakaza",
    identifier: "494864",
    affected_count: "1-5 Individuals",
    details: JSON.stringify({
      age: "FreeText",
      duration: "FreeText",
      affected_count: "1-5 Individuals",
    }),
    status: "PENDING",
    reporter_phone: "0780083122",
    updated_at: "2024-11-24 21:49:13.041041",
  },
  {
    id: 8,
    created_at: "2024-11-24 21:50:18.748217+00",
    incident_type: "Human Disease",
    province: "Kigali",
    district: "Gasabo",
    sector: "Bumbogo",
    cell: "Kinyaga",
    village: "Akakaza",
    identifier: "973336",
    affected_count: "1-5 Individuals",
    details: JSON.stringify({
      age: "FreeText",
      duration: "FreeText",
      affected_count: "1-5 Individuals",
    }),
    status: "PENDING",
    reporter_phone: "0780083122",
    updated_at: "2024-11-24 21:50:18.748217",
  },
  // Continue pattern for remaining rows...
  {
    id: 22,
    created_at: "2024-11-27 20:20:56.137877+00",
    incident_type: "Human Disease",
    province: "Kigali",
    district: "Gasabo",
    sector: "Gikomero",
    cell: "Gicaca",
    village: "Ntaganzwa",
    identifier: "318258",
    affected_count: "1-5 Individuals",
    details: JSON.stringify({
      age: "56",
      gender: "Male",
      duration: "4 days",
      affected_count: "1-5 Individuals",
    }),
    status: "PENDING",
    reporter_phone: "+250 780 083 122",
    updated_at: "2024-11-27 20:20:56.137877",
  },
];
