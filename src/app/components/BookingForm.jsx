"use client";

import { useState, useEffect } from "react";

const divisions = ["Dhaka", "Chattogram"]; // বাস্তবে ডাটা structure রাখবেন
// Demonstration এর জন্য simple select

export default function BookingForm({ service }) {
  const [duration, setDuration] = useState(1);
  const [unit, setUnit] = useState("hours");
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let hours = duration;
    if (unit === "days") hours = duration * 8;
    setTotalCost(hours * service.ratePerHour);
  }, [duration, unit, service.ratePerHour]);

  const handleLocationChange = (e) => {
    setLocation((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service._id.toString(),
          serviceSlug: service.slug,
          duration,
          unit,
          location,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to create checkout session");
        setLoading(false);
        return;
      }

      window.location.href = data.url; // redirect to Stripe
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value || "1", 10))}
          className="input input-bordered w-24"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="select select-bordered"
        >
          <option value="hours">ঘন্টা</option>
          <option value="days">দিন</option>
        </select>
      </div>

      {/* Location fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select
          name="division"
          className="select select-bordered"
          value={location.division}
          onChange={handleLocationChange}
        >
          <option value="">Select Division</option>
          {divisions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <input
          name="district"
          placeholder="District"
          className="input input-bordered"
          value={location.district}
          onChange={handleLocationChange}
        />
        <input
          name="city"
          placeholder="City"
          className="input input-bordered"
          value={location.city}
          onChange={handleLocationChange}
        />
        <input
          name="area"
          placeholder="Area"
          className="input input-bordered"
          value={location.area}
          onChange={handleLocationChange}
        />
      </div>
      <textarea
        name="address"
        placeholder="Full Address"
        className="textarea textarea-bordered w-full"
        value={location.address}
        onChange={handleLocationChange}
      />

      <div className="text-lg font-semibold">
        Total Cost: {totalCost} ৳
      </div>

      <button className="btn btn-primary" disabled={loading}>
        {loading ? "Redirecting..." : "Proceed to Payment"}
      </button>
    </form>
  );
}