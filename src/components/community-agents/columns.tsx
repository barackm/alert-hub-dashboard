import { CommunityAgent, CommunityAgentStatus } from "@/types/community-agents";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import CommunityAgentActionCell from "./community-agent-action-cell";
import { parseLocation } from "@/utils/location";

const statusConfig: Record<
  CommunityAgentStatus,
  {
    variant: "destructive" | "default" | "secondary" | "outline";
    className: string;
  }
> = {
  [CommunityAgentStatus.INACTIVE]: {
    variant: "destructive",
    className: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  [CommunityAgentStatus.ACTIVE]: {
    variant: "default",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
};

export const columns: ColumnDef<CommunityAgent>[] = [
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
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "Village",
    header: "District / village",
    cell: ({ row }) => {
      const locationData = parseLocation(row.original.location);
      return `${locationData.district || "-"} / ${locationData.village || "-"}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status =
        (row.getValue("status") as keyof typeof statusConfig) ||
        CommunityAgentStatus.INACTIVE;
      const config = statusConfig[status] || statusConfig.INACTIVE;

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CommunityAgentActionCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
