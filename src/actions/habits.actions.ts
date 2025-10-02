"use server";

import { HabitProgress } from "@/app/generated/prisma";
import prisma from "@/lib/prisma/prismaClient";
import { TServerActionResult } from "@/lib/types";

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

    const currDate = new Date();
    currDate.setHours(0, 0, 0, 0);
    const currDateStr = currDate.toISOString().split("T")[0];

    const hd = habit.habitDays.find(
      (hd) => hd.date.toISOString().split("T")[0] === currDateStr,
    );

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
