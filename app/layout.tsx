import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
