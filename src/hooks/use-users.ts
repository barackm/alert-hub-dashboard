import { create } from "zustand";

type State = {
  fetchUrl: string;
  setFetchUrl: (url: string) => void;
};

export const useUsers = create<State>((set) => ({
  fetchUrl: "",
  setFetchUrl: (url) => set({ fetchUrl: url }),
}));
