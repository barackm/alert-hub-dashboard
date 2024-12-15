"use client";
import React, { useEffect } from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { CommunityAgent, CommunityAgentStatus } from "@/types/community-agents";
import { CommunityAgentDialog } from "./community-agent-dialog";

import useSWR from "swr";
import { fetchCommunityAgents } from "./actions";
import { useCommunityAgents } from "@/hooks/use-community-agents";
import { isEqual } from "lodash";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { FetchResponse } from "@/types/fetch";
import { useSearchParams } from "next/navigation";

const CommunityAgentsTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const url = `/community-agents?page=${page}&limit=${limit}`;

  const { data, isLoading } = useSWR<FetchResponse<CommunityAgent>>(url, () =>
    fetchCommunityAgents({
      page: Number(page),
      limit: Number(limit),
    })
  );
  const setFetchUrl = useCommunityAgents((state) => state.setFetchUrl);
  const openDialog = useCommunityAgents((state) => state.openDialog);
  const fetchUrl = useCommunityAgents((state) => state.fetchUrl);
  const { total = 0, data: communityAgents } = data || { data: [] };

  useEffect(() => {
    if (url && !isEqual(fetchUrl, url)) {
      setFetchUrl(url);
    }
  }, [url, fetchUrl, setFetchUrl]);

  const config: DataTableConfig = {
    enableRowSelection: true,
    enableSorting: true,
    enableFiltering: true,
    searchColumn: "id",
    searchPlaceholder: "Search by name or phone...",
    facetedFilters: [
      {
        column: "status",
        title: "Status",
        options: Object.values(CommunityAgentStatus).map((status) => ({
          label: status,
          value: status,
        })),
      },
    ],
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
          New Community Agent
        </Button>
      </>
    ),
    total,
  };

  return (
    <div className="container mx-auto">
      <CommunityAgentDialog />
      <DataTable columns={columns} data={communityAgents} config={config} />
    </div>
  );
};

export default CommunityAgentsTable;
