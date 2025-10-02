"use server";

import z from "zod";
import prisma from "@/lib/prisma/prismaClient";
import { newHabitSchema } from "@/lib/schemas";
import { TServerActionResult } from "@/lib/types";

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
