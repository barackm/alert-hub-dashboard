"use client";
import { HealthFacility } from "@/types/health-facilities";
import { Row } from "@tanstack/react-table";
import React from "react";
import { Action, DataTableRowActions } from "../table/data-table-row-actions";
import { useHealthFacilities } from "../../hooks/use-health-facilities";
import { DialogAction, DialogData } from "@/types/confirmation-dialog";
import { DetailsDialog } from "../details-dialog";
import { safeJsonParse } from "@/utils/json-parser";
import {
  ConfirmationDialog,
  defaultConfirmationDialogData,
} from "../confirmation-dialog";

type Props = {
  row: Row<HealthFacility>;
};

const HealthFacilityActionCell = (props: Props) => {
  const { row } = props;
  const setSelectedFacility = useHealthFacilities(
    (state) => state.setSelectedFacility
  );
  const confirmationDialog = useHealthFacilities(
    (state) => state.confirmationDialog
  );
  const setConfirmationDialog = useHealthFacilities(
    (state) => state.setConfirmationDialog
  );
  const [showDetails, setShowDetails] = React.useState(false);
  const openDialog = useHealthFacilities((state) => state.openDialog);

  const actions: Action<HealthFacility>[] = [
    {
      label: "View Details",
      onClick: () => setShowDetails(true),
    },
    {
      label: "Edit Facility",
      onClick: (row) => {
        setSelectedFacility(row as HealthFacility);
        openDialog();
      },
    },
    {
      label: "Delete Facility",
      onClick: (row) => {
        setConfirmationDialog({
          open: true,
          title: "Delete Facility",
          description: "Are you sure you want to delete this facility?",
          action: DialogAction.DELETE,
          data: row as HealthFacility,
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
      <ConfirmationDialog<HealthFacility>
        description={confirmationDialog.description}
        onConfirm={() => Promise.resolve()}
        open={confirmationDialog.open}
        title={confirmationDialog.title}
        onOpenChange={() =>
          setConfirmationDialog(
            defaultConfirmationDialogData as DialogData<HealthFacility>
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

export default HealthFacilityActionCell;
