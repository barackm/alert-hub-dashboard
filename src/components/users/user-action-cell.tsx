import { User } from "@/types/users";
import { Row } from "@tanstack/react-table";
import { DataTableRowActions } from "../table/data-table-row-actions";

type Props = {
  row: Row<User>;
};

const UserActionsCell = ({ row }: Props) => {
  const actions = [
    {
      label: "View Details",
      onClick: () => null,
    },
    {
      label: "Edit User",
      onClick: (user: User) => console.log("Edit", user),
    },
    {
      label: "Delete User",
      onClick: (user: User) => console.log("Delete", user),
      shortcut: "⌘⌫",
      separator: true,
    },
  ];

  return (
    <>
      <DataTableRowActions row={row} actions={actions} />
    </>
  );
};

export default UserActionsCell;
