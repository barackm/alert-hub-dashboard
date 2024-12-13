import AlertsTable from "@/components/alerts/alerts-table";
import React from "react";

const AlertPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold text-gray-800">Alerts</h1>
      </div>
      <AlertsTable />
    </div>
  );
};

export default AlertPage;
