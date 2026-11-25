"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import SafeImage from "@/components/ui/SafeImage";
import { StaggerGrid, StaggerItem } from "@/components/motion/Reveal";
import { useApi } from "@/hooks/useApi";
import { CATEGORIES } from "@/lib/constants";


export default function Categories() {

  const { data: counts } = useApi("/api/equipment/categories");

  const countOf = (name) => counts?.find((row) => row.category === name)?.count;

  return (
    <section className="section-padding bg-base-200">
      <div className="container-page">
        <SectionHeading
          eyebrow="Categories"
          title="Explore popular categories"
          subtitle="Whatever your project needs, you will find it in one of these categories."
        />

        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const count = countOf(category.name);
            return (
              <StaggerItem key={category.name} className="h-full">
                <Link
                  href={`/equipment?category=${encodeURIComponent(category.name)}`}
                  className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 p-5">
                    <div>
                      <h3 className="text-lg font-bold">{category.name}</h3>
                      <p className="mt-1 text-sm text-base-content/70">{category.description}</p>
                    </div>
                    {typeof count === "number" && (
                      <span className="badge badge-primary badge-soft shrink-0 font-bold">{count} items</span>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
