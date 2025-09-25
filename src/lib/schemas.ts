import z from "zod";

export const newProjectSchema = z.object({
  habitName: z.string().min(1, {
    message: "Must be at least 1 character.",
  }),
});
