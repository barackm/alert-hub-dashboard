import CommunityAgentsTable from "@/components/community-agents/community-agents-table";
import React from "react";

const CommunityAgentsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Community Agents</h1>
      </div>
      <CommunityAgentsTable />
    </div>
  );
};

export default CommunityAgentsPage;
