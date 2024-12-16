"use client";

import { create } from "zustand";
import { DashboardData } from "@/types/dashboard";
import {
  getAlertsStats,
  getCommunityStats,
  getUserStats,
  getFacilityStats,
} from "@/components/dashboard/actions";
import { DateRange } from "react-day-picker";

interface LoadingState {
  alerts: boolean;
  community: boolean;
  users: boolean;
  facility: boolean;
}

interface ErrorState {
  alerts: string | null;
  community: string | null;
  users: string | null;
  facility: string | null;
}

interface DashboardState extends DashboardData {
  loading: LoadingState;
  errors: ErrorState;
  fetchAlertsStats: (dateRange: DateRange) => Promise<void>;
  fetchCommunityStats: () => Promise<void>;
  fetchUserStats: () => Promise<void>;
  fetchFacilityStats: () => Promise<void>;
}

export const useDashboard = create<DashboardState>((set) => ({
  stats: {
    newCases: 0,
    communityMembers: 0,
    activeUsers: 0,
    activeNow: 0,
    totalAlerts: 0,
    previousMonthStats: {
      newCases: 0,
      communityMembers: 0,
      activeUsers: 0,
      activeNow: 0,
    },
  },
  trends: [],
  loading: {
    alerts: false,
    community: false,
    users: false,
    facility: false,
  },
  errors: {
    alerts: null,
    community: null,
    users: null,
    facility: null,
  },

  fetchAlertsStats: async (dateRange: DateRange) => {
    const { from, to } = dateRange;
    set((state) => ({
      loading: { ...state.loading, alerts: true },
      errors: { ...state.errors, alerts: null },
    }));
    try {
      if (!from || !to) {
        return;
      }
      const alertsStats = await getAlertsStats(from, to);
      set((state) => ({
        stats: { ...state.stats, totalAlerts: alertsStats.current.length },
        loading: { ...state.loading, alerts: false },
      }));
    } catch (error: any) {
      set((state) => ({
        loading: { ...state.loading, alerts: false },
        errors: {
          ...state.errors,
          alerts: error.message || "Failed to fetch alerts stats",
        },
      }));
    }
  },

  fetchCommunityStats: async () => {
    set((state) => ({
      loading: { ...state.loading, community: true },
      errors: { ...state.errors, community: null },
    }));
    try {
      const communityStats = await getCommunityStats();
      set((state) => ({
        stats: {
          ...state.stats,
          communityMembers: communityStats.communityMembers,
        },
        loading: { ...state.loading, community: false },
      }));
    } catch (error: any) {
      set((state) => ({
        loading: { ...state.loading, community: false },
        errors: {
          ...state.errors,
          community: error.message || "Failed to fetch community stats",
        },
      }));
    }
  },

  fetchUserStats: async () => {
    set((state) => ({
      loading: { ...state.loading, users: true },
      errors: { ...state.errors, users: null },
    }));
    try {
      const userStats = await getUserStats();
      set((state) => ({
        stats: {
          ...state.stats,
          activeUsers: userStats.activeUsers,
          activeNow: userStats.activeNow,
        },
        loading: { ...state.loading, users: false },
      }));
    } catch (error: any) {
      set((state) => ({
        loading: { ...state.loading, users: false },
        errors: {
          ...state.errors,
          users: error.message || "Failed to fetch user stats",
        },
      }));
    }
  },

  fetchFacilityStats: async () => {
    set((state) => ({
      loading: { ...state.loading, facility: true },
      errors: { ...state.errors, facility: null },
    }));
    try {
      const facilityStats = await getFacilityStats();
      set((state) => ({
        stats: {
          ...state.stats,
          newCases: facilityStats.facilities,
        },
        loading: { ...state.loading, facility: false },
      }));
    } catch (error: any) {
      set((state) => ({
        loading: { ...state.loading, facility: false },
        errors: {
          ...state.errors,
          facility: error.message || "Failed to fetch facility stats",
        },
      }));
    }
  },
}));
