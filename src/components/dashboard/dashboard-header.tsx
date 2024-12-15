import { Button } from "../ui/button";
import { CalendarDateRangePicker } from "./date-range-picker";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2">
        <CalendarDateRangePicker />
        <Button className="w-full sm:w-auto">Download</Button>
      </div>
    </div>
  );
}
