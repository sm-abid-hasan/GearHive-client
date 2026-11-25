"use client";

import { FiBox, FiCheckCircle, FiClock, FiDollarSign, FiShoppingBag, FiUsers } from "react-icons/fi";
import { PageHeader, StatCard } from "@/components/dashboard/DashboardUI";
import { ChartCard, CHART_COLORS, SimpleAreaChart, SimpleBarChart, SimplePieChart } from "@/components/dashboard/Charts";
import { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/format";


export default function AdminOverview() {
  const { data, loading, error, refetch } = useApi("/api/analytics/admin", { auth: true });

  if (loading) return <SectionLoader message="Loading platform analytics..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  const { totals, monthly, usersByRole, equipmentByStatus } = data;

  return (
    <>
      <PageHeader title="Admin Overview" subtitle="Monitor the performance of the whole platform." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Users" value={totals.totalUsers} icon={FiUsers} tone="primary" />
        <StatCard label="Total Equipment" value={totals.totalEquipment} icon={FiBox} tone="info" />
        <StatCard label="Total Bookings" value={totals.totalBookings} icon={FiShoppingBag} tone="secondary" />
        <StatCard label="Pending Approvals" value={totals.pendingApprovals} icon={FiClock} tone="warning" />
        <StatCard label="Completed Rentals" value={totals.completedRentals} icon={FiCheckCircle} tone="success" />
        <StatCard label="Total Revenue" value={formatCurrency(totals.totalRevenue)} icon={FiDollarSign} tone="accent" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Monthly Bookings" subtitle="Bookings in the last 6 months">
          <SimpleBarChart data={monthly} xKey="month" yKey="bookings" label="Bookings" />
        </ChartCard>
        <ChartCard title="Monthly Revenue" subtitle="Payments received in the last 6 months">
          <SimpleAreaChart data={monthly} xKey="month" yKey="revenue" money label="Revenue" color={CHART_COLORS.accent} />
        </ChartCard>
        <ChartCard title="Users by Role" isEmpty={usersByRole.length === 0}>
          <SimplePieChart data={usersByRole} />
        </ChartCard>
        <ChartCard title="Equipment by Status" isEmpty={equipmentByStatus.length === 0}>
          <SimplePieChart data={equipmentByStatus} />
        </ChartCard>
      </div>
    </>
  );
}
