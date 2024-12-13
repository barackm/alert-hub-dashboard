import { User, UserStatus } from "@/types/users";
import { ColumnDef } from "@tanstack/react-table";
import UserActionsCell from "./user-action-cell";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  UserStatus,
  {
    variant: "destructive" | "default" | "secondary" | "outline";
    className: string;
  }
> = {
  [UserStatus.INACTIVE]: {
    variant: "destructive",
    className: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  [UserStatus.ACTIVE]: {
    variant: "default",
    className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  },
  [UserStatus.PENDING]: {
    variant: "secondary",
    className: "bg-green-100 text-green-800 hover:bg-green-200",
  },
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status as UserStatus];
      return (
        <Badge
          variant={config.variant}
          className={cn("px-2", config.className)}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <UserActionsCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
