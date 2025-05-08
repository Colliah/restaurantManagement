"use client";
import React from "react";
import "./globals.css";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-muted">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
