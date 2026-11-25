"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { clearAccessToken } from "@/lib/api";
import { getSafeRedirect } from "@/lib/validation";


export default function GoogleButton({ label = "Continue with Google" }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    clearAccessToken();
    try {
      const redirect = getSafeRedirect(new URLSearchParams(window.location.search).get("redirect"), "/");
      const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
      if (error) throw new Error(error.message);
      // On success the browser leaves for Google, so nothing else to do here.
    } catch (error) {
      toast.error(error.message || "Google login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleClick} disabled={loading} className="btn btn-outline w-full">
      {loading ? <span className="loading loading-spinner loading-sm" /> : <FcGoogle className="text-xl" />}
      {label}
    </button>
  );
}
