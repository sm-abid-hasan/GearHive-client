"use client";

import Link from "next/link";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "@/hooks/useAuth";


export default function RoleGuard({ allow, children }) {
  return (
    <PrivateRoute>
      <RoleCheck allow={allow}>{children}</RoleCheck>
    </PrivateRoute>
  );
}

function RoleCheck({ allow, children }) {
  const { role } = useAuth();

  if (!allow.includes(role)) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center text-center">
        <p className="text-6xl font-extrabold text-error">403</p>
        <h2 className="mt-3 text-2xl font-bold">Access denied</h2>
        <p className="mt-2 text-base-content/70">
          Your account role (<strong className="capitalize">{role}</strong>) is not allowed to open this page.
        </p>
        <Link href="/dashboard" className="btn btn-primary mt-6">
          Go to my dashboard
        </Link>
      </div>
    );
  }

  return children;
}
