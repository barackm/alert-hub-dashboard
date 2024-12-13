"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/types/alerts";
import { AlertActionsCell } from "./alert-action-cell";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const statusConfig = {
  ACTIVE: {
    variant: "destructive",
    className: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  PENDING: {
    variant: "default",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
  RESOLVED: {
    variant: "secondary",
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
} as const;

export const columns: ColumnDef<Alert>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      const status = row.getValue("status") as keyof typeof statusConfig;
      const config = statusConfig[status];

      return (
        <Badge
          variant={config.variant}
          className={cn("font-medium transition-colors", config.className)}
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
    accessorKey: "village",
    header: "Village",
  },
  {
    accessorKey: "reporter_phone",
    header: "Reporter Phone",
  },
  {
    id: "actions",
    cell: ({ row }) => <AlertActionsCell row={row} />,
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
