import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Page not found" };


export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container-page flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-8xl font-extrabold text-primary">404</p>
        <h1 className="section-title mt-4">Oops! This page does not exist</h1>
        <p className="section-subtitle">
          The page you are looking for may have been moved or deleted. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/equipment" className="btn btn-outline">Browse Equipment</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
