"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiMenu, FiX, FiLogOut, FiGrid } from "react-icons/fi";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipment" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    closeMenu();
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const linkClass = (href) =>
    `rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors ${
      pathname === href ? "bg-primary/10 text-primary" : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />

     
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

      
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {isLoading ? (
            <span className="skeleton-block h-10 w-40" aria-hidden="true" />
          ) : user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary">
                <FiGrid /> Dashboard
              </Link>
              <button type="button" onClick={handleLogout} className="btn btn-outline">
                <FiLogOut /> Logout
              </button>
              <Link href="/dashboard/profile" aria-label="My profile" className="ml-1">
                <Avatar src={user.image} name={user.name} size={40} />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>


        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>


      {menuOpen && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenu} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-base-300 pt-4">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={closeMenu} className="btn btn-primary">
                    <FiGrid /> Dashboard
                  </Link>
                  <button type="button" onClick={handleLogout} className="btn btn-outline">
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu} className="btn btn-outline">
                    Login
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="btn btn-primary">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
