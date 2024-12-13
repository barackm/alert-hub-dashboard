import { DataTable, DataTableConfig } from "@/components/table/data-table";
import { columns, sampleData } from "./columns";

export default function AlertsTable() {
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
  };

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={sampleData} config={config} />
    </div>
  );
}
