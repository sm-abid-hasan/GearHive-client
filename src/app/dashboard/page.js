"use client";

import AdminOverview from "@/components/dashboard/overview/AdminOverview";
import CustomerOverview from "@/components/dashboard/overview/CustomerOverview";
import OwnerOverview from "@/components/dashboard/overview/OwnerOverview";
import { useAuth } from "@/hooks/useAuth";


export default function DashboardHomePage() {
  const { role } = useAuth();

  if (role === "admin") return <AdminOverview />;
  if (role === "owner") return <OwnerOverview />;
  return <CustomerOverview />;
}
