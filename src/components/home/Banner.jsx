"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheckCircle, FiSearch, FiShield } from "react-icons/fi";
import SafeImage from "@/components/ui/SafeImage";


export default function Banner() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(search.trim() ? `/equipment?q=${encodeURIComponent(search.trim())}` : "/equipment");
  };


  const fadeUp = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
  });


  const float = (delay) =>
    reduceMotion
      ? {}
      : { animate: { y: [0, -10, 0] }, transition: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" } };

  return (
    <section className="relative overflow-hidden bg-base-200">
      <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <motion.span
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary"
          >
            <FiShield /> The trusted equipment rental marketplace
          </motion.span>

          <motion.h1
            {...fadeUp(0.1)}
            className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            Rent the gear you need. <span className="text-primary">Earn from the gear you own.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-5 max-w-xl text-lg leading-relaxed text-base-content/75">
            GearHive connects equipment owners with customers. Find construction machines, cameras, vehicles, farm
            tools and event gear, book for the days you need, and pay securely online.
          </motion.p>

          <motion.form
            {...fadeUp(0.3)}
            onSubmit={handleSearch}
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            role="search"
          >
            <label className="input input-bordered flex flex-1 items-center gap-2">
              <FiSearch className="text-base-content/60" aria-hidden="true" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search equipment or location..."
                aria-label="Search equipment"
                className="grow"
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </motion.form>

          
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-base-300 shadow-2xl">
            <SafeImage
              src="/images/hero.png"
              alt="Excavator, drone and sound system available for rent"
              className=" w-full object-cover"
              loading="eager"
            />
          </div>

          

          
        </motion.div>
      </div>
    </section>
  );
}
