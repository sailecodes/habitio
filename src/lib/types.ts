import { HabitProgress } from "@/app/generated/prisma";

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

export type TUser = {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  habits?: THabit[];
  createdAt: Date;
  updatedAt: Date;
};

export type THabit = {
  id: string;
  name: string;
  streak: number;
  userId: string;
  habitDays?: THabitDay[];
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
