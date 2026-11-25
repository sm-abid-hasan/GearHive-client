"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";


export function useApi(path, { auth = false, enabled = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (!enabled || !path) return;

    let cancelled = false; // ignore the answer if the component was closed meanwhile
    setLoading(true);
    setError("");

    apiFetch(path, { auth })
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path, auth, enabled, reloadCount]);


  const refetch = useCallback(() => setReloadCount((count) => count + 1), []);

  return { data, loading, error, refetch, setData };
}
