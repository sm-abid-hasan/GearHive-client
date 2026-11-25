import { FiCalendar, FiDollarSign, FiLock, FiUserCheck } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGrid, StaggerItem } from "@/components/motion/Reveal";

const BENEFITS = [
  {
    icon: FiDollarSign,
    title: "Affordable Rental Prices",
    text: "Rent only for the time you need and skip the cost of buying. Prices are shown clearly before you book.",
  },
  {
    icon: FiUserCheck,
    title: "Verified Equipment Owners",
    text: "Every listing is reviewed by our admin team before it goes live, so you rent from owners you can trust.",
  },
  {
    icon: FiCalendar,
    title: "Flexible Rental Periods",
    text: "Choose daily, weekly or monthly rentals. The total is calculated for you from the dates you select.",
  },
  {
    icon: FiLock,
    title: "Secure Payments",
    text: "Pay by card on Stripe's secure checkout. Your payment details never touch our servers.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us ?"
          title="Renting made simple, safe and fair"
          
          
        />

        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className="h-full">
              <div className="card-lift h-full rounded-2xl border border-base-300 bg-base-100 p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-base-content/70">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
