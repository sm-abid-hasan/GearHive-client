"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel, TableWrap } from "@/components/dashboard/DashboardUI";
import EmptyState, { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import SafeImage from "@/components/ui/SafeImage";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { apiFetch } from "@/lib/api";
import { confirmAction } from "@/lib/alerts";
import { formatCurrency, rentalUnit } from "@/lib/format";

export default function FavoritesPage() {
  return (
    <RoleGuard allow={["customer"]}>
      <Favorites />
    </RoleGuard>
  );
}

function Favorites() {
  const { data, loading, error, refetch } = useApi("/api/favorites", { auth: true });
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (equipment) => {
    const confirmed = await confirmAction({
      title: "Remove from favorites?",
      text: equipment.name,
      confirmText: "Yes, remove",
    });
    if (!confirmed) return;

    setRemovingId(equipment._id);
    try {
      await apiFetch(`/api/favorites/${equipment._id}`, { method: "DELETE", auth: true });
      toast.success("Removed from favorites");
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <>
      <PageHeader title="My Favorites" subtitle="Equipment you saved for later." />

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading your favorites..." />
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="No favorites yet"
          message="Tap “Add to Favorites” on an equipment page to save it here."
          actionLabel="Browse equipment"
          actionHref="/equipment"
        />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Availability</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <SafeImage src={item.image} alt={item.name} className="h-12 w-16 rounded-lg object-cover" />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td className="whitespace-nowrap font-bold">
                    {formatCurrency(item.price)} <span className="font-normal text-base-content/60">/ {rentalUnit(item.rentalType)}</span>
                  </td>
                  <td>{item.location}</td>
                  <td><StatusBadge status={item.availableQuantity > 0 ? "available" : "unavailable"} /></td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link href={`/equipment/${item._id}`} className="btn btn-sm btn-primary">View Details</Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-error btn-outline"
                        onClick={() => handleRemove(item)}
                        disabled={removingId === item._id}
                      >
                        {removingId === item._id && <span className="loading loading-spinner loading-xs" />}
                        Remove Favorite
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableWrap>
        </Panel>
      )}
    </>
  );
}
