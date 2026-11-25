import Link from "next/link";
import { FadeIn } from "@/components/motion/Reveal";


export default function OwnerCta() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <FadeIn>
          <div className="brand-gradient relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white sm:px-12">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-accent/25" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
                Own equipment that sits unused? Put it to work.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                List your equipment for free, set your own price and earn every time a customer rents it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/register" className="btn btn-accent btn-lg">
                  Become an Owner
                </Link>
                <Link href="/equipment" className="btn btn-lg border-white/50 bg-transparent text-white hover:bg-white/10">
                  Browse Equipment
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
