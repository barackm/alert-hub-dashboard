import UsersTable from "@/components/users/users-table";
import React from "react";

const UsersPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
