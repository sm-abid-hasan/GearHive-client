"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FiList, FiRefreshCw } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel, TableWrap } from "@/components/dashboard/DashboardUI";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { apiFetch } from "@/lib/api";
import { confirmAction } from "@/lib/alerts";
import { formatCurrency, formatDate } from "@/lib/format";

export default function AllRentalsPage() {
  return (
    <RoleGuard allow={["admin"]}>
      <AllRentals />
    </RoleGuard>
  );
}

function AllRentals() {
  const { data, loading, error, refetch } = useApi("/api/admin/rentals", { auth: true });
  const [busyId, setBusyId] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const handleStatusChange = async (rental, status) => {
    if (status === rental.bookingStatus) return;
    const confirmed = await confirmAction({
      title: "Change booking status?",
      text: `${rental.equipmentName} will be marked as ${status}.`,
      confirmText: "Yes, change",
    });
    if (!confirmed) return;

    setBusyId(rental._id);
    try {
      await apiFetch(`/api/admin/rentals/${rental._id}/status`, { method: "PATCH", auth: true, body: { status } });
      toast.success("Booking status updated");
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };


  const handleSync = async () => {
    setSyncing(true);
    try {
      const result = await apiFetch("/api/admin/rentals/sync", { method: "POST", auth: true });
      toast.success(result.message);
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <>
      <PageHeader title="All Rentals" subtitle="Monitor and manage every rental on the platform.">
        <button type="button" className="btn btn-outline" onClick={handleSync} disabled={syncing}>
          {syncing ? <span className="loading loading-spinner loading-xs" /> : <FiRefreshCw />}
          Update finished rentals
        </button>
      </PageHeader>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading rentals..." />
      ) : !data || data.length === 0 ? (
        <EmptyState icon={FiList} title="No rentals yet" message="Paid bookings will appear here." />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Owner</th>
                <th>Equipment</th>
                <th>Rental Duration</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((rental) => (
                <tr key={rental._id}>
                  <td>
                    <p className="font-semibold">{rental.customerName}</p>
                    <p className="text-xs text-base-content/70">{rental.customerEmail}</p>
                  </td>
                  <td>
                    <p className="font-semibold">{rental.ownerName}</p>
                    <p className="text-xs text-base-content/70">{rental.ownerEmail}</p>
                  </td>
                  <td className="font-semibold">{rental.equipmentName}</td>
                  <td className="whitespace-nowrap">
                    {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                    <p className="text-xs text-base-content/70">{rental.totalDays} day(s), qty {rental.quantity}</p>
                  </td>
                  <td className="font-bold">{formatCurrency(rental.totalAmount)}</td>
                  <td><StatusBadge status={rental.paymentStatus} /></td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={rental.bookingStatus}
                      onChange={(event) => handleStatusChange(rental, event.target.value)}
                      disabled={busyId === rental._id}
                      aria-label={`Status of ${rental.equipmentName}`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      )}
    </>
  );
}
