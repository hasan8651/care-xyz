"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BookingRow({ booking }) {
  const router = useRouter();

  const canCancel =
    booking.status === "Pending" || booking.status === "Confirmed";

  async function handleCancel() {
    const ok = confirm("Are you sure you want to cancel this booking?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/bookings/${booking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Could not cancel booking");
        return;
      }

      toast.success("Booking cancelled");
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="card bg-base-100 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg">{booking.serviceName}</h2>
          <p className="text-sm">
            Duration: {booking.durationValue} {booking.durationUnit}
          </p>
          <p className="text-sm">
            Location: {booking.location?.city}, {booking.location?.district}
          </p>
          <p className="text-sm font-semibold">Total: ৳{booking.totalCost}</p>
          <p className="text-sm">
            Status:{" "}
            <span
              className={
                booking.status === "Cancelled"
                  ? "text-error"
                  : booking.status === "Completed"
                  ? "text-success"
                  : booking.status === "Pending"
                  ? "text-warning"
                  : "text-info"
              }
            >
              {booking.status}
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          {/* MODAL USE KORLE VALO HOBE */}
          <a
            href={`/my-bookings/${booking._id}`}
            className="btn btn-outline btn-sm"
          >
            View Details
          </a>

          {canCancel && (
            <button className="btn btn-error btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
