"use client";
import { create } from "zustand";
import {
  CommunityAgent,
  CommunityAgentFormValues,
} from "@/types/community-agents";
import { sampleData } from "./sample-data";
import { createClient } from "@/utils/supabase/client";

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
      const supabase = createClient();
      set({ isLoading: true, error: null });
      const { data: newAgent, error } = await supabase
        .from("community_agents")
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({ agents: [newAgent, ...state.agents] }));
    } catch (error: any) {
      set({ error: `Failed to create agent: ${error.message}` });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateAgent: async (id, data) => {
    try {
      const supabase = createClient();
      set({ isLoading: true, error: null });
      const { data: updatedAgent, error } = await supabase
        .from("community_agents")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === id ? updatedAgent : agent
        ),
      }));
    } catch (error: any) {
      set({ error: `Failed to update agent: ${error.message}` });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAgent: async (id) => {
    try {
      const supabase = createClient();
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from("community_agents")
        .delete()
        .eq("id", id);

      if (error) throw error;
      set((state) => ({
        agents: state.agents.filter((agent) => agent.id !== id),
      }));
    } catch (error: any) {
      set({ error: `Failed to delete agent: ${error.message}` });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const selectAgents = (state: CommunityAgentsState) => state.agents;
export const selectSelectedAgent = (state: CommunityAgentsState) =>
  state.selectedAgent;
export const selectIsLoading = (state: CommunityAgentsState) => state.isLoading;
