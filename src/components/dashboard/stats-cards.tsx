import { ShieldAlert, Users, UserCheck, Activity } from "lucide-react";
import { StatsCard } from "./stats-card";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="New Cases"
        value="+30"
        change="+5% from last month"
        icon={<ShieldAlert className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Community members"
        value="+2350"
        change="+180.1% from last month"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Active Users"
        value="1,200"
        change="+20% from last month"
        icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Active Now"
        value="1,200"
        change="+20% from last month"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
