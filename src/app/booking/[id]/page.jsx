import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BookingForm from "@/components/BookingForm";

export default async function BookingPage(props) {
  const { id } = await props.params;

  const session = await getServerSession(authOptions);

    if (!session) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(`/booking/${id}`)}`
    );
  }

  const db = await getDb();
  let service = null;

  try {
    service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Error fetching service for booking:", error);
  }



  // ei code only for test. pore change korbo
  if (!service) {
      return (
      <div className="max-w-xl mx-auto py-10 space-y-3">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <p className="text-sm">
          Invalid service id: <code>{id}</code>
        </p>
      </div>
    );
  }

  service = {...service, _id: service._id.toString(),};

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Book: {service.name}</h1>
      <p>
        Rate: ৳{service.rate} / {service.rateType}
      </p>

      <BookingForm service={service} />
    </div>
  );
}