import { getDb } from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import { sendBookingInvoice } from "@/utils/email";
import { NextResponse } from "next/server";
// import { sendBookingInvoice } from "@/lib/email";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { message: "Missing session_id" },
        { status: 400 }
      );
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(
      sessionId
    );

    if (stripeSession.payment_status !== "paid") {
      return NextResponse.json(
        { message: "Payment not completed" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const bookingsCol = db.collection("bookings");

    // যদি আগে থেকেই এই session এর booking থাকে কিনা
    const existing = await bookingsCol.findOne({
      stripeSessionId: sessionId,
    });
    if (existing) {
      return NextResponse.json(existing);
    }

    const meta = stripeSession.metadata;
    const location = JSON.parse(meta.location);

    const booking = {
      userEmail: meta.userEmail,
      userId: meta.userId,
      serviceId: meta.serviceId,
      serviceName: stripeSession.display_items?.[0]?.custom?.name || "",
      duration: Number(meta.duration),
      unit: meta.unit,
      location,
      totalCost: Number(meta.totalCost),
      status: "Pending", // Payment done, service yet to be completed
      stripeSessionId: sessionId,
      paymentStatus: stripeSession.payment_status,
      createdAt: new Date(),
    };

    await bookingsCol.insertOne(booking);

    // Send invoice email
    try {
      await sendBookingInvoice({ to: booking.userEmail, booking });
    } catch (e) {
      console.error("Email send failed", e);
    }

    return NextResponse.json(booking);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}