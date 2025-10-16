"use client";

import { ReactNode, useEffect } from "react";
import { useHabitsStore } from "@/lib/stores/habits-store";
import { useUserStore } from "@/lib/stores/user-store";
import { THabit } from "@/lib/types";

import type { User } from "@supabase/supabase-js";
export interface IInitStoresProps {
  user: User | null;
  habits: THabit[];
  children: ReactNode;
}

export default function InitStores({ user, habits, children }: IInitStoresProps) {
  const { initUser } = useUserStore();
  const { initHabits } = useHabitsStore();

  useEffect(() => {
    if (user) initUser(user);
    if (habits?.length) initHabits(habits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
