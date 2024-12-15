import { User } from "@/types/users";
import { Row } from "@tanstack/react-table";
import { DataTableRowActions } from "../table/data-table-row-actions";

type Props = {
  row: Row<User>;
};

const UserActionsCell = ({ row }: Props) => {
  const actions = [
    {
      label: "Edit User",
      onClick: (user: User) => console.log("Edit", user),
    },
  ];

  return (
    <>
      <DataTableRowActions row={row} actions={actions} />
    </>
  );
};

export default UserActionsCell;
