import { getDb } from "@/lib/db";
import ServiceCard from "@/components/ServiceCard";

export const metadata = {
  title: "All Services | Care.xyz",
  description: "Browse all babysitting, elderly care and home care services.",
};

export default async function AllServicesPage() {
  const db = await getDb();
  const rawServices = await db.collection("services").find({}).toArray();

  const services = rawServices.map((s) => ({
    ...s,
    _id: s._id.toString(),
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">All Services</h1>
      <p className="text-base text-base-content/70">
        Explore all available care services and choose the one that best fits
        your family&apos;s needs.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}