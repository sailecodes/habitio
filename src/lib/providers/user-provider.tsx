"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";
import { createUserStore, TUserStore } from "../stores/user-store";

export type TUserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<TUserStoreApi | undefined>(undefined);

export interface IUserStoreProviderProps {
  initialState: Partial<TUserStore>;
  children: ReactNode;
}

export const UserStoreProvider = ({ initialState, children }: IUserStoreProviderProps) => {
  const storeRef = useRef<TUserStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createUserStore({ user: initialState.user ?? null });
  }

  return <UserStoreContext value={storeRef.current}>{children}</UserStoreContext>;
};

export const useUserStore = <T,>(selector: (store: TUserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error("useUserStore must be used within UserStoreProvider");
  }

  return useStore(userStoreContext, selector);
};
