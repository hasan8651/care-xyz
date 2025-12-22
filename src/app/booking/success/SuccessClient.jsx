"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    async function confirm() {
      const res = await fetch(`/api/stripe/confirm-booking?session_id=${sessionId}`);
      const data = await res.json();
      if (res.ok) {
        setBooking(data);
        setStatus("success");
      } else {
        setStatus("error");
      }
    }

    confirm();
  }, [sessionId]);

  if (status === "loading") return <p>Processing your payment...</p>;
  if (status === "error") return <p>Something went wrong.</p>;

  return (
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p>Your booking has been created. We have sent you an email invoice.</p>
    </div>
  );
}
