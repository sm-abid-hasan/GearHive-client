"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiXCircle } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageLoader } from "@/components/ui/Loader";

export default function PaymentCancelPage() {
  return (
    <RoleGuard allow={["customer"]}>
      <Suspense fallback={<PageLoader message="Loading..." />}>
        <PaymentCancel />
      </Suspense>
    </RoleGuard>
  );
}

function PaymentCancel() {
  const bookingId = useSearchParams().get("booking_id");

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <FiXCircle className="text-7xl text-warning" />
      <h1 className="section-title mt-4">Payment cancelled</h1>
      <p className="section-subtitle">No money was taken. Your booking is saved for a short time, so you can try again.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {bookingId && (
          <Link href={`/payment/${bookingId}`} className="btn btn-primary">
            Try payment again
          </Link>
        )}
        <Link href="/equipment" className="btn btn-outline">Back to equipment</Link>
      </div>
    </section>
  );
}
