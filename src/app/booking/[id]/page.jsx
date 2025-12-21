import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getDb } from "@/lib/mongodb";
import BookingForm from "@/app/components/BookingForm";
import { redirect } from "next/navigation";

export default async function BookingPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login?callbackUrl=/booking/" + params.serviceId);

  const db = await getDb();
  const col = db.collection("services");
  const service = await col.findOne({ slug: params.serviceId });

  if (!service) {
    redirect("/"); // অথবা not-found
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Book: {service.name}
      </h1>
      <BookingForm service={{ ...service, _id: service._id }} />
    </div>
  );
}