import type { Metadata, Viewport } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Temporary mail",
  description: "Temporary mail",
  appleWebApp: {
    title: "Temporary mail",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
