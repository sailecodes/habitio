import z from "zod";

export const newHabitSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character.",
  }),
});
