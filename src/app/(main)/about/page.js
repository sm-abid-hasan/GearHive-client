// import Link from "next/link";
// import { FiHeart, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
// import SectionHeading from "@/components/ui/SectionHeading";

// export const metadata = { title: "About Us" };

// const VALUES = [
//   { icon: FiShield, title: "Trust first", text: "Every listing is reviewed and every payment goes through Stripe." },
//   { icon: FiUsers, title: "Community", text: "We connect owners and customers so equipment never sits idle." },
//   { icon: FiTrendingUp, title: "Fair earnings", text: "Owners set their own prices and keep the full rental amount." },
//   { icon: FiHeart, title: "Sustainable", text: "Sharing equipment means fewer purchases and less waste." },
// ];

// export default function AboutPage() {
//   return (
//     <>
//       <section className="bg-base-200">
//         <div className="container-page py-14">
//           <span className="section-eyebrow">About Us</span>
//           <h1 className="section-title mt-2">We make renting equipment simple</h1>
//           <p className="section-subtitle">
//             GearHive is an equipment rental marketplace. Owners list the equipment they are not using, and customers rent exactly what they need,
//             for exactly the days they need it.
//           </p>
//         </div>
//       </section>

//       <section className="section-padding">
//         <div className="container-page">
//           <SectionHeading eyebrow="Our values" title="What we believe in" />
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             {VALUES.map(({ icon: Icon, title, text }) => (
//               <div key={title} className="card-lift rounded-2xl border border-base-300 p-7">
//                 <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
//                   <Icon aria-hidden="true" />
//                 </span>
//                 <h3 className="mt-5 text-lg font-bold">{title}</h3>
//                 <p className="mt-2 text-base-content/70">{text}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-14 text-center">
//             <Link href="/equipment" className="btn btn-primary btn-lg">Start Renting</Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = { title: "About Us" };

const VALUES = [
  {
    icon: FiShield,
    title: "Trust first",
    text: "Every listing is reviewed and every payment goes through Stripe.",
  },
  {
    icon: FiUsers,
    title: "Community",
    text: "We connect owners and customers so equipment never sits idle.",
  },
  {
    icon: FiTrendingUp,
    title: "Fair earnings",
    text: "Owners set their own prices and keep the full rental amount.",
  },
  {
    icon: FiHeart,
    title: "Sustainable",
    text: "Sharing equipment means fewer purchases and less waste.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Architectural Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-base-300/70 bg-gradient-to-b from-base-200/90 via-base-200/50 to-base-100">
        {/* Subtle Grid Texture & Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 bottom-0 -z-10 h-64 w-64 rounded-full bg-secondary/15 blur-3xl"
        />

        <div className="container-page py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-primary shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                About Us
              </span>

              <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-base-content sm:text-5xl lg:text-[3.35rem]">
                We make renting equipment{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  simple
                </span>
              </h1>

              <p className="mt-6 max-w-2xl border-l-4 border-primary/40 pl-4 text-base leading-relaxed text-base-content/75 sm:text-lg">
                GearHive is an equipment rental marketplace. Owners list the
                equipment they are not using, and customers rent exactly what
                they need, for exactly the days they need it.
              </p>
            </div>

            {/* Right Visual Ecosystem Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rotate-2 rounded-3xl bg-gradient-to-tr from-primary/20 via-primary/5 to-secondary/20"
                />
                <div className="relative space-y-3 rounded-3xl border border-base-300/90 bg-base-100/95 p-6 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-base-300/70 pb-3.5">
                    <span className="text-xs font-extrabold tracking-wider uppercase text-base-content/55">
                      How GearHive Works
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
                      <FiCheckCircle className="h-3.5 w-3.5" /> Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl bg-base-200/70 p-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 font-black text-primary">
                      01
                    </span>
                    <div className="h-3 w-4/5 rounded-full bg-base-300" />
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl bg-base-200/70 p-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 font-black text-primary">
                      02
                    </span>
                    <div className="h-3 w-3/5 rounded-full bg-base-300" />
                  </div>

                  <div className="flex items-center gap-3.5 rounded-2xl bg-base-200/70 p-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 font-black text-primary">
                      03
                    </span>
                    <div className="h-3 w-2/3 rounded-full bg-base-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values & CTA Section */}
      <section className="section-padding relative overflow-hidden bg-base-100">
        <div className="container-page">
          <SectionHeading eyebrow="Our values" title="What we believe in" />

          {/* 2x2 Bento Value Cards */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, text }, idx) => (
              <div
                key={title}
                className="card-lift group relative overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10 sm:p-8"
              >
                {/* Top Gradient Accent Line */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Giant Faint Watermark Icon */}
                <Icon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 bottom-4 h-24 w-24 text-primary/[0.05] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/[0.1]"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-content group-hover:shadow-lg group-hover:shadow-primary/25">
                    <Icon aria-hidden="true" />
                  </span>

                  <span className="rounded-lg bg-base-200 px-2.5 py-1 font-mono text-xs font-bold text-base-content/55">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-extrabold tracking-tight text-base-content">
                  {title}
                </h3>
                <p className="relative mt-2.5 max-w-md text-base leading-relaxed text-base-content/70">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Framed Bottom CTA Strip */}
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-r from-primary/10 via-base-200/80 to-secondary/10 p-8 text-center shadow-sm sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative flex flex-col items-center justify-center">
              <Link
                href="/equipment"
                className="btn btn-primary btn-lg rounded-2xl px-8 font-bold shadow-lg shadow-primary/25 transition-all hover:gap-3"
              >
                <span>Start Renting</span>
                <FiArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}