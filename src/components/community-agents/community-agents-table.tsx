"use client";
import React from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { CommunityAgentStatus } from "@/types/community-agents";
import { CommunityAgentDialog } from "./community-agent-dialog";
import {
  selectAgents,
  useCommunityAgents,
} from "../../hooks/use-community-agents";

const CommunityAgentsTable = () => {
  const agents = useCommunityAgents(selectAgents);

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
  };

  return (
    <div className="container mx-auto">
      <CommunityAgentDialog />
      <DataTable columns={columns} data={agents} config={config} />
    </div>
  );
};

export default CommunityAgentsTable;
