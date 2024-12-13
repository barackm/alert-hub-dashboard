"use client";
import React from "react";
import { DataTable, DataTableConfig } from "../table/data-table";
import { columns } from "./columns";
import { CommunityAgent } from "@/types/community-agents";

const CommunityAgentsTable = () => {
  const config: DataTableConfig = {
    enableRowSelection: true,
    enableSorting: true,
    enableFiltering: true,
    searchColumn: "id",
    searchPlaceholder: "Search alerts...",
    facetedFilters: [
      {
        column: "village",
        title: "Village",
        options: [
          { label: "Kibera", value: "kibera" },
          { label: "Kawangware", value: "kawangware" },
        ],
      },
    ],
    showToolbar: true,
  };

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={sampleData} config={config} />
    </div>
  );
};

export default CommunityAgentsTable;

export const sampleData: CommunityAgent[] = [
  {
    id: 1,
    created_at: "2024-01-15T09:30:00.000Z",
    phone: "+250780123456",
    first_name: "John",
    last_name: "Mugisha",
    village: "Akakaza",
  },
  {
    id: 2,
    created_at: "2024-01-16T10:15:00.000Z",
    phone: "+250780234567",
    first_name: "Alice",
    last_name: "Uwase",
    village: "Gasharu",
  },
  {
    id: 3,
    created_at: "2024-01-17T11:45:00.000Z",
    phone: "+250780345678",
    first_name: "Eric",
    last_name: "Kalisa",
    village: "Ntaganzwa",
  },
  {
    id: 4,
    created_at: "2024-01-18T13:20:00.000Z",
    phone: "+250780456789",
    first_name: "Marie",
    last_name: "Rukundo",
    village: "Nyarutovu",
  },
  {
    id: 5,
    created_at: "2024-01-19T14:10:00.000Z",
    phone: "+250780567890",
    first_name: "David",
    last_name: "Bizimana",
    village: "Akakaza",
  },
  {
    id: 6,
    created_at: "2024-01-20T15:30:00.000Z",
    phone: "+250780678901",
    first_name: "Grace",
    last_name: "Umutoni",
    village: "Gasharu",
  },
  {
    id: 7,
    created_at: "2024-01-21T16:45:00.000Z",
    phone: "+250780789012",
    first_name: "Peter",
    last_name: "Rwema",
    village: "Ntaganzwa",
  },
  {
    id: 8,
    created_at: "2024-01-22T17:20:00.000Z",
    phone: "+250780890123",
    first_name: "Sarah",
    last_name: "Ingabire",
    village: "Nyarutovu",
  },
  {
    id: 9,
    created_at: "2024-01-23T18:10:00.000Z",
    phone: "+250780901234",
    first_name: "James",
    last_name: "Karangwa",
    village: "Akakaza",
  },
  {
    id: 10,
    created_at: "2024-01-24T19:30:00.000Z",
    phone: "+250781012345",
    first_name: "Claire",
    last_name: "Ishimwe",
    village: "Gasharu",
  },
];
