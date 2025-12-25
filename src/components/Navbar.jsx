"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function MainLinks({ isMobile = false, onLinkClick, pathname }) {
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {["/", "/services", "/about", "/contact"].map((href) => {
        const labelMap = {
          "/": "Home",
          "/services": "All Services",
          "/about": "About Us",
          "/contact": "Contact",
        };
        const label = labelMap[href];
        const active = isActive(href);

        const baseMobile =
          "btn btn-ghost justify-start w-full text-left normal-case";
        const baseDesktop = "btn btn-ghost normal-case";

        const className = isMobile
          ? `${baseMobile} ${
              active ? "bg-primary text-primary-content" : ""
            }`
          : `${baseDesktop} ${
              active
                ? "border-b-2 border-primary rounded-none text-primary font-semibold bg-primary/5"
                : ""
            }`;

        return (
          <Link
            key={href}
            href={href}
            className={className}
            onClick={onLinkClick}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

function AuthLinksDesktop({
  isLoggedIn,
  dashboardHref,
  onLogout,
  avatarLetter,
  pathname,
}) {
  const isDashboardActive = pathname.startsWith("/admin") || pathname.startsWith("/my-bookings");

  return (
    <div className="hidden lg:flex items-center gap-3">
      {!isLoggedIn && (
        <>
          <Link href="/login" className="btn btn-ghost normal-case">
            Login
          </Link>
          <Link href="/register" className="btn btn-ghost normal-case">
            Register
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link
            href={dashboardHref}
            className={`btn btn-ghost normal-case ${
              isDashboardActive
                ? "border-b-2 border-primary rounded-none text-primary font-semibold bg-primary/5"
                : ""
            }`}
          >
            Dashboard
          </Link>

          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="text-sm">{avatarLetter}</span>
            </div>
          </div>

          <button className="btn btn-outline normal-case" onClick={onLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

function AuthLinksMobile({
  isLoggedIn,
  dashboardHref,
  avatarLetter,
  userLabel,
  onLinkClick,
  onLogout,
  pathname,
}) {
  const baseClass = "btn btn-ghost justify-start w-full normal-case";
  const isDashboardActive = pathname.startsWith("/admin") || pathname.startsWith("/my-bookings");

  return (
    <>
      {!isLoggedIn && (
        <>
          <Link href="/login" className={baseClass} onClick={onLinkClick}>
            Login
          </Link>
          <Link href="/register" className={baseClass} onClick={onLinkClick}>
            Register
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link
            href={dashboardHref}
            className={`${baseClass} ${
              isDashboardActive ? "bg-primary text-primary-content" : ""
            }`}
            onClick={onLinkClick}
          >
            Dashboard
          </Link>

          <div className="flex items-center gap-2 px-2">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span className="text-sm">{avatarLetter}</span>
              </div>
            </div>
            <span className="text-sm truncate">{userLabel}</span>
          </div>

          <button
            className="btn btn-ghost justify-start w-full normal-case"
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

/* --- main Navbar component --- */

export default function Navbar() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  function handleThemeToggle() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    }
  }

  const isLoggedIn = !!session?.user;
  const dashboardHref =
    session?.user?.role === "admin" ? "/admin" : "/my-bookings";

  const avatarLetter =
    session?.user?.name?.[0]?.toUpperCase() ||
    session?.user?.email?.[0]?.toUpperCase() ||
    "?";

  const userLabel = session?.user?.name || session?.user?.email || "";

  function closeMobile() {
    setMobileOpen(false);
  }

  const handleLogoutDesktop = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleLogoutMobile = () => {
    closeMobile();
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50">
      {/* navbar */}
      <div className="navbar border-b border-base-200/70 bg-base-100/70 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          {/* Left: logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                className="w-10 h-8"
                src="/logo.png"
                alt="logo"
                width={100}
                height={100}
                unoptimized
              />
              <span className="font-bold text-xl">Care.xyz</span>
            </Link>
          </div>

          {/* Center: main links (desktop) */}
          <nav className="hidden lg:flex items-center gap-2">
            <MainLinks pathname={pathname} onLinkClick={() => {}} />
          </nav>

          {/* Right: auth + theme + burger */}
          <div className="flex items-center gap-3">
            <AuthLinksDesktop
              isLoggedIn={isLoggedIn}
              dashboardHref={dashboardHref}
              avatarLetter={avatarLetter}
              onLogout={handleLogoutDesktop}
              pathname={pathname}
            />

            {/* Theme toggle */}
            <button
              type="button"
              className="btn btn-ghost btn-circle"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314L7.05 7.05M16.95 16.95l1.414 1.414" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile burger */}
            <button
              className="btn btn-ghost btn-circle lg:hidden"
              aria-label="Toggle navigation"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-base-200/70 bg-base-100/95 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            <MainLinks
              isMobile
              pathname={pathname}
              onLinkClick={closeMobile}
            />
            <AuthLinksMobile
              isLoggedIn={isLoggedIn}
              dashboardHref={dashboardHref}
              avatarLetter={avatarLetter}
              userLabel={userLabel}
              onLinkClick={closeMobile}
              onLogout={handleLogoutMobile}
              pathname={pathname}
            />
          </div>
        </div>
      )}
    </header>
  );
}