"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { PageHeader, Panel } from "@/components/dashboard/DashboardUI";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { uploadToImgbb } from "@/lib/imgbb";
import { showSuccess } from "@/lib/alerts";
import { isValidUrl } from "@/lib/validation";


export default function ProfilePage() {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
}

function Profile() {
  const { user, role, refetchSession } = useAuth();
  const [form, setForm] = useState({ name: "", image: "", phone: "", address: "" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        image: user.image || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((current) => ({ ...current, image: url }));
      toast.success("Photo uploaded. Press “Save changes” to keep it.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.name.trim().length < 2) return toast.error("Please enter your name.");
    if (form.image.trim() && !isValidUrl(form.image.trim())) return toast.error("Profile image must be a direct image link.");
    if (form.phone.trim() && !/^\+?[0-9\s-]{7,20}$/.test(form.phone.trim())) return toast.error("Please enter a valid phone number.");

    setSaving(true);
    try {
      const { error } = await authClient.updateUser({
        name: form.name.trim(),
        image: form.image.trim() || null,
        phone: form.phone.trim(),
        address: form.address.trim(),
      });
      if (error) throw new Error(error.message || "Could not update your profile.");

      refetchSession();
      await showSuccess("Profile updated!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <PageHeader title={role === "customer" ? "Profile" : "My Profile"} subtitle="View and update your personal information." />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Summary card */}
        <Panel className="flex flex-col items-center p-8 text-center">
          <Avatar src={form.image} name={form.name || user.name} size={112} />
          <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
          <p className="break-all text-base-content/70">{user.email}</p>
          <div className="mt-3"><StatusBadge status={role} /></div>
        </Panel>

        {/* Edit form */}
        <Panel title="Update information" className="xl:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 p-5" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Name</span>
                <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Email (can not be changed)</span>
                <input value={user.email} className="input input-bordered w-full" disabled readOnly />
              </label>
            </div>

            <div>
              <span className="mb-1 block text-sm font-semibold">Profile image (direct link or upload)</span>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://i.ibb.co/..."
                className="input input-bordered w-full"
              />
              <label className="btn btn-sm btn-ghost mt-2 cursor-pointer">
                {uploading ? <span className="loading loading-spinner loading-xs" /> : <FiUpload />}
                Upload with imgbb
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Phone number</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+880 1XXX XXXXXX"
                className="input input-bordered w-full"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Address</span>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="House, road, area, city"
                className="textarea textarea-bordered w-full"
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={saving || uploading}>
              {saving && <span className="loading loading-spinner loading-sm" />}
              Save changes
            </button>
          </form>
        </Panel>
      </div>
    </>
  );
}
