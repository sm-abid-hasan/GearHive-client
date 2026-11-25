import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Logo from "./Logo";
import { CATEGORY_NAMES, SITE_NAME } from "@/lib/constants";


const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FaFacebookF },
  { label: "X (formerly Twitter)", href: "https://x.com", icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: FaLinkedinIn },
  { label: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed text-neutral-content/75">
            A trusted marketplace where equipment owners and customers meet. Rent what you need, earn from what you own.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
          <ul className="space-y-2.5 text-neutral-content/75">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/equipment" className="hover:text-white">All Equipment</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Categories</h3>
          <ul className="space-y-2.5 text-neutral-content/75">
            {CATEGORY_NAMES.map((name) => (
              <li key={name}>
                <Link href={`/equipment?category=${encodeURIComponent(name)}`} className="hover:text-white">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Contact</h3>
          <ul className="space-y-3 text-neutral-content/75">
            <li className="flex items-start gap-3"><FiMapPin className="mt-1 shrink-0 text-accent" /> 24 Gulshan Avenue, Dhaka 1212, Bangladesh</li>
            <li className="flex items-center gap-3"><FiPhone className="shrink-0 text-accent" /> +880 1700 000 000</li>
            <li className="flex items-center gap-3"><FiMail className="shrink-0 text-accent" /> support@gearhive.example</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-sm text-neutral-content/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>Secure payments powered by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
