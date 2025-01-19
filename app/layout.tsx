import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Clarity from "@/components/clarity";
import Umami from "@/components/umami";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getUserLocale } from "@/app/locale";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "临时邮箱 - 匿名的一次性邮箱",
  description:
    "临时邮箱 - 匿名的一次性邮箱，保护您的个人电子邮件地址免受垃圾邮件的骚扰。",
  keywords: [
    "免费",
    "临时邮箱",
    "匿名邮箱",
    "安全邮箱",
    "一次性邮箱",
    "电子邮件地址",
  ],
  appleWebApp: {
    title: "临时邮箱",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        {!!process.env.VERCEL && <Analytics />}
        <Clarity />
        <Umami />
      </body>
    </html>
  );
}
