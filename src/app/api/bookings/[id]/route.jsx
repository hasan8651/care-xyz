import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req, props) {
  const { id } = await props.params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const body = await req.json();
  const { action } = body;

  if (action !== "cancel") {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }

  const booking = await db
    .collection("bookings")
    .findOne({ _id: new ObjectId(id) });

  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  const isOwner = booking.userId === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return NextResponse.json(
      { message: "Not allowed to cancel this booking" },
      { status: 403 }
    );
  }

  if (!["Pending", "Confirmed"].includes(booking.status)) {
    return NextResponse.json(
      { message: "Cannot cancel this booking" },
      { status: 400 }
    );
  }

  await db.collection("bookings").updateOne(
    { _id: booking._id },
    {
      $set: {
        status: "Cancelled",
        cancelledAt: new Date(),
      },
    }
  );

  return NextResponse.json({ message: "Booking cancelled" });
}
