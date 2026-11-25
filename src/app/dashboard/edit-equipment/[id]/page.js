"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel } from "@/components/dashboard/DashboardUI";
import EquipmentForm from "@/components/equipment/EquipmentForm";
import { ErrorState } from "@/components/ui/EmptyState";
import { SectionLoader } from "@/components/ui/Loader";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { showSuccess } from "@/lib/alerts";


export default function EditEquipmentPage() {
  return (
    <RoleGuard allow={["owner", "admin"]}>
      <EditEquipment />
    </RoleGuard>
  );
}

function EditEquipment() {
  const { id } = useParams();
  const router = useRouter();
  const { role } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const { data: equipment, loading, error, refetch } = useApi(`/api/equipment/${id}`, { auth: true });

  const backPath = role === "admin" ? "/dashboard/all-equipment" : "/dashboard/my-equipment";

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await apiFetch(`/api/equipment/${id}`, { method: "PUT", auth: true, body: values });
      await showSuccess("Equipment updated!");
      router.push(backPath);
    } catch (err) {
      toast.error(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <SectionLoader message="Loading equipment..." />;
  if (error || !equipment) return <ErrorState message={error || "Equipment not found."} onRetry={refetch} />;

  return (
    <>
      <PageHeader title="Update Equipment" subtitle={equipment.name}>
        <Link href={backPath} className="btn btn-outline">Cancel</Link>
      </PageHeader>
      <Panel className="p-5 sm:p-8">
        <EquipmentForm
          initialValues={equipment}
          owner={equipment.owner}
          status={equipment.status}
          submitLabel="Save Changes"
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      </Panel>
    </>
  );
}
