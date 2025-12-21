"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  // user role অনুযায়ী dashboard path
  const dashboardHref = session
    ? session.user?.role === "admin"
      ? "/admin"
      : "/my-bookings"
    : null;

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "All Services" },
    { href: "/#about", label: "About Us" },
    ...(dashboardHref ? [{ href: dashboardHref, label: "Dashboard" }] : []),
  ];

  // initial theme
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    const initial = stored || "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const avatarLetter =
    session?.user?.name?.[0] ||
    session?.user?.email?.[0] ||
    "U";

  return (
    <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-primary via-secondary to-accent text-primary-content shadow">
      {/* Left: Logo + Name + Mobile menu button */}
      <div className="navbar-start">
        {/* Mobile menu (hamburger) */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-56"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    pathname === link.href
                      ? "font-semibold text-primary"
                      : ""
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {!session ? (
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
            ) : (
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        {/* Logo + Name */}
        <Link
          href="/"
          className="flex items-center gap-2 btn btn-ghost normal-case text-xl px-1"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-base-100 text-primary font-bold">
            C
          </span>
          <span className="font-bold tracking-tight">Care.xyz</span>
        </Link>
      </div>

      {/* Center: Desktop menu (horizontal) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "font-semibold border-b-2 border-base-100"
                    : ""
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Theme toggle + Login/Avatar/Logout */}
      <div className="navbar-end gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            // Moon icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293a8 8 0 01-10.586-10.586A8.001 8.001 0 1017.293 13.293z" />
            </svg>
          ) : (
            // Sun icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
              <path
                fillRule="evenodd"
                d="M10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm9-6a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm11.071-6.071a1 1 0 010 1.414L14.364 6.05a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM7.05 14.364a1 1 0 010 1.414L6.343 16.485a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm8.485 1.414a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM5.757 3.343a1 1 0 00-1.414 0l-.707.707A1 1 0 105.05 5.464l.707-.707a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Login (only when logged out) */}
        {!session && (
          <Link
            href="/auth/login"
            className="btn btn-sm bg-base-100 text-primary border-none hidden sm:inline-flex"
          >
            Login
          </Link>
        )}

        {/* User avatar + Logout (only when logged in) */}
        {session && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full bg-base-100 text-primary flex items-center justify-center font-semibold">
                {avatarLetter.toUpperCase()}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box w-52"
            >
              <li className="px-2 py-1 text-xs opacity-70">
                {session.user?.email}
              </li>
              {/* Mobile থেকে Dashboard এক্সেসের জন্য */}
              {dashboardHref && (
                <li className="lg:hidden">
                  <Link href={dashboardHref}>Dashboard</Link>
                </li>
              )}
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}