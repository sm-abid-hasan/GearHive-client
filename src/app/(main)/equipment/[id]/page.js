"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiMail, FiMapPin, FiPackage, FiPhone, FiTool } from "react-icons/fi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import BookingModal from "@/components/equipment/BookingModal";
import FavoriteButton from "@/components/equipment/FavoriteButton";
import Avatar from "@/components/ui/Avatar";
import SafeImage from "@/components/ui/SafeImage";
import StatusBadge from "@/components/ui/StatusBadge";
import { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, rentalUnit } from "@/lib/format";


export default function EquipmentDetailsPage() {
  return (
    <PrivateRoute>
      <EquipmentDetails />
    </PrivateRoute>
  );
}

function EquipmentDetails() {
  const { id } = useParams();
  const { user, role } = useAuth();
  const [bookingOpen, setBookingOpen] = useState(false);

  const { data: equipment, loading, error, refetch } = useApi(`/api/equipment/${id}`, { auth: true });

  if (loading) {
    return (
      <div className="container-page py-16">
        <SectionLoader message="Loading equipment details..." />
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="container-page py-16">
        <ErrorState message={error || "Equipment not found."} onRetry={refetch} />
        <Link href="/equipment" className="btn btn-outline mt-6">
          <FiArrowLeft /> Back to all equipment
        </Link>
      </div>
    );
  }

  const isAvailable = equipment.availableQuantity > 0 && equipment.status === "approved";
  const isCustomer = role === "customer";

  const facts = [
    { icon: FiPackage, label: "Available quantity", value: `${equipment.availableQuantity} unit(s)` },
    { icon: FiCalendar, label: "Rental type", value: equipment.rentalType },
    { icon: FiMapPin, label: "Location", value: equipment.location },
    { icon: FiTool, label: "Condition", value: equipment.condition },
  ];

  return (
    <section className="container-page py-10">
      <Link href="/equipment" className="mb-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
        <FiArrowLeft /> Back to all equipment
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* ---------- Image ---------- */}
        <div>
          <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200">
            <SafeImage
              src={equipment.image}
              alt={equipment.name}
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* ---------- Information ---------- */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge badge-neutral font-semibold">{equipment.category}</span>
            <span className={`badge font-semibold ${isAvailable ? "badge-success" : "badge-error"}`}>
              {isAvailable ? "Available" : "Unavailable"}
            </span>
            {equipment.status !== "approved" && <StatusBadge status={equipment.status} />}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{equipment.name}</h1>

          <p className="mt-4">
            <span className="text-4xl font-extrabold text-primary">{formatCurrency(equipment.price)}</span>
            <span className="text-lg text-base-content/70"> / {rentalUnit(equipment.rentalType)}</span>
          </p>

          <p className="mt-5 leading-relaxed text-base-content/80">{equipment.description}</p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-base-300 p-3.5">
                <Icon className="shrink-0 text-xl text-primary" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-base-content/60">{label}</dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-base-300 p-3.5 sm:col-span-2">
              <dt className="text-xs text-base-content/60">Brand &amp; model</dt>
              <dd className="font-bold">
                {equipment.brand} – {equipment.model}
              </dd>
            </div>
          </dl>

          {/* ---------- Actions ---------- */}
          <div className="mt-8 flex flex-wrap gap-3">
            {isCustomer ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={() => setBookingOpen(true)}
                  disabled={!isAvailable}
                >
                  {isAvailable ? "Book Now" : "Not Available"}
                </button>
                <FavoriteButton equipmentId={equipment._id} />
              </>
            ) : (
              <p className="rounded-xl bg-base-200 px-4 py-3 text-sm text-base-content/80">
                Booking and favorites are available for <strong>customer</strong> accounts only. You are logged in as{" "}
                <strong className="capitalize">{role}</strong>.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Owner + Terms ---------- */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-base-300 p-6">
          <h2 className="text-xl font-bold">Owner information</h2>
          <div className="mt-4 flex items-center gap-4">
            <Avatar src={equipment.owner?.image} name={equipment.owner?.name || "Owner"} size={56} />
            <div className="min-w-0">
              <p className="truncate text-lg font-bold">{equipment.owner?.name}</p>
              <p className="text-sm text-base-content/70">Verified equipment owner</p>
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2 break-all">
              <FiMail className="shrink-0 text-primary" /> {equipment.owner?.email}
            </li>
            {equipment.owner?.phone && (
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0 text-primary" /> {equipment.owner.phone}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-base-300 p-6 lg:col-span-2">
          <h2 className="text-xl font-bold">Rental terms and conditions</h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-base-content/80">{equipment.terms}</p>
        </div>
      </div>

      {bookingOpen && <BookingModal equipment={equipment} user={user} onClose={() => setBookingOpen(false)} />}
    </section>
  );
}
