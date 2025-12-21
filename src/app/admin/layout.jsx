// app/admin/layout.js
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white">Admin Panel</header>
      <main className="p-4">{children}</main>
    </div>
  );
}
