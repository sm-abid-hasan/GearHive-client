import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";


export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="#0b7a64" />
        <path d="M32 11 50 21.5v21L32 53 14 42.5v-21z" fill="none" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="6" fill="#f5a524" />
      </svg>
      <span className={`text-2xl font-extrabold tracking-tight ${light ? "text-white" : "text-base-content"}`}>
        Gear<span className="text-primary">Hive</span>
      </span>
    </Link>
  );
}
