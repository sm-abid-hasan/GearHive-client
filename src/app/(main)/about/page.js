import Link from "next/link";
import { FiHeart, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = { title: "About Us" };

const VALUES = [
  { icon: FiShield, title: "Trust first", text: "Every listing is reviewed and every payment goes through Stripe." },
  { icon: FiUsers, title: "Community", text: "We connect owners and customers so equipment never sits idle." },
  { icon: FiTrendingUp, title: "Fair earnings", text: "Owners set their own prices and keep the full rental amount." },
  { icon: FiHeart, title: "Sustainable", text: "Sharing equipment means fewer purchases and less waste." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-base-200">
        <div className="container-page py-14">
          <span className="section-eyebrow">About Us</span>
          <h1 className="section-title mt-2">We make renting equipment simple</h1>
          <p className="section-subtitle">
            GearHive is an equipment rental marketplace. Owners list the equipment they are not using, and customers rent exactly what they need,
            for exactly the days they need it.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <SectionHeading eyebrow="Our values" title="What we believe in" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-lift rounded-2xl border border-base-300 p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-base-content/70">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/equipment" className="btn btn-primary btn-lg">Start Renting</Link>
          </div>
        </div>
      </section>
    </>
  );
}

