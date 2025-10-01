import { HabitProgress } from "@/app/generated/prisma";

export type TServerActionResult = {
  success: boolean;
  error?: string;
  data?: any;
};

export type THabit = {
  id: string;
  name: string;
  streak: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type THabitDay = {
  id: string;
  date: Date;
  progress: HabitProgress;
  habitId: string;
  createdAt: Date;
  updatedAt: Date;
};
