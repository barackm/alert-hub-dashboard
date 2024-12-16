"use client";
import { create } from "zustand";
import {
  HealthFacility,
  HealthFacilityRequestBody,
} from "@/types/health-facilities";
import { mutate } from "swr";
import { DialogAction, DialogData } from "@/types/confirmation-dialog";
import {
  createHealthFacility,
  deleteHealthFacility,
  updateHealthFacility,
} from "@/components/health-facilities/actions";

interface HealthFacilitiesState {
  selectedFacility: HealthFacility | null;
  isDialogOpen: boolean;
  isLoading: boolean;
  error: string | null;
  fetchUrl: string;
  confirmationDialog: DialogData<HealthFacility>;
  showDetails: boolean;

  openDialog: () => void;
  closeDialog: () => void;
  setSelectedFacility: (facility: HealthFacility | null) => void;
  setFetchUrl: (url: string) => void;
  setConfirmationDialog: (data: DialogData<HealthFacility>) => void;
  setShowDetails: (show: boolean) => void;

  createFacility: (data: HealthFacilityRequestBody) => Promise<void>;
  updateFacility: (
    id: number,
    data: HealthFacilityRequestBody
  ) => Promise<void>;
  deleteFacility: (id: number) => Promise<void>;
}

export const useHealthFacilities = create<HealthFacilitiesState>(
  (set, get) => ({
    selectedFacility: null,
    isDialogOpen: false,
    isLoading: false,
    error: null,
    fetchUrl: "",
    showDetails: false,
    confirmationDialog: {
      open: false,
      data: null,
      title: "",
      description: "",
      variant: "default",
      action: DialogAction.CREATE,
    },

    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ isDialogOpen: false, selectedFacility: null }),
    setSelectedFacility: (facility) =>
      set({ selectedFacility: facility, isDialogOpen: true }),

    createFacility: async (data) => {
      try {
        set({ isLoading: true, error: null });
        await createHealthFacility(data);
        mutate(get().fetchUrl);
      } catch (error: any) {
        set({ error: `Failed to create facility: ${error.message}` });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    updateFacility: async (id, data) => {
      try {
        set({ isLoading: true, error: null });
        await updateHealthFacility(id, data);
        mutate(get().fetchUrl);
      } catch (error: any) {
        set({ error: `Failed to update facility: ${error.message}` });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    deleteFacility: async (id) => {
      try {
        set({ isLoading: true, error: null });
        await deleteHealthFacility(id);
        mutate(get().fetchUrl);
      } catch (error: any) {
        set({ error: `Failed to delete facility: ${error.message}` });
        throw error;
      } finally {
        set({ isLoading: false });
      }
    },

    setFetchUrl: (url) => set({ fetchUrl: url }),
    setConfirmationDialog: (data) => set({ confirmationDialog: data }),
    setShowDetails: (show) => set({ showDetails: show }),
  })
);
