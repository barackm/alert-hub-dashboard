export interface DashboardStats {
  newCases: number;
  communityMembers: number;
  activeUsers: number;
  activeNow: number;
  totalAlerts: number;
  previousMonthStats: {
    newCases: number;
    communityMembers: number;
    activeUsers: number;
    activeNow: number;
  };
}

export interface AlertTrend {
  month: string;
  death: number;
  pandemic: number;
  disease: number;
}

export interface DashboardData {
  stats: DashboardStats;
  trends: any[];
}
