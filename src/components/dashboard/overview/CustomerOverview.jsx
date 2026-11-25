"use client";

import Link from "next/link";
import { FiCalendar, FiCheckCircle, FiDollarSign, FiHeart, FiShoppingBag } from "react-icons/fi";
import { PageHeader, StatCard } from "@/components/dashboard/DashboardUI";
import { ChartCard, SimpleBarChart } from "@/components/dashboard/Charts";
import { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/format";


export default function CustomerOverview() {
  const { data, loading, error, refetch } = useApi("/api/analytics/customer", { auth: true });

  if (loading) return <SectionLoader message="Loading your overview..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const { totals, monthly } = data;

  return (
    <>
      <PageHeader title="My Overview" subtitle="A quick look at your rentals and spending.">
        <Link href="/equipment" className="btn btn-primary">Rent Equipment</Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Rentals" value={totals.totalRentals} icon={FiShoppingBag} tone="primary" />
        <StatCard label="Active Rentals" value={totals.activeRentals} icon={FiCalendar} tone="info" />
        <StatCard label="Completed Rentals" value={totals.completedRentals} icon={FiCheckCircle} tone="success" />
        <StatCard label="Favorites" value={totals.favorites} icon={FiHeart} tone="secondary" />
        <StatCard label="Total Spent" value={formatCurrency(totals.totalSpent)} icon={FiDollarSign} tone="accent" />
      </div>

      <div className="mt-6">
        <ChartCard title="Monthly Spending" subtitle="What you paid in the last 6 months">
          <SimpleBarChart data={monthly} xKey="month" yKey="spent" money label="Spent" />
        </ChartCard>
      </div>
    </>
  );
}
