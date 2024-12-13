"use client";
import { create } from "zustand";
import {
  CommunityAgent,
  CommunityAgentFormValues,
} from "@/types/community-agents";
import { sampleData } from "./sample-data";

interface CommunityAgentsState {
  agents: CommunityAgent[];
  selectedAgent: CommunityAgent | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  error: string | null;

  openDialog: () => void;
  closeDialog: () => void;
  setSelectedAgent: (agent: CommunityAgent | null) => void;

  createAgent: (data: CommunityAgentFormValues) => Promise<void>;
  updateAgent: (id: number, data: CommunityAgentFormValues) => Promise<void>;
  deleteAgent: (id: number) => Promise<void>;
  fetchAgents: () => Promise<void>;
}

export const useCommunityAgents = create<CommunityAgentsState>((set) => ({
  agents: sampleData,
  selectedAgent: null,
  isDialogOpen: false,
  isLoading: false,
  error: null,

  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => {
    set({ isDialogOpen: false, selectedAgent: null });
  },
  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent, isDialogOpen: true });
  },

  createAgent: async (data) => {
    try {
      set({ isLoading: true });
      const newAgent = {
        ...data,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      set((state) => ({ agents: [...state.agents, newAgent] }));
    } catch {
      set({ error: "Failed to create agent" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateAgent: async (id, data) => {
    try {
      set({ isLoading: true });
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id ? { ...agent, ...data } : agent
        ),
      }));
    } catch {
      set({ error: "Failed to update agent" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAgent: async (id) => {
    try {
      set({ isLoading: true });
      set((state) => ({
        agents: state.agents.filter((agent) => agent.id !== id),
      }));
    } catch (error) {
      set({
        error: `Failed to delete agent: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAgents: async () => {
    try {
      set({ isLoading: true });
      set({ agents: [] });
    } catch (error) {
      set({
        error: `Failed to fetch agents: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const selectAgents = (state: CommunityAgentsState) => state.agents;
export const selectSelectedAgent = (state: CommunityAgentsState) =>
  state.selectedAgent;
export const selectIsLoading = (state: CommunityAgentsState) => state.isLoading;
