"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statusOptions = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function AdminBookingRow({ booking }) {
  const router = useRouter();

  async function handleStatusChange(e) {
    const nextStatus = e.target.value;
    if (nextStatus === booking.status) return;

    try {
      const res = await fetch(`/api/admin/bookings/${booking._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update status");
        return;
      }

      toast.success(`Status updated to ${nextStatus}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <tr>
      <td>{booking.serviceName}</td>
      <td>{booking.userEmail}</td>
      <td>৳{booking.totalCost}</td>

      <td>
        <div className="flex items-center gap-2">
          <span
            className={
              booking.status === "Cancelled"
                ? "badge badge-error"
                : booking.status === "Completed"
                ? "badge badge-success"
                : booking.status === "Confirmed"
                ? "badge badge-info"
                : "badge badge-warning"
            }
          >
            {booking.status}
          </span>

          <select
            className="select select-bordered select-xs"
            value={booking.status}
            onChange={handleStatusChange}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </td>

      <td>{booking.paymentStatus}</td>
      <td className="truncate max-w-xs">{booking.stripeSessionId}</td>
      <td>{booking.createdAtText}</td>
    </tr>
  );
}
