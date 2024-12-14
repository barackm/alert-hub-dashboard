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
      const config = statusConfig[status] || statusConfig.PENDING;

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
