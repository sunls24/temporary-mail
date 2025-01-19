"use server";

import { cookies } from "next/headers";
import { defaultLocale, Locale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}

export async function isSetLocale() {
  return (await cookies()).get(COOKIE_NAME) !== undefined;
}
