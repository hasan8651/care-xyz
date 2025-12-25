"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";

export default function BookingForm({ service }) {
  const [durationValue, setDurationValue] = useState(1);
  const [durationUnit, setDurationUnit] = useState(service.rateType); // "hour" or "day"

  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const { hourRate, dayRate } = useMemo(() => {
    if (service.rateType === "hour") {
      const hr = service.rate;
      const day = service.rate * 8;
      return {
        hourRate: Number(hr.toFixed(2)),
        dayRate: Number(day.toFixed(2)),
      };
    } else {
          const day = service.rate;
      const hr = service.rate / 8;
      return {
        hourRate: Number(hr.toFixed(2)),
        dayRate: Number(day.toFixed(2)),
      };
    }
  }, [service.rate, service.rateType]);

   const unitRate = durationUnit === "day" ? dayRate : hourRate;

  const totalCost = useMemo(() => {
    if (!durationValue || !unitRate) return 0;
    return Number((durationValue * unitRate).toFixed(2));
  }, [durationValue, unitRate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !location.division ||
      !location.district ||
      !location.city ||
      !location.address
    ) {
      toast.error("Please fill location fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service._id,
          serviceName: service.name,
          durationUnit,
          durationValue,
          location,
          totalCost,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
         }

      if (!res.ok) {
        toast.error(data?.message || "Could not create payment");
        setLoading(false);
        return;
      }

      if (!data?.url) {
        toast.error("No payment URL returned");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card bg-base-100 p-4">
      <div className="flex justify-between items-center text-sm text-base-content/70">
        <span>
          Base rate:&nbsp;
          <span className="font-semibold text-base-content">
            ৳{unitRate} / {durationUnit}
          </span>
        </span>
        <span className="text-xs opacity-70">
          (1 day = 8 hours)
        </span>
      </div>

         <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Duration</label>
          <input
            type="number"
            min={1}
            className="input input-bordered w-full"
            value={durationValue}
            onChange={(e) => setDurationValue(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="label">Unit</label>
          <select
            className="select select-bordered w-full"
            value={durationUnit}
            onChange={(e) => setDurationUnit(e.target.value)}
          >
            <option value="hour">Hours</option>
            <option value="day">Days</option>
          </select>
        </div>
      </div>

      {/* Location zapshift */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Division</label>
          <input
            className="input input-bordered w-full"
            value={location.division}
            onChange={(e) =>
              setLocation({ ...location, division: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="label">District</label>
          <input
            className="input input-bordered w-full"
            value={location.district}
            onChange={(e) =>
              setLocation({ ...location, district: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="label">City</label>
          <input
            className="input input-bordered w-full"
            value={location.city}
            onChange={(e) =>
              setLocation({ ...location, city: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="label">Area</label>
          <input
            className="input input-bordered w-full"
            value={location.area}
            onChange={(e) =>
              setLocation({ ...location, area: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label className="label">Address</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold">
          Total Cost: ৳{isNaN(totalCost) ? 0 : totalCost}
        </span>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Redirecting to payment..." : "Pay & Confirm Booking"}
        </button>
      </div>
    </form>
  );
}