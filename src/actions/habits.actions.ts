"use server";

import z from "zod";
import { HabitProgress } from "@/app/generated/prisma";
import prisma from "@/lib/prisma/prismaClient";
import { newHabitSchema } from "@/lib/schemas";
import { TServerActionResult } from "@/lib/types";
import { getLocalDay, getNewDate } from "@/lib/utils";

export async function createNewHabit(
  data: z.infer<typeof newHabitSchema>,
): Promise<TServerActionResult> {
  try {
    const { data: parsedData, error: parseError } =
      newHabitSchema.safeParse(data);

    if (parseError) {
      return { success: false, error: `[ERR] ${parseError}` };
    }

    // TODO: Replace with actual user ID
    const newHabit = await prisma.habit.create({
      data: {
        userId: "537027d9-698c-4c2a-88e7-1504130865f7",
        ...parsedData,
      },
    });

    return { success: true, data: newHabit };
  } catch (e) {
    return { success: false, error: `[ERR] ${e}` };
  }
}

export async function updateDailyProgress(
  habitId: string,
  progress: HabitProgress,
): Promise<TServerActionResult> {
  try {
    const habit = await prisma.habit.findFirst({
      where: { id: habitId },
      include: { habitDays: true },
    });

    if (!habit) {
      return { success: false, error: "[ERR] Habit not found" };
    }

    const currDate = getNewDate();
    const currDay = getLocalDay(currDate);

    const hd = habit.habitDays.find((hd) => {
      const hdDate = getNewDate(hd.date);

      return getLocalDay(hdDate) === currDay;
    });

    let updatedHabitDay = null;

    if (hd) {
      updatedHabitDay = await prisma.habitDay.update({
        where: { id: hd.id },
        data: { progress },
      });
    } else {
      updatedHabitDay = await prisma.habitDay.create({
        data: {
          date: currDate,
          progress: progress,
          habitId,
        },
      });
    }

    return { success: true, data: updatedHabitDay };
  } catch (err) {
    return { success: false, error: `[ERR] ${err}` };
  }
}
