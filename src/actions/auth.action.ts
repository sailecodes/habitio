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
      return {
        success: false,
        error: `[REGISTER ERROR] ${parseError.message}`,
      };
    }

    const isUserUnique = await prisma.user.findFirst({
      where: { OR: [{ email: parsedData.email }, { username: parsedData.username }] },
    });

    if (isUserUnique) {
      return {
        success: false,
        error: "Email or username is already taken.",
      };
    }

    supabase = await createClient();

    const {
      data: { user: sbUser },
      error: registerError,
    } = await supabase.auth.signUp({
      ...parsedData,
      options: { emailRedirectTo: `${process.env.LOCAL_URL}` },
    });

    if (!sbUser) {
      return {
        success: false,
        error: "[REGISTER ERROR] Supabase user does not exist",
      };
    } else if (registerError) {
      return {
        success: false,
        error: `[REGISTER ERROR] ${registerError.message}`,
      };
    }

    rbSbUser = sbUser;

    const pUser = await prisma.user.create({
      data: { email: parsedData.email, username: parsedData.username },
    });

    rbPUser = pUser;

    return { success: true, data: null };
  } catch (err) {
    // TODO: ROLLBACK

    return {
      success: false,
      error: `[REGISTER ERROR] Something went wrong.\n${err}`,
    };
  }
}

export async function signIn(
  data: z.infer<typeof signInSchema>
): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;

  try {
    const { data: parsedData, error: parseError } = signInSchema.safeParse(data);

    if (parseError) {
      return { success: false, error: `[SIGN IN ERROR] ${parseError.message}` };
    }

    supabase = await createClient();

    const { data: sbUser, error: signInError } = await supabase.auth.signInWithPassword({
      ...parsedData,
    });

    if (!sbUser) {
      return { success: false, error: "[SIGN IN ERROR] Supabase user does not exist" };
    } else if (signInError) {
      return { success: false, error: `[SIGN IN ERROR] ${signInError.message}` };
    }

    return { success: true, data: null };
  } catch (err) {
    return { success: false, error: `[SIGN IN ERROR] Something went wrong.\n${err}` };
  }
}

export async function signOut(): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;

  try {
    supabase = await createClient();
    await supabase.auth.signOut();

    return { success: true, data: null };
  } catch (err) {
    return { success: false, error: `[SIGN OUT ERROR] Something went wrong.\n${err}` };
  }
}
