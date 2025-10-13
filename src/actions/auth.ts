"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import { registerSchema, signInSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { TServerActionError, TServerActionSuccess } from "@/lib/types";

export async function register(
  data: z.infer<typeof registerSchema>
): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;
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

    supabase = await createClient();

    const {
      data: { user: sbUser },
      error: signUpError,
    } = await supabase.auth.signUp({
      ...parsedData,
      options: { emailRedirectTo: `${process.env.LOCAL_URL}` },
    });

    if (!sbUser) {
      return { success: false, error: "Something went wrong.", isPublic: false };
    } else if (signUpError) {
      return { success: false, error: signUpError.message, isPublic: false };
    }

    rbSbUser = sbUser;

    const pUser = await prisma.user.create({
      data: { email: parsedData.email, username: parsedData.username },
    });

    rbPUser = pUser;

    return { success: true, data: null };
  } catch (err) {
    // TODO: Rollback

    return { success: false, error: "Something went wrong.", isPublic: false };
  }
}

export async function signIn(
  data: z.infer<typeof signInSchema>
): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;

  try {
    const { data: parsedData, error: parseError } = signInSchema.safeParse(data);

    if (parseError) {
      return { success: false, error: parseError.message, isPublic: false };
    }

    supabase = await createClient();

    const { data: sbUser, error: signInError } = await supabase.auth.signInWithPassword({
      ...parsedData,
    });

    if (!sbUser) {
      return { success: false, error: "Something went wrong.", isPublic: false };
    } else if (signInError) {
      return { success: false, error: signInError.message, isPublic: false };
    }

    return { success: true, data: null };
  } catch (err) {
    return { success: false, error: "Something went wrong.", isPublic: false };
  }
}

export async function signOut(): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;

  try {
    supabase = await createClient();
    await supabase.auth.signOut();

    return { success: true, data: null };
  } catch (err) {
    return { success: false, error: "Something went wrong.", isPublic: false };
  }
}
