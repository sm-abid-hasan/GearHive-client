"use client";

import EquipmentCard, { EquipmentCardSkeleton } from "@/components/equipment/EquipmentCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ErrorState } from "@/components/ui/EmptyState";
import { StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { useApi } from "@/hooks/useApi";


export default function RecentlyAdded() {
  const { data, loading, error, refetch } = useApi("/api/equipment/recent?limit=4");


  if (!loading && !error && (!data || data.length === 0)) return null;

  return (
    <section className="section-padding bg-base-200">
      <div className="container-page">
        <SectionHeading
          eyebrow="Recently Added"
          title="Fresh listings from our owners"
          subtitle="Be the first to book the newest equipment on the platform."
        />

        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <EquipmentCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((item) => (
              <StaggerItem key={item._id} className="h-full">
                <EquipmentCard equipment={item} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </section>
  );
}
