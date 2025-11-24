"use server";

import { cookies } from "next/headers";

export async function deleteCookie(token: string, userId: string) {
  const cookieStore = await cookies();
  cookieStore.set("token", token);
  cookieStore.set("userId", userId);
}
