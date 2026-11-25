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

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function AllEquipmentAdminPage() {
  return (
    <RoleGuard allow={["admin"]}>
      <AllEquipmentAdmin />
    </RoleGuard>
  );
}

function AllEquipmentAdmin() {
  const { data, loading, error, refetch } = useApi("/api/admin/equipment", { auth: true });
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  const items = (data || []).filter((item) => filter === "all" || item.status === filter);

  const handleStatus = async (item, status) => {
    setBusyId(item._id);
    try {
      await apiFetch(`/api/admin/equipment/${item._id}/status`, { method: "PATCH", auth: true, body: { status } });
      toast.success(status === "approved" ? "Equipment approved" : "Equipment rejected");
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = await confirmAction({
      title: "Delete this equipment?",
      text: `"${item.name}" will be removed permanently.`,
      confirmText: "Yes, delete",
    });
    if (!confirmed) return;

    setBusyId(item._id);
    try {
      await apiFetch(`/api/equipment/${item._id}`, { method: "DELETE", auth: true });
      toast.success("Equipment deleted");
      refetch();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <PageHeader title="All Equipment" subtitle="Approve, reject, update or delete any equipment." />

      <div role="tablist" className="tabs tabs-box mb-6 w-fit max-w-full overflow-x-auto">
        {FILTERS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={filter === name}
            className={`tab capitalize ${filter === name ? "tab-active" : ""}`}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : loading ? (
        <SectionLoader message="Loading equipment..." />
      ) : items.length === 0 ? (
        <EmptyState icon={FiBox} title="No equipment found" message="Nothing matches this filter." />
      ) : (
        <Panel>
          <TableWrap>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Owner</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const busy = busyId === item._id;
                return (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <SafeImage src={item.image} alt={item.name} className="h-12 w-16 rounded-lg object-cover" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <p className="font-semibold">{item.owner?.name}</p>
                      <p className="text-xs text-base-content/70">{item.owner?.email}</p>
                    </td>
                    <td>{item.category}</td>
                    <td className="whitespace-nowrap font-bold">
                      {formatCurrency(item.price)} <span className="font-normal text-base-content/60">/ {rentalUnit(item.rentalType)}</span>
                    </td>
                    <td>{item.availableQuantity}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td>
                      <div className="flex flex-wrap justify-end gap-2">
                        {item.status !== "approved" && (
                          <button type="button" className="btn btn-sm btn-success" onClick={() => handleStatus(item, "approved")} disabled={busy}>Approve</button>
                        )}
                        {item.status !== "rejected" && (
                          <button type="button" className="btn btn-sm btn-warning" onClick={() => handleStatus(item, "rejected")} disabled={busy}>Reject</button>
                        )}
                        <Link href={`/dashboard/edit-equipment/${item._id}`} className="btn btn-sm btn-primary">Update</Link>
                        <button type="button" className="btn btn-sm btn-error btn-outline" onClick={() => handleDelete(item)} disabled={busy}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </TableWrap>
        </Panel>
      )}
    </>
  );
}
