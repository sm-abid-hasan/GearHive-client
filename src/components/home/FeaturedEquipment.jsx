"use client";

import Link from "next/link";
import { FiPackage } from "react-icons/fi";
import EquipmentCard, { EquipmentCardSkeleton } from "@/components/equipment/EquipmentCard";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { useApi } from "@/hooks/useApi";


export default function FeaturedEquipment() {
  const { data, loading, error, refetch } = useApi("/api/equipment/featured");

  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          eyebrow="Featured Equipments"
         
        />

        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EquipmentCardSkeleton key={index} />
            ))}
          </div>
        ) : data?.length ? (
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
              <StaggerItem key={item._id} className="h-full">
                <EquipmentCard equipment={item} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        ) : (
          <EmptyState icon={FiPackage} title="No equipment yet" message="Approved equipment will appear here." />
        )}

        <FadeIn className="mt-10 text-center">
          <Link href="/equipment" className="btn btn-outline btn-lg">
            View All Equipment
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
