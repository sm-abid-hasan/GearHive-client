"use client";

import Link from "next/link";


export default function GlobalError({ reset }) {
  return (
    <main className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-extrabold text-error">Oops!</p>
      <h1 className="section-title mt-4">Something went wrong</h1>
      <p className="section-subtitle">An unexpected error happened. Please try again or go back to the home page.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => reset()} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">Back to Home</Link>
      </div>
    </main>
  );
}
