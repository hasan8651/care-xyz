"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const nid = form.get("nid");
    const name = form.get("name");
    const email = form.get("email");
    const contact = form.get("contact");
    const password = form.get("password");
    const confirm = form.get("confirm");

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      setError("Password must have 6+ chars, 1 uppercase & 1 lowercase.");
      return;
    }
    if (password !== confirm) {
      setError("Password & Confirm password do not match.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ nid, name, email, contact, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Registration failed.");
      return;
    }

    router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-3">
        <h1 className="text-2xl font-bold">Register</h1>
        <input name="nid" placeholder="NID No" required className="input" />
        <input name="name" placeholder="Full Name" required className="input" />
        <input name="email" type="email" placeholder="Email" required className="input" />
        <input name="contact" placeholder="Contact Number" required className="input" />
        <input name="password" type="password" placeholder="Password" required className="input" />
        <input name="confirm" type="password" placeholder="Confirm Password" required className="input" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;