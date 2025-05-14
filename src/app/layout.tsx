import React from "react";
import "./globals.css";
import Providers from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-muted">
        <Providers session={session}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
