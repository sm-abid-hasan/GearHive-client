"use client";

import { FiTruck } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel, TableWrap } from "@/components/dashboard/DashboardUI";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import SafeImage from "@/components/ui/SafeImage";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { formatCurrency, formatDate } from "@/lib/format";

export default function MyEquipmentRentalPage() {
  return (
    <RoleGuard allow={["owner"]}>
      <MyEquipmentRental />
    </RoleGuard>
  );
}


function MyEquipmentRental() {
  const { data, loading, error, refetch } = useApi("/api/owner/rentals", { auth: true });

  return (
    <>
      <PageHeader title="My Equipment Rental" subtitle="Customers who rented your equipment." />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading rentals..." />
      ) : !data || data.length === 0 ? (
        <EmptyState icon={FiTruck} title="No rentals yet" message="When a customer books your equipment, it will appear here." />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Equipment</th>
                <th>Rental Duration</th>
                <th>Quantity</th>
                <th>Booking Amount</th>
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
                    <p className="text-xs text-base-content/70">{rental.contactNumber}</p>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <SafeImage src={rental.equipmentImage} alt={rental.equipmentName} className="h-12 w-16 rounded-lg object-cover" />
                      <span className="font-semibold">{rental.equipmentName}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
                    <p className="text-xs text-base-content/70">{rental.totalDays} day(s)</p>
                  </td>
                  <td>{rental.quantity}</td>
                  <td className="font-bold">{formatCurrency(rental.totalAmount)}</td>
                  <td><StatusBadge status={rental.paymentStatus} /></td>
                  <td><StatusBadge status={rental.bookingStatus} /></td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      )}
    </>
  );
}
