import { stripe } from "@/lib/stripe";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";



// mail send korte chaile
// import { sendBookingEmail } from "@/lib/mail";

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

    // email pore korbo
    // await sendBookingEmail({ to: booking.userEmail, booking });
  }

  return (
    <div className="max-w-md mx-auto text-center space-y-4 py-12">
      <h1 className="text-3xl font-bold">Thank you!</h1>
      <p>Your booking has been created successfully.</p>
      <a href="/my-bookings" className="btn btn-primary">
        View My Bookings
      </a>
    </div>
  );
}