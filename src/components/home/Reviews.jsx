// import { FaQuoteLeft, FaStar } from "react-icons/fa6";
// import SectionHeading from "@/components/ui/SectionHeading";
// import Avatar from "@/components/ui/Avatar";
// import { StaggerGrid, StaggerItem } from "@/components/motion/Reveal";


// const REVIEWS = [
//   {
//     name: "Nadia Rahman",
//     role: "Wedding photographer, Dhaka",
//     rating: 5,
//     comment:
//       "I rented a full camera kit for a three-day wedding shoot. Booking took two minutes and the gear arrived in perfect condition.",
//   },
//   {
//     name: "Imran Chowdhury",
//     role: "Site engineer, Chattogram",
//     rating: 5,
//     comment:
//       "The mini excavator saved us weeks of manual digging. The price was clear from the start and the owner was very professional.",
//   },
//   {
//     name: "Farhana Akter",
//     role: "Event planner, Sylhet",
//     rating: 4,
//     comment:
//       "Sound system and tent for a 300-guest event, all from one website. Payment through Stripe felt safe and the support was quick.",
//   },
//   {
//     name: "Mahmud Hasan",
//     role: "Farmer, Rajshahi",
//     rating: 5,
//     comment:
//       "I rent a tractor only during the season instead of buying one. GearHive made it simple to compare weekly prices and book.",
//   },
// ];

// function Stars({ rating }) {
//   return (
//     <div className="flex gap-1 text-accent" role="img" aria-label={`${rating} out of 5 stars`}>
//       {Array.from({ length: 5 }).map((_, index) => (
//         <FaStar key={index} className={index < rating ? "" : "text-base-300"} />
//       ))}
//     </div>
//   );
// }

// export default function Reviews() {
//   return (
//     <section className="section-padding bg-base-200">
//       <div className="container-page">
//         <SectionHeading
//           eyebrow="Customer Reviews"
         
//           subtitle="Real stories from people who rented equipment on GearHive."
//         />

//         <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {REVIEWS.map((review) => (
//             <StaggerItem key={review.name} className="h-full">
//               <figure className="card-lift flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6">
//                 <FaQuoteLeft className="text-2xl text-primary/40" aria-hidden="true" />
//                 <blockquote className="mt-4 flex-1 leading-relaxed text-base-content/80">{review.comment}</blockquote>
//                 <div className="mt-5">
//                   <Stars rating={review.rating} />
//                 </div>
//                 <figcaption className="mt-4 flex items-center gap-3 border-t border-base-300 pt-4">
//                   <Avatar name={review.name} size={44} />
//                   <div>
//                     <p className="font-bold">{review.name}</p>
//                     <p className="text-sm text-base-content/70">{review.role}</p>
//                   </div>
//                 </figcaption>
//               </figure>
//             </StaggerItem>
//           ))}
//         </StaggerGrid>
//       </div>
//     </section>
//   );
// }


import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import SectionHeading from "@/components/ui/SectionHeading";
import Avatar from "@/components/ui/Avatar";
import { StaggerGrid, StaggerItem } from "@/components/motion/Reveal";

const REVIEWS = [
  {
    name: "Nadia Rahman",
    role: "Wedding photographer, Dhaka",
    rating: 5,
    comment:
      "I rented a full camera kit for a three-day wedding shoot. Booking took two minutes and the gear arrived in perfect condition.",
  },
  {
    name: "Imran Chowdhury",
    role: "Site engineer, Chattogram",
    rating: 5,
    comment:
      "The mini excavator saved us weeks of manual digging. The price was clear from the start and the owner was very professional.",
  },
  {
    name: "Farhana Akter",
    role: "Event planner, Sylhet",
    rating: 4,
    comment:
      "Sound system and tent for a 300-guest event, all from one website. Payment through Stripe felt safe and the support was quick.",
  },
  {
    name: "Mahmud Hasan",
    role: "Farmer, Rajshahi",
    rating: 5,
    comment:
      "I rent a tractor only during the season instead of buying one. GearHive made it simple to compare weekly prices and book.",
  },
];

function Stars({ rating }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full bg-base-200/80 px-2.5 py-1 text-xs text-accent"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "text-amber-400" : "text-base-300"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section-padding relative isolate overflow-hidden bg-gradient-to-b from-base-200/70 via-base-200 to-base-100">
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container-page">
        <SectionHeading
          eyebrow="Customer Reviews"
          subtitle="Real stories from people who rented equipment on GearHive."
        />

        <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review) => (
            <StaggerItem key={review.name} className="h-full">
              <figure className="card-lift group relative flex h-full flex-col justify-between rounded-3xl border border-base-300/80 bg-base-100/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                {/* Top Header: Quote Icon Badge + Star Rating */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-content">
                      <FaQuoteLeft className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <Stars rating={review.rating} />
                  </div>

                  {/* Review Comment */}
                  <blockquote className="mt-5 text-[15px] leading-relaxed text-base-content/80">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>
                </div>

                {/* Reviewer Footer */}
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-base-300/70 pt-4">
                  <div className="shrink-0 rounded-full ring-2 ring-primary/15 transition-all duration-300 group-hover:ring-primary/40">
                    <Avatar name={review.name} size={44} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-base-content">{review.name}</p>
                    <p className="truncate text-xs font-medium text-base-content/65">
                      {review.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}