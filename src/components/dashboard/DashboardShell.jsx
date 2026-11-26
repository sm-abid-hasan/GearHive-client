// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import {
//   FiBox,
//   FiCalendar,
//   FiGrid,
//   FiHeart,
//   FiHome,
//   FiList,
//   FiLogOut,
//   FiMenu,
//   FiPlusSquare,
//   FiTruck,
//   FiUser,
//   FiUsers,
//   FiX,
// } from "react-icons/fi";
// import Logo from "@/components/layout/Logo";
// import ThemeToggle from "@/components/layout/ThemeToggle";
// import Avatar from "@/components/ui/Avatar";
// import { useAuth } from "@/hooks/useAuth";
// import { logoutUser } from "@/lib/auth-client";


// const MENUS = {
//   customer: [
//     { label: "Overview", href: "/dashboard", icon: FiGrid },
//     { label: "My Rentals", href: "/dashboard/my-rentals", icon: FiCalendar },
//     { label: "Favorites", href: "/dashboard/favorites", icon: FiHeart },
//     { label: "Profile", href: "/dashboard/profile", icon: FiUser },
//   ],
//   owner: [
//     { label: "Overview", href: "/dashboard", icon: FiGrid },
//     { label: "Add Equipment", href: "/dashboard/add-equipment", icon: FiPlusSquare },
//     { label: "My Equipment", href: "/dashboard/my-equipment", icon: FiBox },
//     { label: "My Equipment Rental", href: "/dashboard/my-equipment-rental", icon: FiTruck },
//     { label: "My Profile", href: "/dashboard/profile", icon: FiUser },
//   ],
//   admin: [
//     { label: "Overview", href: "/dashboard", icon: FiGrid },
//     { label: "All Users", href: "/dashboard/all-users", icon: FiUsers },
//     { label: "All Equipment", href: "/dashboard/all-equipment", icon: FiBox },
//     { label: "All Rentals", href: "/dashboard/all-rentals", icon: FiList },
//     { label: "My Profile", href: "/dashboard/profile", icon: FiUser },
//   ],
// };

// export default function DashboardShell({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user, role } = useAuth();

//   const menu = MENUS[role] || MENUS.customer;

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       toast.success("Logged out successfully");
//       router.push("/");
//     } catch {
//       toast.error("Could not log out. Please try again.");
//     }
//   };

//   const sidebar = (
//     <div className="flex h-full flex-col bg-base-100">
//       <div className="flex h-[72px] items-center border-b border-base-300 px-5">
//         <Logo />
//       </div>

//       <div className="px-5 pb-2 pt-5">
//         <span className="badge badge-primary badge-soft font-bold capitalize">{role} panel</span>
//       </div>

//       <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2" aria-label="Dashboard navigation">
//         {menu.map(({ label, href, icon: Icon }) => {
//           const active = pathname === href;
//           return (
//             <Link
//               key={href}
//               href={href}
//               onClick={() => setSidebarOpen(false)}
//               aria-current={active ? "page" : undefined}
//               className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition-colors ${
//                 active ? "bg-primary text-primary-content" : "text-base-content/80 hover:bg-base-200"
//               }`}
//             >
//               <Icon className="text-lg" aria-hidden="true" /> {label}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="space-y-1 border-t border-base-300 p-3">
//         <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-base-content/80 hover:bg-base-200">
//           <FiHome className="text-lg" /> Back to Website
//         </Link>
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold text-error hover:bg-error/10"
//         >
//           <FiLogOut className="text-lg" /> Logout
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-base-200">

//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-base-300 lg:block">{sidebar}</aside>


//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
//           <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-2xl">{sidebar}</aside>
//         </div>
//       )}

//       <div className="lg:pl-64">
//         {/* Top bar */}
//         <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 border-b border-base-300 bg-base-100/90 px-4 backdrop-blur sm:px-6">
//           <div className="flex items-center gap-2">
//             <button
//               type="button"
//               className="btn btn-ghost btn-circle lg:hidden"
//               onClick={() => setSidebarOpen(true)}
//               aria-label="Open menu"
//             >
//               <FiMenu className="text-2xl" />
//             </button>
//             <p className="hidden text-lg font-bold sm:block">Hello, {user?.name?.split(" ")[0] || "there"} 👋</p>
//           </div>

//           <div className="flex items-center gap-2">
//             <ThemeToggle />
//             <Link href="/dashboard/profile" className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 hover:bg-base-200">
//               <Avatar src={user?.image} name={user?.name || "?"} size={40} />
//               <span className="hidden text-left leading-tight sm:block">
//                 <span className="block max-w-40 truncate text-sm font-bold">{user?.name}</span>
//                 <span className="block text-xs capitalize text-base-content/60">{role}</span>
//               </span>
//             </Link>
//           </div>
//         </header>

