"use client";

import { ShieldAlert, Users, UserCheck, Activity } from "lucide-react";
import { StatsCard } from "./stats-card";
import { useDashboard } from "@/hooks/use-dashboard";

function calculatePercentageChange(current: number, previous: number): string {
  if (previous === 0) return "+100.00";
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
}

export function StatsCards() {
  const { stats } = useDashboard();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="New Cases"
        value={`+${stats.newCases}`}
        change={`${calculatePercentageChange(
          stats.newCases,
          stats.previousMonthStats.newCases
        )}% from last month`}
        icon={<ShieldAlert className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Community members"
        value={`+${stats.communityMembers}`}
        change={`${calculatePercentageChange(
          stats.communityMembers,
          stats.previousMonthStats.communityMembers
        )}% from last month`}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Active Users"
        value={stats.activeUsers.toString()}
        change={`${calculatePercentageChange(
          stats.activeUsers,
          stats.previousMonthStats.activeUsers
        )}% from last month`}
        icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Active Now"
        value={stats.activeNow.toString()}
        change={`${calculatePercentageChange(
          stats.activeNow,
          stats.previousMonthStats.activeNow
        )}% from last month`}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
