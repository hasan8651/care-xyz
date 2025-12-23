import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import BookingRow from "@/components/BookingRow";

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  const db = await getDb();
  const rawBookings = await db
    .collection("bookings")
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  const bookings = rawBookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
    createdAt: booking.createdAt ? booking.createdAt.toISOString() : null,
    cancelledAt: booking.cancelledAt ? booking.cancelledAt.toISOString() : null,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <BookingRow key={b._id} booking={b} />
          ))}
        </div>
      )}
    </div>
  );
}