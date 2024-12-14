"use client";
import { CommunityAgent } from "@/types/community-agents";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Action, DataTableRowActions } from "../table/data-table-row-actions";
import { useCommunityAgents } from "../../hooks/use-community-agents";

type Props = {
  row: Row<CommunityAgent>;
};

const CommunityAgentActionCell = (props: Props) => {
  const { row } = props;
  const setSelectedAgent = useCommunityAgents(
    (state) => state.setSelectedAgent
  );
  const openDialog = useCommunityAgents((state) => state.openDialog);

  const actions: Action<CommunityAgent>[] = [
    {
      label: "View Details",
      onClick: () => null,
    },
    {
      label: "Edit Member",
      onClick: (row) => {
        console.log("Edit", row);
        setSelectedAgent(row as CommunityAgent);
        openDialog();
      },
    },
    {
      label: "Delete Member",
      onClick: (row) => console.log("Delete", row),
      shortcut: "⌘⌫",
      separator: true,
    },
  ];
  return <DataTableRowActions row={row} actions={actions} />;
};

export default CommunityAgentActionCell;
