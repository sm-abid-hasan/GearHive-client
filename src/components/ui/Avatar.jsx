"use client";

import { useEffect, useState } from "react";


export default function Avatar({ src, name = "?", size = 40, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const style = { width: size, height: size, fontSize: size * 0.42 };

  if (!src || failed) {
    return (
      <span
        style={style}
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-content ${className}`}
        aria-label={name}
      >
        {name.trim().charAt(0).toUpperCase() || "?"}
      </span>
    );
  }

  return (

    <img
      src={src}
      alt={name}
      style={style}
      className={`shrink-0 rounded-full object-cover ${className}`}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}
