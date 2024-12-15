import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex-1 space-y-4 pt-6 overflow-x-hidden">
      <DashboardHeader />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <StatsCards />
          <DashboardOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
