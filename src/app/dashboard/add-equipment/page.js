"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RoleGuard from "@/components/auth/RoleGuard";
import { PageHeader, Panel } from "@/components/dashboard/DashboardUI";
import EquipmentForm from "@/components/equipment/EquipmentForm";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { showSuccess } from "@/lib/alerts";

export default function AddEquipmentPage() {
  return (
    <RoleGuard allow={["owner"]}>
      <AddEquipment />
    </RoleGuard>
  );
}

function AddEquipment() {
  const router = useRouter();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
    
      await apiFetch("/api/equipment", { method: "POST", auth: true, body: values });
      await showSuccess("Equipment added!", "It will be visible to customers after admin approval.");
      router.push("/dashboard/my-equipment");
    } catch (error) {
      toast.error(error.message);
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Add Equipment" subtitle="List a new item for rent. An admin will review it before it goes live." />
      <Panel className="p-5 sm:p-8">
        <EquipmentForm owner={user} status="pending" submitLabel="Add Equipment" submitting={submitting} onSubmit={handleSubmit} />
      </Panel>
    </>
  );
}
