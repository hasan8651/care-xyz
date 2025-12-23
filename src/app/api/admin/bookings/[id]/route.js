import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

export async function PATCH(req, props) {
  const { id } = await props.params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const db = await getDb();

  const booking = await db
    .collection("bookings")
    .findOne({ _id: new ObjectId(id) });

  if (!booking) {
    return NextResponse.json(
      { message: "Booking not found" },
      { status: 404 }
    );
  }


  // alert in toast kortte hobe
  const current = booking.status || "Pending";
  if (current === "Completed" || current === "Cancelled") {
    return NextResponse.json(
      { message: "Cannot update a completed/cancelled booking" },
      { status: 400 }
    );
  }

  const update = { status };

  const now = new Date();
  if (status === "Confirmed") {
    update.confirmedAt = now;
  }
  if (status === "Completed") {
    update.completedAt = now;
  }
  if (status === "Cancelled") {
    update.cancelledAt = now;
  }

  await db.collection("bookings").updateOne(
    { _id: booking._id },
    { $set: update }
  );

  return NextResponse.json({ message: "Status updated" });
}