//         {sidebarOpen && (
//           <button
//             type="button"
//             className="btn btn-circle btn-sm fixed left-[17.5rem] top-4 z-[60] lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//             aria-label="Close menu"
//           >
//             <FiX />
//           </button>
//         )}

     
//         <main className="w-full p-4 sm:p-6 lg:p-8">{children}</main>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiBox,
  FiCalendar,
  FiChevronRight,
  FiGrid,
  FiHeart,
  FiHome,
  FiList,
  FiLogOut,
  FiMenu,
  FiPlusSquare,
  FiTruck,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/auth-client";

const MENUS = {
  customer: [
    { label: "Overview", href: "/dashboard", icon: FiGrid },
    { label: "My Rentals", href: "/dashboard/my-rentals", icon: FiCalendar },
    { label: "Favorites", href: "/dashboard/favorites", icon: FiHeart },
    { label: "Profile", href: "/dashboard/profile", icon: FiUser },
  ],
  owner: [
    { label: "Overview", href: "/dashboard", icon: FiGrid },
    { label: "Add Equipment", href: "/dashboard/add-equipment", icon: FiPlusSquare },
    { label: "My Equipment", href: "/dashboard/my-equipment", icon: FiBox },
    { label: "My Equipment Rental", href: "/dashboard/my-equipment-rental", icon: FiTruck },
    { label: "My Profile", href: "/dashboard/profile", icon: FiUser },
  ],
  admin: [
    { label: "Overview", href: "/dashboard", icon: FiGrid },
    { label: "All Users", href: "/dashboard/all-users", icon: FiUsers },
    { label: "All Equipment", href: "/dashboard/all-equipment", icon: FiBox },
    { label: "All Rentals", href: "/dashboard/all-rentals", icon: FiList },
    { label: "My Profile", href: "/dashboard/profile", icon: FiUser },
  ],
};

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, role } = useAuth();

  const menu = MENUS[role] || MENUS.customer;
  const activeItem = menu.find((item) => item.href === pathname);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Could not log out. Please try again.");
    }
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-base-100/95 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="flex h-[76px] items-center justify-between border-b border-base-300/70 px-6">
        <Logo />
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-circle lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      {/* Role Workspace Pill */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-3.5 py-2.5">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-primary">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {role} panel
          </span>
          <span className="rounded-md bg-base-100/80 px-2 py-0.5 text-[10px] font-bold uppercase text-base-content/60 shadow-2xs">
            Workspace
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2"
        aria-label="Dashboard navigation"
      >
        {menu.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-content shadow-md shadow-primary/25"
                  : "text-base-content/75 hover:bg-base-200/80 hover:text-base-content"
              }`}
            >
              <span className="flex items-center gap-3.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                    active
                      ? "bg-primary-content/15 text-primary-content"
                      : "bg-base-200/80 text-base-content/70 group-hover:bg-primary/10 group-hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{label}</span>
              </span>

              {active && (
                <FiChevronRight
                  className="h-4 w-4 opacity-85"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Utility Actions */}
      <div className="space-y-1.5 border-t border-base-300/70 bg-base-200/30 p-4">
        <Link
          href="/"
          className="group flex items-center gap-3.5 rounded-2xl px-4 py-2.5 text-sm font-semibold text-base-content/75 transition-colors hover:bg-base-200 hover:text-base-content"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-base-200 text-base-content/70 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <FiHome className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>Back to Website</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center gap-3.5 rounded-2xl px-4 py-2.5 text-sm font-semibold text-error transition-colors hover:bg-error/10"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-error/10 text-error transition-colors group-hover:bg-error group-hover:text-error-content">
            <FiLogOut className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200/80">
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-base-300/80 shadow-sm lg:block">
        {sidebar}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-base-300 shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72">
        {/* Glassmorphic Top Header */}
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between gap-4 border-b border-base-300/70 bg-base-100/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-ghost btn-square rounded-2xl border border-base-300/70 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu className="h-5 w-5" />
            </button>

            <div>
              <p className="hidden text-base font-extrabold tracking-tight text-base-content sm:block">
                Hello, {user?.name?.split(" ")[0] || "there"} 👋
              </p>
              {activeItem && (
                <p className="hidden items-center gap-1.5 text-xs font-medium text-base-content/55 sm:flex">
                  <span className="capitalize">{role}</span>
                  <FiChevronRight className="h-3 w-3" aria-hidden="true" />
                  <span className="font-semibold text-primary">{activeItem.label}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/dashboard/profile"
              className="group flex items-center gap-3 rounded-full border border-base-300/80 bg-base-100 py-1 pr-3.5 pl-1.5 shadow-2xs transition-all hover:border-primary/40 hover:bg-base-200/60"
            >
              <div className="rounded-full ring-2 ring-primary/20 transition-all group-hover:ring-primary/50">
                <Avatar src={user?.image} name={user?.name || "?"} size={38} />
              </div>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block max-w-40 truncate text-sm font-bold text-base-content">
                  {user?.name}
                </span>
                <span className="block text-[11px] font-semibold capitalize text-primary">
                  {role}
                </span>
              </span>
            </Link>
          </div>
        </header>

        {/* Page Canvas */}
        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}