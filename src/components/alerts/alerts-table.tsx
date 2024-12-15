"use client";
import { DataTable, DataTableConfig } from "@/components/table/data-table";
import { columns } from "./columns";
import useSWR from "swr";
import { getAlerts } from "./actions";
import { Alert } from "@/types/alerts";
import { useSearchParams } from "next/navigation";
import { FetchResponse } from "@/types/fetch";

export default function AlertsTable() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const url = `/alerts?page=${page}&limit=${limit}`;
  const { data, isLoading } = useSWR<FetchResponse<Alert>>(url, () =>
    getAlerts({ page: Number(page), limit: Number(limit) })
  );

  const { data: alerts, total = 0 } = data || { data: [] };

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
    total,
  };

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={alerts} config={config} />
    </div>
  );
}
