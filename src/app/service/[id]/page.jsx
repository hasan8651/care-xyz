import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props) {
  const { id } = await props.params;

  const db = await getDb();
  let service;

  try {
    service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });
  } catch {
    return {
      title: "Service not found - Care.xyz",
    };
  }

  if (!service) {
    return {
      title: "Service not found - Care.xyz",
    };
  }

  return {
    title: `${service.name} | Care.xyz`,
    description: service.shortDescription || "Trusted care service.",
  };
}

export default async function ServiceDetailPage(props) {
  const { id } = await props.params;

  const db = await getDb();
  let service;

  try {
    service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });
  } catch {
    notFound();
  }

  if (!service) notFound();
  console.log("SERVICE DETAIL ID:", service._id);
  console.log("SERVICE DETAIL ID (string):", service._id.toString());

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{service.name}</h1>
      <p>{service.description}</p>
      <p className="font-semibold">
        Rate: ৳{service.rate} / {service.rateType}
      </p>
      <Link href={`/booking/${service._id.toString()}`} className="btn btn-primary">
  Book Service
</Link>
    </div>
  );
}