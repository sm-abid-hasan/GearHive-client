"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel, TableWrap } from "@/components/dashboard/DashboardUI";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { formatCurrency, formatDate } from "@/lib/format";

export default function MyRentalsPage() {
  return (
    <RoleGuard allow={["customer"]}>
      <MyRentals />
    </RoleGuard>
  );
}

function MyRentals() {
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useApi(`/api/bookings/my?page=${page}&limit=8`, { auth: true });

  const rentals = data?.items || [];

  return (
    <>
      <PageHeader title="My Rentals" subtitle="Your complete booking history.">
        <Link href="/equipment" className="btn btn-primary">Rent More Equipment</Link>
      </PageHeader>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading your rentals..." />
      ) : rentals.length === 0 ? (
        <EmptyState
          icon={FiCalendar}
          title="No rentals yet"
          message="When you book equipment, your rentals will appear here."
          actionLabel="Browse equipment"
          actionHref="/equipment"
        />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipment Name</th>
                <th>Rental Start Date</th>
                <th>Rental End Date</th>
                <th>Booking Date</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental, index) => (
                <tr key={rental._id}>
                  <td>{(data.page - 1) * data.limit + index + 1}</td>
                  <td className="font-semibold">{rental.equipmentName}</td>
                  <td className="whitespace-nowrap">{formatDate(rental.startDate)}</td>
                  <td className="whitespace-nowrap">{formatDate(rental.endDate)}</td>
                  <td className="whitespace-nowrap">{formatDate(rental.createdAt)}</td>
                  <td className="font-bold">{formatCurrency(rental.totalAmount)}</td>
                  <td><StatusBadge status={rental.paymentStatus} /></td>
                  <td><StatusBadge status={rental.bookingStatus} /></td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      )}

      <Pagination page={data?.page || page} totalPages={data?.totalPages || 1} onPageChange={setPage} />
    </>
  );
}
