"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiBox } from "react-icons/fi";
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

export default function MyEquipmentPage() {
  return (
    <RoleGuard allow={["owner"]}>
      <MyEquipment />
    </RoleGuard>
  );
}

function MyEquipment() {
  const { data, loading, error, refetch } = useApi("/api/owner/equipment", { auth: true });
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (item) => {
    const confirmed = await confirmAction({
      title: "Delete this equipment?",
      text: `"${item.name}" will be removed permanently.`,
      confirmText: "Yes, delete",
    });
    if (!confirmed) return;

    setDeletingId(item._id);
    try {
      await apiFetch(`/api/equipment/${item._id}`, { method: "DELETE", auth: true });
      toast.success("Equipment deleted");
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <PageHeader title="My Equipment" subtitle="All equipment you added.">
        <Link href="/dashboard/add-equipment" className="btn btn-primary">Add Equipment</Link>
      </PageHeader>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading your equipment..." />
      ) : !data || data.length === 0 ? (
        <EmptyState
          icon={FiBox}
          title="You have not added equipment yet"
          message="Add your first item and start earning."
          actionLabel="Add Equipment"
          actionHref="/dashboard/add-equipment"
        />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
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
                  <td>{item.availableQuantity}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link href={`/equipment/${item._id}`} className="btn btn-sm btn-ghost">View</Link>
                      <Link href={`/dashboard/edit-equipment/${item._id}`} className="btn btn-sm btn-primary">Update</Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-error btn-outline"
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item._id}
                      >
                        {deletingId === item._id && <span className="loading loading-spinner loading-xs" />}
                        Delete
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
