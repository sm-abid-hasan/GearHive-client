

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiUpload } from "react-icons/fi";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { clearAccessToken } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import { showSuccess } from "@/lib/alerts";
import {
  getPasswordProblem,
  getSafeRedirect,
  isValidEmail,
  isValidUrl,
} from "@/lib/validation";

export default function RegisterPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
    role: "customer", 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    if (!isLoading && user) router.replace("/");
  }, [isLoading, user, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "password") {
      setPasswordError(
        getPasswordProblem(value) && value ? getPasswordProblem(value) : "",
      );
    }
  };


  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((current) => ({ ...current, photo: url }));
      toast.success("Photo uploaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      event.target.value = ""; 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const photo = form.photo.trim();
    const role = form.role === "owner" ? "owner" : "customer";

    if (name.length < 2) return toast.error("Please enter your full name.");
    if (!isValidEmail(email))
      return toast.error("Please enter a valid email address.");
    if (photo && !isValidUrl(photo)) {
      return toast.error(
        "Photo must be a direct image link (starting with https://).",
      );
    }

    const problem = getPasswordProblem(form.password);
    if (problem) {
      setPasswordError(problem);
      return toast.error(problem);
    }

    setSubmitting(true);
    clearAccessToken();
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password: form.password,
        image: photo || undefined,
        role,
      });

      if (error) throw new Error(error.message || "Registration failed.");

      await showSuccess(
        "Registration successful!",
        role === "owner"
          ? `Welcome to GearHive, ${name}. Your Owner account is ready—you can now post equipment for rent.`
          : `Welcome to GearHive, ${name}. Your User account is ready—you can now rent equipment.`,
      );
      const redirect = getSafeRedirect(
        new URLSearchParams(window.location.search).get("redirect"),
        "/",
      );
     
      window.location.assign(redirect);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Register to rent equipment or list your own."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">
            Account type
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setForm((current) => ({ ...current, role: "customer" }))
              }
              className={`rounded-xl border p-3 text-left transition ${
                form.role === "customer"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-base-300 hover:border-base-content/30"
              }`}
            >
              <div className="text-sm font-bold">User</div>
              <div className="text-xs text-base-content/70">Rent equipment</div>
            </button>

            <button
              type="button"
              onClick={() =>
                setForm((current) => ({ ...current, role: "owner" }))
              }
              className={`rounded-xl border p-3 text-left transition ${
                form.role === "owner"
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-base-300 hover:border-base-content/30"
              }`}
            >
              <div className="text-sm font-bold">Owner</div>
              <div className="text-xs text-base-content/70">
                Post items for rent
              </div>
            </button>
          </div>
        </div>

        <label className="block w-full">
          <span className="mb-1 block text-sm font-semibold">Full name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input input-bordered w-full"
            autoComplete="name"
            required
          />
        </label>

        <label className="block w-full">
          <span className="mb-1 block text-sm font-semibold">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="input input-bordered w-full"
            autoComplete="email"
            required
          />
        </label>

        <div>
          <span className="mb-1 block text-sm font-semibold">
            Photo{" "}
            <span className="font-normal text-base-content/60">
              (optional – paste a direct image link or upload)
            </span>
          </span>
          <div className="flex items-center gap-3">
          
            <input
              type="url"
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://i.ibb.co/..."
            
              className="input input-bordered w-full"
              aria-label="Photo link"
            />
          </div>
          <label className="btn btn-sm btn-ghost mt-2 cursor-pointer">
            {uploading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <FiUpload />
            )}
            Upload with imgbb
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
              disabled={uploading}
            />
          </label>
        </div>

        <label className="block w-full">
          <span className="mb-1 block text-sm font-semibold">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={`input input-bordered w-full pr-12 ${passwordError ? "input-error" : ""}`}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-base-content/60"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {passwordError ? (
            <span className="mt-1 block text-sm text-error">
              {passwordError}
            </span>
          ) : (
            <span className="mt-1 block text-xs text-base-content/60">
              Must have an uppercase letter, a lowercase letter and at least 6
              characters.
            </span>
          )}
        </label>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={submitting || uploading}
        >
          {submitting && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {form.role === "owner" ? "Register as Owner" : "Register as User"}
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">OR</div>
      <GoogleButton label="Sign up with Google" />

      <p className="mt-6 text-center text-base-content/70">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}