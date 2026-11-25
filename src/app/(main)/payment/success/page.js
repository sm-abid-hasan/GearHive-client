"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageLoader } from "@/components/ui/Loader";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";

export default function PaymentSuccessPage() {
  return (
    <RoleGuard allow={["customer"]}>
      <Suspense fallback={<PageLoader message="Loading..." />}>
        <PaymentSuccess />
      </Suspense>
    </RoleGuard>
  );
}

function PaymentSuccess() {
  const sessionId = useSearchParams().get("session_id");
  const [state, setState] = useState({ status: "confirming", booking: null, message: "" });

  
  useEffect(() => {
    if (!sessionId) {
      setState({ status: "error", booking: null, message: "Payment session was not found in the link." });
      return;
    }

    let cancelled = false;
    apiFetch("/api/payments/confirm", { method: "POST", auth: true, body: { sessionId } })
      .then((result) => !cancelled && setState({ status: "success", booking: result.booking, message: "" }))
      .catch((error) => !cancelled && setState({ status: "error", booking: null, message: error.message }));

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  if (state.status === "confirming") return <PageLoader message="Confirming your payment..." />;

  if (state.status === "error") {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <FiAlertCircle className="text-6xl text-error" />
        <h1 className="section-title mt-4">We could not confirm the payment</h1>
        <p className="section-subtitle">{state.message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard/my-rentals" className="btn btn-primary">Check My Rentals</Link>
          <Link href="/contact" className="btn btn-outline">Contact support</Link>
        </div>
      </section>
    );
  }

  const { booking } = state;

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <FiCheckCircle className="text-7xl text-success" />
      <h1 className="section-title mt-4">Payment successful!</h1>
      <p className="section-subtitle">Your rental is confirmed. The owner has been notified.</p>

      <div className="mt-8 w-full max-w-md rounded-2xl border border-base-300 p-6 text-left">
        <p className="text-lg font-bold">{booking.equipmentName}</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-base-content/70">Rental period</dt><dd className="font-semibold">{formatDate(booking.startDate)} – {formatDate(booking.endDate)}</dd></div>
          <div className="flex justify-between"><dt className="text-base-content/70">Quantity</dt><dd className="font-semibold">{booking.quantity}</dd></div>
          <div className="flex justify-between"><dt className="text-base-content/70">Amount paid</dt><dd className="font-semibold text-primary">{formatCurrency(booking.totalAmount)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="shrink-0 text-base-content/70">Transaction ID</dt><dd className="break-all font-mono text-xs">{booking.transactionId}</dd></div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/dashboard/my-rentals" className="btn btn-primary">View My Rentals</Link>
        <Link href="/equipment" className="btn btn-outline">Rent more equipment</Link>
      </div>
    </section>
  );
}
