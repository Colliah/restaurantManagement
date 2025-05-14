"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

export const queryClient = new QueryClient();

const Providers = ({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
