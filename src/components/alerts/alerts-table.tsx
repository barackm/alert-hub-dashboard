"use client";
import { DataTable, DataTableConfig } from "@/components/table/data-table";
import { columns } from "./columns";
import useSWR from "swr";
import { getAlerts } from "./actions";
import { Alert } from "@/types/alerts";

export default function AlertsTable() {
  const { data = [], isLoading } = useSWR<Alert[]>("/alerts", () =>
    getAlerts()
  );
  const alerts = data || [];

  const config: DataTableConfig = {
    enableRowSelection: true,
    enableSorting: true,
    enableFiltering: true,
    searchColumn: "id",
    searchPlaceholder: "Search alerts...",
    facetedFilters: [
      {
        column: "status",
        title: "Status",
        options: [
          { label: "Active", value: "active" },
          { label: "Pending", value: "pending" },
          { label: "Resolved", value: "resolved" },
        ],
      },
      {
        column: "incident_type",
        title: "Incident Type",
        options: [
          { label: "Fire", value: "fire" },
          { label: "Flood", value: "flood" },
          { label: "Earthquake", value: "earthquake" },
        ],
      },
    ],
    showToolbar: true,
    isLoading: isLoading,
  };

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={alerts} config={config} />
    </div>
  );
}
