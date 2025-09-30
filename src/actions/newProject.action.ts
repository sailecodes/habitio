"use server";

import z from "zod";
import prisma from "@/lib/prisma/prismaClient";
import { newProjectSchema } from "@/lib/schemas";
import { TServerActionResult } from "@/lib/types";

export async function createNewProject(
  data: z.infer<typeof newProjectSchema>,
): Promise<TServerActionResult> {
  try {
    const { data: parsedData, error: parseError } =
      newProjectSchema.safeParse(data);

    if (parseError) {
      return { success: false, error: `[ERROR PARSING] ${parseError}` };
    }

    // TODO: Replace with actual user ID
    const newProject = await prisma.project.create({
      data: { userId: "537027d9-698c-4c2a-88e7-1504130865f7", ...parsedData },
    });

    return { success: true, data: newProject };
  } catch (e) {
    return { success: false, error: `[ERROR CREATING NEW PROJECT] ${e}` };
  }
}
