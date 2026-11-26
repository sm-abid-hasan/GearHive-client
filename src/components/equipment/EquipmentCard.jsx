


"use client";

import Link from "next/link";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, rentalUnit } from "@/lib/format";

export default function EquipmentCard({ equipment }) {
  const { user, isLoading } = useAuth();

  const detailsPath = `/equipment/${equipment._id}`;
  const href =
    !isLoading && !user
      ? `/login?redirect=${encodeURIComponent(detailsPath)}`
      : detailsPath;

  const isAvailable = equipment.availableQuantity > 0;

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
     
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-200">
        <SafeImage
          src={equipment.image}
          alt={equipment.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />


        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
        />

     
        <span className="badge badge-neutral absolute top-3.5 left-3.5 max-w-[65%] truncate rounded-full px-3 py-2.5 text-xs font-semibold shadow-sm backdrop-blur-sm">
          {equipment.category}
        </span>

  
        <span
          className={`badge absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold shadow-sm ${
            isAvailable ? "badge-success" : "badge-error"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${
              isAvailable ? "bg-success-content" : "bg-error-content"
            }`}
          />
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>


      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className="line-clamp-1 text-lg font-bold tracking-tight text-base-content transition-colors duration-200 group-hover:text-primary"
          title={equipment.name}
        >
          {equipment.name}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-base-content/70">
          <FiMapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{equipment.location}</span>
        </p>

  
        <div className="mt-4 flex items-baseline justify-between gap-2 rounded-2xl border border-base-300/60 bg-base-200/60 px-3.5 py-2.5">
          <p className="min-w-0 truncate">
            <span className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
              {formatCurrency(equipment.price)}
            </span>
            <span className="ml-1 text-xs font-medium text-base-content/70 sm:text-sm">
              / {rentalUnit(equipment.rentalType)}
            </span>
          </p>
          <span className="badge badge-outline shrink-0 rounded-full px-2.5 py-2 text-xs font-medium">
            {equipment.rentalType}
          </span>
        </div>


        <Link
          href={href}
          className="btn btn-primary mt-5 w-full rounded-xl font-semibold shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:shadow-primary/20"
        >
          <span>View Details</span>
          <FiArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export function EquipmentCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 shadow-sm"
      aria-hidden="true"
    >
      <div className="skeleton-block aspect-[4/3] w-full !rounded-none" />
      <div className="flex flex-1 flex-col justify-between space-y-4 p-5 sm:p-6">
        <div className="space-y-2.5">
          <div className="skeleton-block h-5 w-3/4 rounded-lg" />
          <div className="skeleton-block h-4 w-1/2 rounded-lg" />
        </div>
        <div className="skeleton-block h-12 w-full rounded-2xl" />
        <div className="skeleton-block h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}