"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import { useAuth } from "@/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { clearAccessToken } from "@/lib/api";
import { showSuccess } from "@/lib/alerts";
import { getSafeRedirect, isValidEmail } from "@/lib/validation";



export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getRedirect = () => getSafeRedirect(new URLSearchParams(window.location.search).get("redirect"), "/");


  useEffect(() => {
    if (!isLoading && user) router.replace(getRedirect());
  }, [isLoading, user, router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(form.email)) return toast.error("Please enter a valid email address.");
    if (!form.password) return toast.error("Please enter your password.");

    setSubmitting(true);
    clearAccessToken();
    try {
      const { error } = await authClient.signIn.email({ email: form.email.trim(), password: form.password });
      if (error) throw new Error(error.message || "Invalid email or password.");

      await showSuccess("Login successful!", "Welcome back to GearHive.");

      window.location.assign(getRedirect());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to book equipment or manage your dashboard.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

        <label className="block w-full">
          <span className="mb-1 block text-sm font-semibold">Password</span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              className="input input-bordered w-full pr-12"
              autoComplete="current-password"
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
        </label>

        <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
          {submitting && <span className="loading loading-spinner loading-sm" />}
          Login
        </button>
      </form>

      <div className="divider my-6 text-sm text-base-content/60">OR</div>
      <GoogleButton />

   

      <p className="mt-6 text-center text-base-content/70">
        New to GearHive?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">
          Register
        </Link>
      </p>
    </AuthShell>
  );
}
