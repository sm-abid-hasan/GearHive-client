"use client";

import { useEffect, useState } from "react";


export default function SafeImage({ src, alt = "", className = "", fallback = "/images/placeholder.svg", ...props }) {
  const [failed, setFailed] = useState(false);


  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      src={failed || !src ? fallback : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
