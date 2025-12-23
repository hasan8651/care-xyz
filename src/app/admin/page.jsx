import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import AdminBookingRow from "@/components/AdminBookingRow";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const db = await getDb();
  const rawBookings = await db
    .collection("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const bookings = rawBookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
    createdAtText: booking.createdAt
      ? booking.createdAt.toLocaleString("en-GB", {
          timeZone: "Asia/Dhaka",
        })
      : "",
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Service</th>
              <th>User Email</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Stripe Session</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <AdminBookingRow key={booking._id} booking={booking} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
