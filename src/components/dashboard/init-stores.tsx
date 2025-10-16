"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore } from "@/lib/stores/user-store";
import { THabit, TUser } from "@/lib/types";

export interface IInitStoresProps {
  user: TUser | null;
  habits: THabit[];
  children: ReactNode;
}

export default function InitStores({ user, habits, children }: IInitStoresProps) {
  const { initUser } = useUserStore();
  const { initHabits } = useHabitsStore();

  useEffect(() => {
    initUser(user);
    initHabits(habits);
  }, [user, habits, initUser, initHabits]);

  return <>{children}</>;
}
