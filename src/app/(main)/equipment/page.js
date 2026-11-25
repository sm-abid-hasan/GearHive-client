"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiFilter, FiPackage, FiSearch, FiX } from "react-icons/fi";
import EquipmentCard, { EquipmentCardSkeleton } from "@/components/equipment/EquipmentCard";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { PageLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { buildQuery } from "@/lib/api";
import { CATEGORY_NAMES, PRICE_RANGES, RENTAL_TYPES, SORT_OPTIONS } from "@/lib/constants";

const PAGE_SIZE = 9; // 3 columns x 3 rows


export default function AllEquipmentPage() {
  return (
    <Suspense fallback={<PageLoader message="Loading equipment..." />}>
      <AllEquipment />
    </Suspense>
  );
}

function AllEquipment() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const rentalType = searchParams.get("rentalType") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const availability = searchParams.get("availability") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);

  const [searchText, setSearchText] = useState(q);


  useEffect(() => {
    setSearchText(q);
  }, [q]);


  const updateParams = (changes) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) params.delete(key);
      else params.set(key, String(value));
    });
    if (!("page" in changes)) params.delete("page");

    const text = params.toString();
    router.replace(text ? `${pathname}?${text}` : pathname, { scroll: false });
  };


  useEffect(() => {
    if (searchText.trim() === q) return;
    const timer = setTimeout(() => updateParams({ q: searchText.trim() }), 450);
    return () => clearTimeout(timer);

  }, [searchText]);


  const apiPath = `/api/equipment${buildQuery({
    q,
    category,
    rentalType,
    minPrice,
    maxPrice,
    availability,
    sort,
    page,
    limit: PAGE_SIZE,
  })}`;
  const { data, loading, error, refetch } = useApi(apiPath);

  const items = data?.items || [];
  const priceRangeIndex = PRICE_RANGES.findIndex((range) => range.min === minPrice && range.max === maxPrice);
  const hasFilters = Boolean(q || category || rentalType || minPrice || maxPrice || availability);

  const clearFilters = () => {
    setSearchText("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <>
      {/* Page title band */}
      <section className="bg-base-200">
        <div className="container-page py-12">
          <span className="section-eyebrow">All Equipment</span>
          <h1 className="section-title mt-2">Find the right equipment for your job</h1>
          <p className="section-subtitle">Search, filter and sort approved equipment from owners near you.</p>
        </div>
      </section>

      <section className="container-page py-10">
        {/* Search + Sort  */}
        <div className="flex flex-col gap-4 lg:flex-row">
          <label className="input input-bordered flex flex-1 items-center gap-2" role="search">
            <FiSearch className="text-base-content/60" aria-hidden="true" />
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by equipment name, location or category..."
              aria-label="Search equipment"
              className="grow"
            />
            {searchText && (
              <button type="button" onClick={() => setSearchText("")} aria-label="Clear search">
                <FiX />
              </button>
            )}
          </label>

          <select
            className="select select-bordered lg:w-60"
            value={sort}
            onChange={(event) => updateParams({ sort: event.target.value === "newest" ? "" : event.target.value })}
            aria-label="Sort equipment"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/*  Filters */}
        <div className="mt-4 rounded-2xl border border-base-300 bg-base-100 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold">
            <FiFilter className="text-primary" /> Filters
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(event) => updateParams({ category: event.target.value })}
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {CATEGORY_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              value={rentalType}
              onChange={(event) => updateParams({ rentalType: event.target.value })}
              aria-label="Filter by rental type"
            >
              <option value="">Any rental type</option>
              {RENTAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              value={priceRangeIndex === -1 ? 0 : priceRangeIndex}
              onChange={(event) => {
                const range = PRICE_RANGES[Number(event.target.value)];
                updateParams({ minPrice: range.min, maxPrice: range.max });
              }}
              aria-label="Filter by price range"
            >
              {PRICE_RANGES.map((range, index) => (
                <option key={range.label} value={index}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full"
              value={availability}
              onChange={(event) => updateParams({ availability: event.target.value })}
              aria-label="Filter by availability"
            >
              <option value="">Any availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <button type="button" className="btn btn-outline" onClick={clearFilters} disabled={!hasFilters}>
              <FiX /> Clear filters
            </button>
          </div>
        </div>

        {/*  Results */}
        <p className="mb-6 mt-8 text-sm font-semibold text-base-content/70" aria-live="polite">
          {loading ? "Searching..." : `${data?.total ?? 0} equipment item${data?.total === 1 ? "" : "s"} found`}
        </p>

        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <EquipmentCardSkeleton key={index} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={FiPackage}
            title="No equipment found"
            message="Try a different search or remove some filters."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <EquipmentCard key={item._id} equipment={item} />
            ))}
          </div>
        )}

        <Pagination
          page={data?.page || page}
          totalPages={data?.totalPages || 1}
          onPageChange={(newPage) => {
            updateParams({ page: newPage });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </section>
    </>
  );
}
