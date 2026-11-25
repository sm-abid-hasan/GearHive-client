"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { apiFetch } from "@/lib/api";


export default function FavoriteButton({ equipmentId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);

 
  useEffect(() => {
    let cancelled = false;
    setChecking(true);

    apiFetch(`/api/favorites/check/${equipmentId}`, { auth: true })
      .then((result) => {
        if (!cancelled) setIsFavorite(result.isFavorite);
      })
      .catch(() => {

      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [equipmentId]);

  const handleToggle = async () => {
    setSaving(true);
    try {
      if (isFavorite) {
        await apiFetch(`/api/favorites/${equipmentId}`, { method: "DELETE", auth: true });
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await apiFetch("/api/favorites", { method: "POST", auth: true, body: { equipmentId } });
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={checking || saving}
      className={`btn ${isFavorite ? "btn-error btn-soft" : "btn-outline"}`}
      aria-pressed={isFavorite}
    >
      {saving ? (
        <span className="loading loading-spinner loading-xs" />
      ) : isFavorite ? (
        <FaHeart className="text-error" />
      ) : (
        <FaRegHeart />
      )}
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
