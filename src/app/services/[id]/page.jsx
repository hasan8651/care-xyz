import NotFound from "@/app/not-found";
import { getDb } from "@/lib/mongodb";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const db = await getDb();
  const col = db.collection("services");
  const service = await col.findOne({ slug: params.id });

  if (!service) {
    return {
      title: "Service not found | Care.xyz",
    };
  }

  return {
    title: `${service.name} | Care.xyz`,
    description: service.shortDescription || "Care service details",
  };
}

export default async function ServiceDetailPage({ params }) {
  const db = await getDb();
  const col = db.collection("services");
  const service = await col.findOne({ slug: params.id });

  if (!service) {
    // app/not-found.js এ যাবে
    return <NotFound/>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{service.name}</h1>
      <p>{service.description}</p>
      <p>
        <strong>Base Rate:</strong> {service.ratePerHour} ৳ / hour
      </p>
      <Link
        href={`/booking/${service.slug}`}
        className="btn btn-primary mt-4"
      >
        Book Service
      </Link>
    </div>
  );
}