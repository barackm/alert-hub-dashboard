"use client";
import { create } from "zustand";
import {
  CommunityAgent,
  CommunityAgentFormValues,
} from "@/types/community-agents";
import {
  createCommunityAgent,
  deleteCommunityAgent,
  updateCommunityAgent,
} from "@/components/community-agents/actions";
import { mutate } from "swr";

interface CommunityAgentsState {
  selectedAgent: CommunityAgent | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  error: string | null;
  fetchUrl: string;

  openDialog: () => void;
  closeDialog: () => void;
  setSelectedAgent: (agent: CommunityAgent | null) => void;
  setFetchUrl: (url: string) => void;

  createAgent: (data: CommunityAgentFormValues) => Promise<void>;
  updateAgent: (id: number, data: CommunityAgentFormValues) => Promise<void>;
  deleteAgent: (id: number) => Promise<void>;
}

export const useCommunityAgents = create<CommunityAgentsState>((set, get) => ({
  selectedAgent: null,
  isDialogOpen: false,
  isLoading: false,
  error: null,
  fetchUrl: "",

  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => {
    set({ isDialogOpen: false, selectedAgent: null });
  },
  setSelectedAgent: (agent) => {
    set({ selectedAgent: agent, isDialogOpen: true });
  },

  createAgent: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await createCommunityAgent(data);
      mutate(get().fetchUrl);
    } catch (error: any) {
      set({ error: `Failed to create agent: ${error.message}` });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateAgent: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      await updateCommunityAgent(id, data);
      mutate(get().fetchUrl);
    } catch (error: any) {
      set({ error: `Failed to update agent: ${error.message}` });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAgent: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await deleteCommunityAgent(id);
      mutate(get().fetchUrl);
    } catch (error: any) {
      set({ error: `Failed to delete agent: ${error.message}` });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  setFetchUrl: (url) => set({ fetchUrl: url }),
}));

export const selectSelectedAgent = (state: CommunityAgentsState) =>
  state.selectedAgent;
export const selectIsLoading = (state: CommunityAgentsState) => state.isLoading;
