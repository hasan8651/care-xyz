import { stripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sendBookingEmail } from "@/lib/email";
import Link from "next/link";


export default async function BookingSuccessPage(props) {
  const { searchParams } = props;
  const sp = await searchParams;
  const stripeSessionId = sp.session_id;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  if (!stripeSessionId) {
    redirect("/");
  }

    const stripeSession = await stripe.checkout.sessions.retrieve(
    stripeSessionId
  );

  if (stripeSession.payment_status !== "paid") {
    redirect("/");
  }

  const metadata = stripeSession.metadata || {};
  const db = await getDb();

  const existing = await db
    .collection("bookings")
    .findOne({ stripeSessionId });

  if (!existing) {
    const location = JSON.parse(metadata.location || "{}");

    const booking = {
      userId: metadata.userId,
      userEmail: stripeSession.customer_email,
      serviceId: metadata.serviceId,
      serviceName: metadata.serviceName,
      durationUnit: metadata.durationUnit,
      durationValue: Number(metadata.durationValue),
      location,
      totalCost: Number(metadata.totalCost),
      status: "Pending",
      paymentStatus: "paid",
      stripeSessionId,
      createdAt: new Date(),
    };

    await db.collection("bookings").insertOne(booking);

    try {
      await sendBookingEmail({ to: booking.userEmail, booking });
    } catch (err) {
      console.error("Failed to send booking email:", err);
        }
  }


  return (
    <div className="max-w-md mx-auto text-center space-y-4 py-12">
      <h1 className="text-3xl font-bold">Thank you!</h1>
      <p>Your booking has been created successfully.</p>
      <Link href="/my-bookings" className="btn btn-primary">
        View My Bookings
      </Link>
    </div>
  );
}