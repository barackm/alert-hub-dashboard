"use client";
import { CommunityAgent } from "@/types/community-agents";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Action, DataTableRowActions } from "../table/data-table-row-actions";
import { useCommunityAgents } from "../../hooks/use-community-agents";
import { DialogAction, DialogData } from "@/types/confirmation-dialog";
import { DetailsDialog } from "../details-dialog";
import { safeJsonParse } from "@/utils/json-parser";
import {
  ConfirmationDialog,
  defaultConfirmationDialogData,
} from "../confirmation-dialog";

type Props = {
  row: Row<CommunityAgent>;
};

const CommunityAgentActionCell = (props: Props) => {
  const { row } = props;
  const setSelectedAgent = useCommunityAgents(
    (state) => state.setSelectedAgent
  );
  const confirmationDialog = useCommunityAgents(
    (state) => state.confirmationDialog
  );
  const setConfirmationDialog = useCommunityAgents(
    (state) => state.setConfirmationDialog
  );

  const deleteAgent = useCommunityAgents((state) => state.deleteAgent);
  const [showDetails, setShowDetails] = React.useState(false);
  const openDialog = useCommunityAgents((state) => state.openDialog);

  const actions: Action<CommunityAgent>[] = [
    {
      label: "View Details",
      onClick: () => setShowDetails(true),
    },
    {
      label: "Edit Member",
      onClick: (row) => {
        setSelectedAgent(row as CommunityAgent);
        openDialog();
      },
    },
    {
      label: "Delete Member",
      onClick: (row) => {
        setConfirmationDialog({
          open: true,
          title: "Delete Member",
          description: "Are you sure you want to delete this member?",
          action: DialogAction.DELETE,
          data: row as CommunityAgent,
          variant: "destructive",
        });
      },
      shortcut: "⌘⌫",
      separator: true,
    },
  ];

  const data = safeJsonParse(row.original.location) || {};

  return (
    <div>
      <DetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        data={data}
      />
      <ConfirmationDialog<CommunityAgent>
        description={confirmationDialog.description}
        onConfirm={async () => {
          await deleteAgent(confirmationDialog.data?.id as number);
        }}
        open={confirmationDialog.open}
        title={confirmationDialog.title}
        onOpenChange={() =>
          setConfirmationDialog(
            defaultConfirmationDialogData as DialogData<CommunityAgent>
          )
        }
        variant={confirmationDialog.variant}
        data={confirmationDialog.data}
        action={confirmationDialog.action}
      />
      <DataTableRowActions row={row} actions={actions} />
    </div>
  );
};

export default CommunityAgentActionCell;
