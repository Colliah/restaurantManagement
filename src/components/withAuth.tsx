"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/api/use-auth";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
