"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import SafeImage from "@/components/ui/SafeImage";
import { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";

export default function PaymentPage() {
  return (
    <RoleGuard allow={["customer"]}>
      <Payment />
    </RoleGuard>
  );
}

function Payment() {
  const { bookingId } = useParams();
  const { data: booking, loading, error, refetch } = useApi(`/api/bookings/${bookingId}`, { auth: true });
  const [redirecting, setRedirecting] = useState(false);


  const handlePay = async () => {
    setRedirecting(true);
    try {
      const result = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        auth: true,
        body: { bookingId },
      });
      window.location.href = result.url;
    } catch (err) {
      toast.error(err.message);
      setRedirecting(false);
    }
  };

  if (loading) {
    return (
      <div className="container-page py-16">
        <SectionLoader message="Loading your booking..." />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="container-page py-16">
        <ErrorState message={error || "Booking not found."} onRetry={refetch} />
      </div>
    );
  }

  const alreadyPaid = booking.paymentStatus === "paid";
  const unavailable = booking.bookingStatus !== "awaiting_payment";

  const rows = [
    ["Rental period", `${formatDate(booking.startDate)} – ${formatDate(booking.endDate)}`],
    ["Duration", `${booking.totalDays} day(s)`],
    ["Quantity", `${booking.quantity} unit(s)`],
    ["Price", `${formatCurrency(booking.unitPrice)} (${booking.rentalType})`],
    ["Delivery address", booking.deliveryAddress],
    ["Contact number", booking.contactNumber],
  ];

  return (
    <section className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <span className="section-eyebrow">Payment</span>
        <h1 className="section-title mt-2">Review and pay</h1>
        <p className="section-subtitle">Check your booking details, then pay securely with Stripe.</p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-base-300">
          <div className="flex items-center gap-4 bg-base-200 p-5">
            <SafeImage src={booking.equipmentImage} alt={booking.equipmentName} className="h-20 w-24 rounded-xl object-cover" />
            <div>
              <h2 className="text-xl font-bold">{booking.equipmentName}</h2>
              <p className="text-sm text-base-content/70">{booking.category}</p>
            </div>
          </div>

          <dl className="divide-y divide-base-300 px-5">
            {rows.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:justify-between sm:gap-6">
                <dt className="text-base-content/70">{label}</dt>
                <dd className="font-semibold sm:text-right">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center justify-between bg-primary/10 p-5">
            <span className="text-lg font-bold">Total amount</span>
            <span className="text-3xl font-extrabold text-primary">{formatCurrency(booking.totalAmount)}</span>
          </div>
        </div>

        {alreadyPaid || unavailable ? (
          <div role="alert" className="alert alert-info alert-soft mt-6">
            <span>This booking is {alreadyPaid ? "already paid" : "no longer waiting for payment"}.</span>
            <Link href="/dashboard/my-rentals" className="btn btn-sm btn-primary">
              Go to My Rentals
            </Link>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-base-content/70">
              <FiLock className="text-primary" /> You will be redirected to Stripe&apos;s secure checkout.
            </p>
            <button type="button" className="btn btn-primary btn-lg" onClick={handlePay} disabled={redirecting}>
              {redirecting && <span className="loading loading-spinner loading-sm" />}
              Pay {formatCurrency(booking.totalAmount)} with Stripe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
