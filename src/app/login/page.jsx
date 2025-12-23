"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const { data: session } = useSession();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) router.push(callbackUrl);
  }, [session, callbackUrl, router]);

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

    if (res.error) {
      toast.error(res.error || "Login failed");
    } else {
      toast.success("Logged in");
      router.push(callbackUrl);
    }
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
        onClick={() => signIn("google", { callbackUrl })}
      >
        Continue with Google
      </button>

      <p className="mt-4 text-sm">
        New here?{" "}
        <a href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="link">
          Register
        </a>
      </p>
    </div>
  );
}