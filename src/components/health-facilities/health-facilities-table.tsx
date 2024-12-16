"use client";
import React, { useEffect } from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { HealthFacility } from "@/types/health-facilities";
import { HealthFacilityDialog } from "./health-facility-dialog";
import useSWR from "swr";
import { fetchHealthFacilities } from "./actions";
import { useHealthFacilities } from "@/hooks/use-health-facilities";
import { isEqual } from "lodash";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { FetchResponse } from "@/types/fetch";
import { useSearchParams } from "next/navigation";

const HealthFacilitiesTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const url = `/health-facilities?page=${page}&limit=${limit}`;

  const { data, isLoading } = useSWR<FetchResponse<HealthFacility>>(url, () =>
    fetchHealthFacilities({
      page: Number(page),
      limit: Number(limit),
    })
  );

  const setFetchUrl = useHealthFacilities((state) => state.setFetchUrl);
  const openDialog = useHealthFacilities((state) => state.openDialog);
  const fetchUrl = useHealthFacilities((state) => state.fetchUrl);
  const { total = 0, data: healthFacilities } = data || { data: [] };

  useEffect(() => {
    if (url && !isEqual(fetchUrl, url)) {
      setFetchUrl(url);
    }
  }, [url, fetchUrl, setFetchUrl]);

  const config: DataTableConfig = {
    enableRowSelection: true,
    enableSorting: true,
    enableFiltering: true,
    searchColumn: "name",
    searchPlaceholder: "Search by name or phone...",
    showToolbar: true,
    isLoading,
    renderAdditionalActions: () => (
      <>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={() => openDialog()}
        >
          <PlusIcon />
          New Health Facility
        </Button>
      </>
    ),
    total,
  };

  return (
    <div className="container mx-auto">
      <HealthFacilityDialog />
      <DataTable columns={columns} data={healthFacilities} config={config} />
    </div>
  );
};

export default HealthFacilitiesTable;
