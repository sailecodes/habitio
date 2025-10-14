import z from "zod";

export const registerSchema = z.object({
  email: z.email("Please provide an email"),
  password: z.string().min(6, "Password must be 6 characters"),
  username: z.string().min(1, "Please provide a username"),
});

export const signInSchema = z.object({
  email: z.email("Please provide an email"),
  password: z.string().min(1, "Please provide a password"),
});

export const newHabitSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character.",
  }),
});
