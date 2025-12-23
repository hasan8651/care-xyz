"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm({ callbackUrl = "/" }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error || "Login failed");
    } else {
      toast.success("Logged in");
      router.push(callbackUrl);
    }
  }

  function handleGoogle() {
    signIn("google", { callbackUrl });
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="divider">OR</div>
      <button
        className="btn btn-outline w-full"
        onClick={handleGoogle}
      >
        Continue with Google
      </button>

      <p className="mt-4 text-sm">
        New here?{" "}
        <a
          href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="link"
        >
          Register
        </a>
      </p>
    </div>
  );
}