"use client";
import React, { useEffect } from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { User, UserStatus } from "@/types/users";
import useSWR from "swr";
import { fetchUsers } from "./actions";
import { isEqual } from "lodash";
import { useUsers } from "@/hooks/use-users";

const UsersTable = () => {
  const url = "/users";
  const { data, isLoading } = useSWR<User[]>(url, () => fetchUsers());

  const setFetchUrl = useUsers((state) => state.setFetchUrl);
  const fetchUrl = useUsers((state) => state.fetchUrl);
  const users = React.useMemo(() => data || [], [data]);

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
    searchPlaceholder: "Search users...",
    facetedFilters: [
      {
        column: "status",
        title: "Status",
        options: Object.values(UserStatus).map((status) => ({
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
      <DataTable columns={columns} data={users} config={config} />
    </div>
  );
};

export default UsersTable;
