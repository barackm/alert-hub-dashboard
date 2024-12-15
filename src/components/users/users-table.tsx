"use client";
import React, { useEffect } from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { User, UserStatus } from "@/types/users";
import useSWR from "swr";
import { fetchUsers } from "./actions";
import { isEqual } from "lodash";
import { useUsers } from "@/hooks/use-users";
import { useSearchParams } from "next/navigation";
import { FetchResponse } from "@/types/fetch";

const UsersTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const url = `/users?page=${page}&limit=${limit}`;
  const { data, isLoading } = useSWR<FetchResponse<User>>(url, () =>
    fetchUsers({
      page: Number(page),
      limit: Number(limit),
    })
  );

  const { data: users, total = 0 } = data || { data: [] };
  const setFetchUrl = useUsers((state) => state.setFetchUrl);
  const fetchUrl = useUsers((state) => state.fetchUrl);

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
    total,
  };

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={users} config={config} />
    </div>
  );
};

export default UsersTable;
