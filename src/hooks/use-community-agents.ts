"use client";
import { create } from "zustand";
import {
  CommunityAgent,
  CommunityAgentRequestBody,
} from "@/types/community-agents";
import {
  createCommunityAgent,
  deleteCommunityAgent,
  updateCommunityAgent,
} from "@/components/community-agents/actions";
import { mutate } from "swr";
import { DialogAction, DialogData } from "@/types/confirmation-dialog";

interface CommunityAgentsState {
  selectedAgent: CommunityAgent | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  error: string | null;
  fetchUrl: string;
  confirmationDialog: DialogData<CommunityAgent>;

  openDialog: () => void;
  closeDialog: () => void;
  setSelectedAgent: (agent: CommunityAgent | null) => void;
  setFetchUrl: (url: string) => void;
  setConfirmationDialog: (data: DialogData<CommunityAgent>) => void;

  createAgent: (data: CommunityAgentRequestBody) => Promise<void>;
  updateAgent: (id: number, data: CommunityAgentRequestBody) => Promise<void>;
  deleteAgent: (id: number) => Promise<void>;
}

export const useCommunityAgents = create<CommunityAgentsState>((set, get) => ({
  selectedAgent: null,
  isDialogOpen: false,
  isLoading: false,
  error: null,
  fetchUrl: "",
  confirmationDialog: {
    open: false,
    data: null,
    title: "",
    description: "",
    variant: "default",
    action: DialogAction.CREATE,
  },

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
      await createCommunityAgent({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        location: data.location,
        status: data.status,
      });
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
      await updateCommunityAgent(id, {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        location: data.location,
        status: data.status,
      });
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
  setConfirmationDialog: (data) => set({ confirmationDialog: data }),
}));

export const selectSelectedAgent = (state: CommunityAgentsState) =>
  state.selectedAgent;
export const selectIsLoading = (state: CommunityAgentsState) => state.isLoading;
