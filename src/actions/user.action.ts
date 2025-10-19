"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { TServerActionError, TServerActionSuccess } from "@/lib/types";

export async function changeEmail(
  currEmail: string,
  newEmail: string
): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;

  try {
    supabase = await createClient();

    const { error: updateError } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (updateError) {
      return { success: false, error: `[CHANGE EMAIL ERROR] ${updateError}` };
    }

    await prisma.user.update({ where: { email: currEmail }, data: { email: newEmail } });

    return { success: true, data: null };
  } catch (err) {
    // TODO: ROLLBACK

    return { success: false, error: `[CHANGE EMAIL ERROR] Something went wrong.\n${err}` };
  }
}

export async function changeUsername(
  currUsername: string,
  newUsername: string
): Promise<TServerActionSuccess | TServerActionError> {
  try {
    await prisma.user.update({
      where: { username: currUsername },
      data: { username: newUsername },
    });

    return { success: true, data: null };
  } catch (err) {
    // TODO: ROLLBACK

    return { success: false, error: `[CHANGE USERNAME ERROR] Something went wrong.\n${err}` };
  }
}

export async function changePassword(
  email: string,
  password: string
): Promise<TServerActionSuccess | TServerActionError> {
  let supabase = null;

  try {
    supabase = await createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    });

    return { success: true, data: null };
  } catch (err) {
    // TODO: ROLLBACK

    return { success: false, error: `[CHANGE PASSWORD ERROR] Something went wrong.\n${err}` };
  }
}
