import { HealthFacility } from "@/types/health-facilities";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { parseLocation } from "@/utils/location";
import HealthFacilityActionCell from "./health-facility-action-cell";

export const columns: ColumnDef<HealthFacility>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => format(new Date(row.getValue("created_at")), "PPp"),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const locationData = parseLocation(row.getValue("location"));
      return `${locationData.district || "-"} / ${locationData.sector || "-"}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <HealthFacilityActionCell row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
