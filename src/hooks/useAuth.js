"use client";

import { authClient } from "@/lib/auth-client";


export function useAuth() {
  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user || null;

  return {
    user,
    role: user?.role || "customer",
    isLoading: isPending,
    refetchSession: refetch,
  };
}
