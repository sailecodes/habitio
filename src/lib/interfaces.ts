import { HabitDay } from "@/app/generated/prisma";
import { THabit, THabitDay } from "./types";

// ============================================================================
// AUTH

export interface IEmailVerificationAlertProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFieldControllerInputProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string | undefined;
  description?: string | undefined;
  hasCustomErrors?: boolean | undefined;
  customErrors?: { message: string }[];
  type: string;
}

// ============================================================================
// HABITS

export interface IHabitsHeaderProps {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsDrawerProps {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsNewFormProps {
  setHabits: React.Dispatch<React.SetStateAction<THabit[]>>;
}

export interface IHabitsCarouselProps {
  habits: THabit[];
}

export interface IHabitsCardProps {
  id: string;
  name: string;
  streak: number;
  startDate: string;
}

// ============================================================================
// HABIT

export interface IHabitRootProps {
  params: Promise<{ habitName: string; habitId: string }>;
}

export interface IHabitProps {
  habit: THabit;
}

export interface IHabitHeaderProps {
  habitName: string;
  habitStreak: number;
}

export interface IHabitContentProps {
  habitId: string;
  habitDays: HabitDay[];
  createdAt: Date;
  habitStreak: number;
  setHabitStreak: React.Dispatch<React.SetStateAction<number>>;
}

export interface IHabitProgressBtnsProps {
  habitId: string;
  habitDays: THabitDay[];
  setHabitDays: React.Dispatch<React.SetStateAction<THabitDay[]>>;
  habitStreak: number;
  setHabitStreak: React.Dispatch<React.SetStateAction<number>>;
}

export interface IHabitCalendarProps {
  createdAt: Date;
  habitDays: THabitDay[];
}
