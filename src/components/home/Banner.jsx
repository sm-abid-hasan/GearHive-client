// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, useReducedMotion } from "framer-motion";
// import { FiCheckCircle, FiSearch, FiShield } from "react-icons/fi";
// import SafeImage from "@/components/ui/SafeImage";


// export default function Banner() {
//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const reduceMotion = useReducedMotion();

//   const handleSearch = (event) => {
//     event.preventDefault();
//     router.push(search.trim() ? `/equipment?q=${encodeURIComponent(search.trim())}` : "/equipment");
//   };


//   const fadeUp = (delay) => ({
//     initial: reduceMotion ? false : { opacity: 0, y: 28 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6, delay, ease: "easeOut" },
//   });


//   const float = (delay) =>
//     reduceMotion
//       ? {}
//       : { animate: { y: [0, -10, 0] }, transition: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" } };

//   return (
//     <section className="relative overflow-hidden bg-base-200">
//       <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
//         <div>
//           <motion.span
//             {...fadeUp(0)}
//             className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary"
//           >
//             <FiShield /> The trusted equipment rental marketplace
//           </motion.span>

//           <motion.h1
//             {...fadeUp(0.1)}
//             className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
//           >
//             Rent the gear you need. <span className="text-primary">Earn from the gear you own.</span>
//           </motion.h1>

//           <motion.p {...fadeUp(0.2)} className="mt-5 max-w-xl text-lg leading-relaxed text-base-content/75">
//             GearHive connects equipment owners with customers. Find construction machines, cameras, vehicles, farm
//             tools and event gear, book for the days you need, and pay securely online.
//           </motion.p>

//           <motion.form
//             {...fadeUp(0.3)}
//             onSubmit={handleSearch}
//             className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
//             role="search"
//           >
//             <label className="input input-bordered flex flex-1 items-center gap-2">
//               <FiSearch className="text-base-content/60" aria-hidden="true" />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 placeholder="Search equipment or location..."
//                 aria-label="Search equipment"
//                 className="grow"
//               />
//             </label>
//             <button type="submit" className="btn btn-primary">
//               Search
//             </button>
//           </motion.form>

          
//         </div>

//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
//           className="relative"
//         >
//           <div className="overflow-hidden rounded-3xl border border-base-300 shadow-2xl">
//             <SafeImage
//               src="/images/hero.png"
//               alt="Excavator, drone and sound system available for rent"
//               className=" w-full object-cover"
//               loading="eager"
//             />
//           </div>

          

          
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FiSearch, FiShield } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";

export default function Banner() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/equipment?q=${encodeURIComponent(query)}` : "/equipment");
  };

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-base-200 via-base-200/80 to-base-100">
      {/* Subtle Ambient Background Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#0000000d_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)]"
      />

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Left Column: Copy & Search */}
        <div className="lg:col-span-6">
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm"
          >
            <FiShield className="h-4 w-4 shrink-0" />
            <span>The trusted equipment rental marketplace</span>
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-base-content sm:text-5xl lg:text-[3.45rem]"
          >
            Rent the gear you need.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/75 bg-clip-text text-transparent">
              Earn from the gear you own.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-5 max-w-xl text-base leading-relaxed text-base-content/75 sm:text-lg"
          >
            GearHive connects equipment owners with customers. Find construction machines, cameras,
            vehicles, farm tools and event gear, book for the days you need, and pay securely
            online.
          </motion.p>

          {/* Elevated Search Bar */}
          <motion.form
            {...fadeUp(0.3)}
            onSubmit={handleSearch}
            role="search"
            className="mt-8 flex max-w-xl flex-col gap-2.5 rounded-2xl border border-base-300/80 bg-base-100/90 p-2 shadow-lg shadow-base-content/5 backdrop-blur-md transition-all focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 sm:flex-row sm:items-center"
          >
            <label className="flex flex-1 items-center gap-3 px-3 py-2 sm:py-0">
              <FiSearch className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search equipment or location..."
                aria-label="Search equipment"
                className="w-full bg-transparent text-base text-base-content placeholder:text-base-content/50 focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary rounded-xl px-7 font-semibold shadow-md shadow-primary/20 transition-transform active:scale-[0.98]"
            >
              Search
            </button>
          </motion.form>
        </div>

        {/* Right Column: Hero Visual */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          {/* Decorative Glow Behind Image */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl"
          />

          <div className="group relative overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-2 shadow-2xl shadow-base-content/10">
            <div className="overflow-hidden rounded-2xl">
              <SafeImage
                src="/images/hero.png"
                alt="Excavator, drone and sound system available for rent"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}