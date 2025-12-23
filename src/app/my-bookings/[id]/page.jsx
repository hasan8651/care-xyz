import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function BookingDetailsPage(props) {
  const { id } = await props.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/login?callbackUrl=/my-bookings/${id}`);
  }

  const db = await getDb();
  let booking;
  try {
    booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(id) });
  } catch {
    notFound();
  }

  if (!booking) notFound();

    const isOwner = booking.userId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
    notFound(); // redirect("/") kora jabe
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Booking Details</h1>
      <div className="card bg-base-100 p-4 space-y-2">
        <p><strong>Service:</strong> {booking.serviceName}</p>
        <p>
          <strong>Duration:</strong> {booking.durationValue}{" "}
          {booking.durationUnit}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {booking.location?.address}, {booking.location?.area},{" "}
          {booking.location?.city}, {booking.location?.district},{" "}
          {booking.location?.division}
        </p>
        <p>
          <strong>Total Cost:</strong> ৳{booking.totalCost}
        </p>
        <p>
          <strong>Status:</strong> {booking.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(booking.createdAt).toLocaleString()}
        </p>
        {booking.cancelledAt && (
          <p>
            <strong>Cancelled At:</strong>{" "}
            {new Date(booking.cancelledAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}