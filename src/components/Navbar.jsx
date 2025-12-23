"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState("light");

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

  return (
    <div className="navbar bg-base-100 border-b">
      {/* Logo dibo */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Care.xyz
        </Link>
      </div>

      <div className="flex-none gap-2 items-center">
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
        <Link href="/services" className="btn btn-ghost">
          All Services
        </Link>

        {!isLoggedIn && (
          <>
            <Link href="/about" className="btn btn-ghost">
              About Us
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact
            </Link>
            <Link href="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link href={dashboardHref} className="btn btn-ghost">
              Dashboard
            </Link>

            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span className="text-sm">{avatarLetter}</span>
              </div>
            </div>

            <button
              className="btn btn-outline"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </>
        )}

        <button
          type="button"
          className="btn btn-ghost btn-circle"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            // Sun icon
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
            // Moon icon
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
      </div>
    </div>
  );
}
