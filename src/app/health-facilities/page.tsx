import HealthFacilitiesTable from "@/components/health-facilities/health-facilities-table";
import React from "react";

const HealthFacilitiesPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold tracking-tight">Health Facilities</h1>
      </div>
      <HealthFacilitiesTable />
    </div>
  );
};

export default HealthFacilitiesPage;
