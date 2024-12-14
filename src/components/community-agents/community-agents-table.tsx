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

const CommunityAgentsTable = () => {
  const url = "/community-agents";
  const { data, isLoading } = useSWR<CommunityAgent[]>(url, () =>
    fetchCommunityAgents()
  );
  const setFetchUrl = useCommunityAgents((state) => state.setFetchUrl);
  const fetchUrl = useCommunityAgents((state) => state.fetchUrl);
  const communityAgents = React.useMemo(() => data || [], [data]);

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
    searchPlaceholder: "Search members...",
    facetedFilters: [
      {
        column: "village",
        title: "Village",
        options: [
          { label: "Gasharu", value: "Gasharu" },
          { label: "Ntaganzwa", value: "Ntaganzwa" },
        ],
      },
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
  };

  return (
    <div className="container mx-auto">
      <CommunityAgentDialog />
      <DataTable columns={columns} data={communityAgents} config={config} />
    </div>
  );
};

export default CommunityAgentsTable;
