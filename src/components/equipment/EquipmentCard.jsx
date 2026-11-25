"use client";

import Link from "next/link";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, rentalUnit } from "@/lib/format";


export default function EquipmentCard({ equipment }) {
  const { user, isLoading } = useAuth();

  const detailsPath = `/equipment/${equipment._id}`;

  const href = !isLoading && !user ? `/login?redirect=${encodeURIComponent(detailsPath)}` : detailsPath;

  const isAvailable = equipment.availableQuantity > 0;

  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-200">
        <SafeImage src={equipment.image} alt={equipment.name} className="h-full w-full object-cover" />
        <span className="badge badge-neutral absolute left-3 top-3 max-w-[70%] truncate font-semibold">
          {equipment.category}
        </span>
        <span className={`badge absolute right-3 top-3 font-semibold ${isAvailable ? "badge-success" : "badge-error"}`}>
          {isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-bold" title={equipment.name}>
          {equipment.name}
        </h3>

        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-base-content/70">
          <FiMapPin className="shrink-0 text-primary" /> <span className="truncate">{equipment.location}</span>
        </p>

        <div className="mt-4 flex items-end justify-between gap-2">
          <p>
            <span className="text-2xl font-extrabold text-primary">{formatCurrency(equipment.price)}</span>
            <span className="text-sm text-base-content/70"> / {rentalUnit(equipment.rentalType)}</span>
          </p>
          <span className="badge badge-outline">{equipment.rentalType}</span>
        </div>

        <Link href={href} className="btn btn-primary mt-5 w-full">
          View Details <FiArrowRight />
        </Link>
      </div>
    </article>
  );
}


export function EquipmentCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100" aria-hidden="true">
      <div className="skeleton-block aspect-[4/3] w-full !rounded-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton-block h-5 w-3/4" />
        <div className="skeleton-block h-4 w-1/2" />
        <div className="skeleton-block h-8 w-2/3" />
        <div className="skeleton-block h-12 w-full" />
      </div>
    </div>
  );
}
