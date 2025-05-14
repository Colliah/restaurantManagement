"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ComponentType } from "react";

export function withClientAuth<T extends object>(Component: ComponentType<T>) {
  return function ProtectedRoute(props: T) {
    const { status, data: session } = useSession();

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (status === "unauthenticated") {
      redirect("/sign-in");
    }

    return <Component {...props} session={session} />;
  };
}
