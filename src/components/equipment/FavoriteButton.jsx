// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { FaHeart, FaRegHeart } from "react-icons/fa6";
// import { apiFetch } from "@/lib/api";


// export default function FavoriteButton({ equipmentId }) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [checking, setChecking] = useState(true);
//   const [saving, setSaving] = useState(false);

 
//   useEffect(() => {
//     let cancelled = false;
//     setChecking(true);

//     apiFetch(`/api/favorites/check/${equipmentId}`, { auth: true })
//       .then((result) => {
//         if (!cancelled) setIsFavorite(result.isFavorite);
//       })
//       .catch(() => {

//       })
//       .finally(() => {
//         if (!cancelled) setChecking(false);
//       });

//     return () => {
//       cancelled = true;
//     };
//   }, [equipmentId]);

//   const handleToggle = async () => {
//     setSaving(true);
//     try {
//       if (isFavorite) {
//         await apiFetch(`/api/favorites/${equipmentId}`, { method: "DELETE", auth: true });
//         setIsFavorite(false);
//         toast.success("Removed from favorites");
//       } else {
//         await apiFetch("/api/favorites", { method: "POST", auth: true, body: { equipmentId } });
//         setIsFavorite(true);
//         toast.success("Added to favorites");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleToggle}
//       disabled={checking || saving}
//       className={`btn ${isFavorite ? "btn-error btn-soft" : "btn-outline"}`}
//       aria-pressed={isFavorite}
//     >
//       {saving ? (
//         <span className="loading loading-spinner loading-xs" />
//       ) : isFavorite ? (
//         <FaHeart className="text-error" />
//       ) : (
//         <FaRegHeart />
//       )}
//       {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//     </button>
//   );
// }



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
        if (!cancelled) setIsFavorite(Boolean(result?.isFavorite));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [equipmentId]);

  const handleToggle = async () => {
    if (checking || saving) return;
    setSaving(true);

    try {
      if (isFavorite) {
        await apiFetch(`/api/favorites/${equipmentId}`, {
          method: "DELETE",
          auth: true,
        });
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await apiFetch("/api/favorites", {
          method: "POST",
          auth: true,
          body: { equipmentId },
        });
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const isDisabled = checking || saving;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isDisabled}
      aria-pressed={isFavorite}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${
        isFavorite
          ? "border-rose-500/30 bg-rose-500/10 text-rose-600 shadow-sm shadow-rose-500/5 hover:border-rose-500/50 hover:bg-rose-500/15 dark:text-rose-400"
          : "border-base-300 bg-base-100 text-base-content/85 shadow-sm hover:border-rose-500/40 hover:bg-rose-500/5 hover:text-rose-600 dark:hover:text-rose-400"
      }`}
    >
      <span className="flex h-4 w-4 items-center justify-center">
        {saving ? (
          <span className="loading loading-spinner loading-xs" aria-hidden="true" />
        ) : isFavorite ? (
          <FaHeart
            className="h-4 w-4 text-rose-500 transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          />
        ) : (
          <FaRegHeart
            className="h-4 w-4 text-base-content/60 transition-all duration-200 group-hover:scale-110 group-hover:text-rose-500"
            aria-hidden="true"
          />
        )}
      </span>

      <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
    </button>
  );
}