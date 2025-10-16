import { create } from "zustand";
import { THabit } from "../types";

interface HabitsStore {
  habits: THabit[];
  initHabits: (habits: THabit[]) => void;
  addHabit: (habit: THabit) => void;
  updateHabit: (habitId: string, habit: THabit) => void;
  removeHabit: (habitId: string) => void;
}

export const useHabitsStore = create<HabitsStore>((set) => ({
  habits: [],
  initHabits: (habits) => set(() => ({ habits })),
  addHabit: (habit) => set((state) => ({ habits: [...state.habits, habit] })),
  updateHabit: (habitId, habit) =>
    set((state) => ({ habits: state.habits.map((val) => (val.id !== habitId ? val : habit)) })),
  removeHabit: (habitId) =>
    set((state) => ({ habits: state.habits.filter((val) => val.id !== habitId) })),
}));
