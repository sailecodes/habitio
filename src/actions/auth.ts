"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { TServerActionError, TServerActionSuccess } from "@/lib/types";

export async function register(
  data: z.infer<typeof registerSchema>
): Promise<TServerActionSuccess | TServerActionError> {
  const supabase = await createClient();

  let rbSbUser = null;
  let rbPUser = null;

  try {
    const { data: parsedData, error: parseError } = registerSchema.safeParse(data);

    if (parseError) {
      return { success: false, error: parseError.message, isPublic: false };
    }

    const isUserUnique = await prisma.user.findFirst({
      where: { OR: [{ email: parsedData.email }, { username: parsedData.username }] },
    });

    if (isUserUnique) {
      return { success: false, error: "Email or username is already taken.", isPublic: true };
    }

    const { data: sbUser, error: sbError } = await supabase.auth.signUp({
      email: parsedData.email,
      password: parsedData.password,
      options: { emailRedirectTo: `${process.env.LOCAL_URL}/sign-in` },
    });

    if (!sbUser) {
      return { success: false, error: "Something went wrong. Please try again!", isPublic: true };
    } else if (sbError) {
      return { success: false, error: sbError.message, isPublic: false };
    }

    rbSbUser = sbUser;

    const pUser = await prisma.user.create({
      data: { email: parsedData.email, username: parsedData.username },
    });

    rbPUser = pUser;

    return { success: true, data: null };
  } catch (err) {
    // TODO: Rollback

    return { success: false, error: "Something went wrong. Please try again!", isPublic: true };
  }
}
