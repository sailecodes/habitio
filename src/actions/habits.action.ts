"use server";

import z from "zod";
import { HabitProgress } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { newHabitSchema } from "@/lib/schemas";
import { TServerActionError, TServerActionSuccess } from "@/lib/types";
import { getLocalDay, getNewDate } from "@/lib/utils";

export async function createNewHabit(
  data: z.infer<typeof newHabitSchema>,
  userId: string
): Promise<TServerActionSuccess | TServerActionError> {
  try {
    const { data: parsedData, error: parseError } = newHabitSchema.safeParse(data);

    if (parseError) {
      return { success: false, error: `[CREATE NEW HABIT ERROR] ${parseError}` };
    }

    const newHabit = await prisma.habit.create({
      data: {
        ...parsedData,
        userId,
      },
    });

    return { success: true, data: newHabit };
  } catch (err) {
    return { success: false, error: `[CREATE NEW HABIT ERROR] ${err}` };
  }
}

export async function updateDailyProgress(
  habitId: string,
  dailyProgress: HabitProgress
): Promise<TServerActionSuccess | TServerActionError> {
  try {
    const habit = await prisma.habit.findFirst({
      where: { id: habitId },
      include: { habitDays: true },
    });

    if (!habit) {
      return { success: false, error: "[UPDATE DAILY PROGRESS ERROR] Habit does not exist" };
    }

    const currDate = getNewDate();
    const currDay = getLocalDay(currDate);

    const hd = habit.habitDays.find((hd) => {
      const hdDate = getNewDate(hd.date);

      return getLocalDay(hdDate) === currDay;
    });

    let updatedHabitDay = null;
    let streakChange = 0;

    if (hd) {
      updatedHabitDay = await prisma.habitDay.update({
        where: { id: hd.id },
        data: {
          progress: dailyProgress,
        },
      });

      if (hd.progress !== HabitProgress.COMPLETED && dailyProgress === HabitProgress.COMPLETED) {
        streakChange = 1;
      } else if (
        hd.progress === HabitProgress.COMPLETED &&
        dailyProgress !== HabitProgress.COMPLETED
      ) {
        streakChange = -1;
      }
    } else {
      updatedHabitDay = await prisma.habitDay.create({
        data: {
          date: currDate,
          progress: dailyProgress,
          habitId,
        },
      });

      if (dailyProgress === HabitProgress.COMPLETED) {
        streakChange = 1;
      }
    }

    await prisma.habit.update({
      where: { id: habitId },
      data: {
        streak: habit.streak + streakChange,
      },
    });

    return { success: true, data: updatedHabitDay };
  } catch (err) {
    return { success: false, error: `[UPDATE DAILY PROGRESS ERROR] Something went wrong. ${err}` };
  }
}
