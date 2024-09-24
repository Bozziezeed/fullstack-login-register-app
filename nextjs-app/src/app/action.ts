"use server";
import { cookies } from "next/headers";

export async function getCookie(key: string) {
  const cookiesList = cookies();

  return cookiesList.get(key)?.value;
}
