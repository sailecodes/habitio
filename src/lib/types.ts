import { HabitProgress } from "@/app/generated/prisma";

// ============================================================================
// SERVER ACTIONS

export type TServerActionSuccess = {
  success: true;
  data: any | null;
};

export type TServerActionError = {
  success: false;
  error: string;
};

export type TServerActionResult = {
  success: boolean;
  error?: string;
  data?: any;
};

// ============================================================================
// PRISMA SCHEMA

export type TUser = {
  id: string;
  email: string;
  username: string;
  habits?: THabit[];
  createdAt: Date;
  updatedAt: Date;
};

export type THabit = {
  id: string;
  name: string;
  streak: number;
  userId: string;
  user?: TUser | undefined;
  habitDays?: THabitDay;
  createdAt: Date;
  updatedAt: Date;
};

export type THabitDay = {
  id: string;
  date: Date;
  progress: HabitProgress;
  habitId: string;
  habit?: THabit | undefined;
  createdAt: Date;
  updatedAt: Date;
};
