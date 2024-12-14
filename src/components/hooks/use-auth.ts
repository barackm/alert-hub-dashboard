"use client";
import { User } from "@/types/users";
import { useEffect } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "../auth/actions";
import { create } from "zustand";

export type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useAuth = () => {
  const { setUser: setStoreUser } = useAuthStore();

  const getUser = async () => {
    try {
      const userData = await getCurrentUser();
      setStoreUser(userData);
    } catch {
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
};
