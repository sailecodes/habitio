"use server";

import z from "zod";
import prisma from "@/lib/prisma";
import { registerSchema, signInSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { CUSTOM_ERROR_TYPE, TServerActionError2, TServerActionSuccess } from "@/lib/types";

export async function register(
  data: z.infer<typeof registerSchema>
): Promise<TServerActionSuccess | TServerActionError2> {
  let supabase = null;
  let rbSbUser = null;
  let rbPUser = null;

  try {
    const { data: parsedData, error: parseError } = registerSchema.safeParse(data);

    if (parseError) {
      return {
        success: false,
        error: {
          type: CUSTOM_ERROR_TYPE.NON_UI,
          message: `[REGISTER ERROR] ${parseError.message}`,
        },
      };
    }

    const isUserUnique = await prisma.user.findFirst({
      where: { OR: [{ email: parsedData.email }, { username: parsedData.username }] },
    });

    if (isUserUnique) {
      return {
        success: false,
        error: {
          type: CUSTOM_ERROR_TYPE.UI,
          message: "[REGISTER ERROR] Email or username is already taken.",
          uiKeyword: "taken",
        },
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
        error: {
          type: CUSTOM_ERROR_TYPE.NON_UI,
          message: "[REGISTER ERROR] Supabase user does not exist",
        },
      };
    } else if (registerError) {
      return {
        success: false,
        error: {
          type: CUSTOM_ERROR_TYPE.NON_UI,
          message: `[REGISTER ERROR] ${registerError.message}`,
        },
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
      error: {
        type: CUSTOM_ERROR_TYPE.NON_UI,
        message: `[REGISTER ERROR] Something went wrong.\n${err}`,
      },
    };
  }
}

export async function signIn(
  data: z.infer<typeof signInSchema>
): Promise<TServerActionSuccess | TServerActionError2> {
  let supabase = null;

  try {
    const { data: parsedData, error: parseError } = signInSchema.safeParse(data);

    if (parseError) {
      return {
        success: false,
        error: { type: CUSTOM_ERROR_TYPE.NON_UI, message: `[SIGN IN ERROR] ${parseError.message}` },
      };
    }

    supabase = await createClient();

    const { data: sbUser, error: signInError } = await supabase.auth.signInWithPassword({
      ...parsedData,
    });

    if (!sbUser) {
      return {
        success: false,
        error: {
          type: CUSTOM_ERROR_TYPE.NON_UI,
          message: "[SIGN IN ERROR] Supabase user does not exist",
        },
      };
    } else if (signInError) {
      return {
        success: false,
        error: {
          type: CUSTOM_ERROR_TYPE.NON_UI,
          message: `[SIGN IN ERROR] ${signInError.message}`,
        },
      };
    }

    return { success: true, data: null };
  } catch (err) {
    return {
      success: false,
      error: {
        type: CUSTOM_ERROR_TYPE.NON_UI,
        message: `[SIGN IN ERROR] Something went wrong.\n${err}`,
      },
    };
  }
}

export async function signOut(): Promise<TServerActionSuccess | TServerActionError2> {
  let supabase = null;

  try {
    supabase = await createClient();
    await supabase.auth.signOut();

    return { success: true, data: null };
  } catch (err) {
    return {
      success: false,
      error: {
        type: CUSTOM_ERROR_TYPE.NON_UI,
        message: `[SIGN OUT ERROR] Something went wrong.\n${err}`,
      },
    };
  }
}
