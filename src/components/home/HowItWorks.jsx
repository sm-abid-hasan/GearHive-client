import { FiCreditCard, FiSearch, FiCalendar, FiTruck } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { StaggerGrid, StaggerItem } from "@/components/motion/Reveal";

const STEPS = [
  { icon: FiSearch, title: "Find equipment", text: "Search by name or location and filter by category, price and availability." },
  { icon: FiCalendar, title: "Choose your dates", text: "Pick the start and end date. We check availability and calculate the total." },
  { icon: FiCreditCard, title: "Pay securely", text: "Confirm and pay on Stripe's secure checkout. Your booking is saved instantly." },
  { icon: FiTruck, title: "Receive and return", text: "Get the equipment delivered, use it, and return it when your rental ends." },
];


export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding scroll-mt-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="How It Works"
          title="Rent equipment in four easy steps"
          subtitle="From searching to returning, the whole process takes only a few minutes."
        />

        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <StaggerItem key={title} className="h-full">
              <div className="relative h-full rounded-2xl border border-base-300 bg-base-100 p-7 pt-10 text-center">
                <span className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-primary-content">
                  {index + 1}
                </span>
                <Icon className="mx-auto text-4xl text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 leading-relaxed text-base-content/70">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
