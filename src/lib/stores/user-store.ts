import { create } from "zustand";

import type { User } from "@supabase/supabase-js";

interface UserStore {
  user: User | null;
  initUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  initUser: (user) => set(() => ({ user })),
}));
