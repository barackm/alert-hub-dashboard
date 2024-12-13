"use client";
import React from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { User, UserStatus } from "@/types/users";

const UsersTable = () => {
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
  };

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={sampleUsers} config={config} />
    </div>
  );
};

export default UsersTable;

export const sampleUsers: User[] = [
  {
    id: "usr_01",
    created_at: "2024-01-15T09:30:00.000Z",
    first_name: "John",
    last_name: "Mugisha",
    email: "john.mugisha@example.com",
    status: UserStatus.ACTIVE,
  },
  {
    id: "usr_02",
    created_at: "2024-01-16T10:15:00.000Z",
    first_name: "Alice",
    last_name: "Uwase",
    email: "alice.uwase@example.com",
    status: UserStatus.ACTIVE,
  },
  {
    id: "usr_03",
    created_at: "2024-01-17T11:45:00.000Z",
    first_name: "Eric",
    last_name: "Kalisa",
    email: "eric.kalisa@example.com",
    status: UserStatus.PENDING,
  },
  {
    id: "usr_04",
    created_at: "2024-01-18T13:20:00.000Z",
    first_name: "Marie",
    last_name: "Rukundo",
    email: "marie.rukundo@example.com",
    status: UserStatus.ACTIVE,
  },
  {
    id: "usr_05",
    created_at: "2024-01-19T14:10:00.000Z",
    first_name: "David",
    last_name: "Bizimana",
    email: "david.bizimana@example.com",
    status: UserStatus.INACTIVE,
  },
  {
    id: "usr_06",
    created_at: "2024-01-20T15:30:00.000Z",
    first_name: "Grace",
    last_name: "Umutoni",
    email: "grace.umutoni@example.com",
    status: UserStatus.ACTIVE,
  },
  {
    id: "usr_07",
    created_at: "2024-01-21T16:45:00.000Z",
    first_name: "Peter",
    last_name: "Rwema",
    email: "peter.rwema@example.com",
    status: UserStatus.PENDING,
  },
  {
    id: "usr_08",
    created_at: "2024-01-22T17:20:00.000Z",
    first_name: "Sarah",
    last_name: "Ingabire",
    email: "sarah.ingabire@example.com",
    status: UserStatus.ACTIVE,
  },
  {
    id: "usr_09",
    created_at: "2024-01-23T18:10:00.000Z",
    first_name: "James",
    last_name: "Karangwa",
    email: "james.karangwa@example.com",
    status: UserStatus.INACTIVE,
  },
  {
    id: "usr_10",
    created_at: "2024-01-24T19:30:00.000Z",
    first_name: "Claire",
    last_name: "Ishimwe",
    email: "claire.ishimwe@example.com",
    status: UserStatus.ACTIVE,
  },
];
