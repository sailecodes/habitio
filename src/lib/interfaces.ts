import { THabit, THabitDay } from "./types";

export interface IHabits {
  habitsData: THabit[];
}

export interface IHabitsHeader {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsNewForm {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsCarousel {
  habits: THabit[];
}

export interface IHabitsCard {
  id: string;
  name: string;
  streak: number;
  startDate: string;
}

export interface IHabit {
  params: Promise<{ habitName: string; habitId: string }>;
}

export interface IHabitContent {
  habit: THabit;
}

export interface IHabitHeaderProps {
  name: string;
  streak: number;
}

export interface IHabitProgressBtns {
  habitId: string;
  habitDays: THabitDay[];
  setHabitDays: React.Dispatch<React.SetStateAction<THabitDay[]>>;
}

export interface IHabitCalendarProps {
  createdAt: Date;
  habitDays: THabitDay[];
}
