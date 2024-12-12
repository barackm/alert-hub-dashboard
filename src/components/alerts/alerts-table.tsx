import { DataTable, DataTableConfig } from "@/components/table/data-table";
import { columns, sampleData } from "./columns";
import { Alert } from "@/types/alerts";

export default function AlertsTable() {
  const config: DataTableConfig<Alert> = {
    enableRowSelection: true,
    enableSorting: true,
    enableFiltering: true,
    searchColumn: "id",
    searchPlaceholder: "Search alerts...",
    // facetedFilters: [
    //   {
    //     column: "status",
    //     title: "Status",
    //     options: [
    //       { label: "Active", value: "active" },
    //       { label: "Pending", value: "pending" },
    //       { label: "Resolved", value: "resolved" },
    //     ],
    //   },
    // ],
    showToolbar: true,
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={sampleData} config={config} />
    </div>
  );
}
