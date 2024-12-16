"use server";

import { createClient } from "@/utils/supabase/server";
import { Alert, IncidentType } from "@/types/alerts";
import { UserStatus } from "@/types/users";

export async function getAlertsStats(from: Date, to: Date) {
  const supabase = await createClient();

  const [currentAlerts, previousAlerts] = await Promise.all([
    supabase
      .from("alerts")
      .select("*")
      .gte("created_at", from.toISOString())
      .lte("created_at", to.toISOString()),
    supabase
      .from("alerts")
      .select("*")
      .gte(
        "created_at",
        new Date(from.setMonth(from.getMonth() - 1)).toISOString()
      )
      .lte(
        "created_at",
        new Date(to.setMonth(to.getMonth() - 1)).toISOString()
      ),
  ]);

  if (currentAlerts.error) throw currentAlerts.error;
  if (previousAlerts.error) throw previousAlerts.error;

  return {
    current: currentAlerts.data,
    previous: previousAlerts.data,
    trends: calculateTrends(currentAlerts.data),
  };
}

export async function getCommunityStats() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("community_agents")
    .select("*", { count: "exact" });

  if (error) throw error;
  return { communityMembers: count || 0 };
}

export async function getUserStats() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("status", UserStatus.ACTIVE);

  if (error) throw error;
  return {
    activeUsers: data.length,
    activeNow: data.filter(
      (u) => u.last_seen >= new Date(Date.now() - 5 * 60000)
    ).length,
  };
}

export async function getFacilityStats() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("health_facilities")
    .select("*", { count: "exact" });

  if (error) throw error;
  return { facilities: count || 0 };
}

interface AlertTrend {
  month: string;
  [key: string]: number | string;
}

function calculateTrends(alerts: Alert[]): AlertTrend[] {
  const incidentTypes = Object.values(IncidentType).map((type) =>
    type.toLowerCase()
  );

  const trends = alerts.reduce((acc, alert) => {
    const date = new Date(alert.created_at);
    const month = date
      .toLocaleString("default", { month: "long" })
      .toLowerCase();

    if (!acc[month]) {
      acc[month] = {
        month,
        ...incidentTypes.reduce((types, type) => ({ ...types, [type]: 0 }), {}),
      };
    }
    const alertType = alert.incident_type.toLowerCase();
    if (alertType in acc[month]) {
      acc[month][alertType] = (acc[month][alertType] as number) + 1;
    }

    return acc;
  }, {} as Record<string, AlertTrend>);

  const monthOrder = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return Object.values(trends).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );
}
