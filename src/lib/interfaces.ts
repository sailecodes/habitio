import { params } from "next/navigation";
import React from "react";
import { HabitDay } from "@/app/generated/prisma";
import { THabit, THabitDay } from "./types";

export interface IHabitsProps {
  habitsData: THabit[];
}

export interface IHabitsHeaderProps {
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

export interface IHabitProps {
  params: Promise<{ habitName: string; habitId: string }>;
}

export interface IHabitRootProps {
  habit: THabit;
}

export interface IHabitContentProps {
  habitId: string;
  habitDays: HabitDay[];
  createdAt: Date;
  habitStreak: number;
  setHabitStreak: React.Dispatch<React.SetStateAction<number>>;
}

export interface IHabitHeaderProps {
  habitName: string;
  habitStreak: number;
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
