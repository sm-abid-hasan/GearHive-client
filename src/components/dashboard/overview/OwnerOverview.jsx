"use client";

import { FiBox, FiCheckCircle, FiClock, FiDollarSign, FiShoppingBag, FiThumbsUp } from "react-icons/fi";
import { PageHeader, StatCard } from "@/components/dashboard/DashboardUI";
import { ChartCard, CHART_COLORS, SimpleAreaChart, SimpleBarChart } from "@/components/dashboard/Charts";
import { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/format";


export default function OwnerOverview() {
  const { data, loading, error, refetch } = useApi("/api/analytics/owner", { auth: true });

  if (loading) return <SectionLoader message="Loading your analytics..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const { totals, monthly } = data;

  return (
    <>
      <PageHeader title="Owner Overview" subtitle="Track the performance of your rental business." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Listed Equipment" value={totals.totalListed} icon={FiBox} tone="primary" />
        <StatCard label="Approved Equipment" value={totals.approvedEquipment} icon={FiThumbsUp} tone="info" />
        <StatCard label="Pending Approval" value={totals.pendingEquipment} icon={FiClock} tone="warning" />
        <StatCard label="Total Bookings" value={totals.totalBookings} icon={FiShoppingBag} tone="secondary" />
        <StatCard label="Completed Rentals" value={totals.completedRentals} icon={FiCheckCircle} tone="success" />
        <StatCard label="Total Earnings" value={formatCurrency(totals.totalEarnings)} icon={FiDollarSign} tone="accent" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Monthly Earnings" subtitle="Money earned in the last 6 months">
          <SimpleAreaChart data={monthly} xKey="month" yKey="earnings" money label="Earnings" color={CHART_COLORS.accent} />
        </ChartCard>
        <ChartCard title="Monthly Bookings" subtitle="Bookings of your equipment in the last 6 months">
          <SimpleBarChart data={monthly} xKey="month" yKey="bookings" label="Bookings" />
        </ChartCard>
      </div>
    </>
  );
}
