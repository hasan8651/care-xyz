"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "Admin Home", href: "/admin" },
  { label: "Add Service", href: "/admin/add-service" },
  { label: "Manage Services", href: "/admin/manage-services" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <aside className="w-64 bg-base-100 border-r flex flex-col">
      {/* Top: logo + theme toggle */}
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Care.xyz
        </Link>
        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            // sun icon
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
            // moon icon
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

      {/* Middle: menu */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`btn btn-ghost justify-start w-full ${
                active ? "btn-active bg-base-200" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: logout */}
      <div className="p-4 border-t">
        <button
          className="btn btn-outline w-full"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}