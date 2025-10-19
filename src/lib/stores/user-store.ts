import { createStore } from "zustand";
import { TUser } from "../types";

export type TUserState = {
  user: TUser | null;
};

export type TUserActions = {
  signOut: () => void;
};

export type TUserStore = TUserState & TUserActions;

export const defaultUserInitState = {
  user: null,
};

export const createUserStore = (initState: TUserState = defaultUserInitState) => {
  return createStore<TUserStore>()((set) => ({
    ...initState,
    signOut: () => set({ user: null }),
  }));
};
