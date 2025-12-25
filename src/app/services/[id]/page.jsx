import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

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

  const serviceId = service._id.toString();

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      {/* Top back button */}
      <div className="flex items-center justify-between">
        <Link href="/services" className="btn btn-ghost btn-sm gap-1">
          <span className="text-lg">←</span>
          <span>Back to Services</span>
        </Link>
      </div>

      {/* Main content card */}
      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: image */}
          <div className="relative h-64 md:h-full min-h-65">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-primary/20 via-base-200 to-accent/20 flex items-center justify-center">
                <span className="text-base-content/60 text-sm">
                  No image available
                </span>
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="p-6 lg:p-8 space-y-4 flex flex-col">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-primary font-semibold">
                Care Service
              </p>
              <h1 className="text-3xl font-bold">{service.name}</h1>
              {service.shortDescription && (
                <p className="text-sm text-base-content/70">
                  {service.shortDescription}
                </p>
              )}
            </div>

            <div className="space-y-3 text-sm text-base-content/80 flex-1">
              <p>{service.description}</p>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold text-base-content/90">
                    Rate
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ৳{service.rate}{" "}
                    <span className="text-xs text-base-content/70 font-normal">
                      / {service.rateType}
                    </span>
                  </p>
                </div>
                {service.category && (
                  <div>
                    <p className="font-semibold text-base-content/90">
                      Category
                    </p>
                    <p className="capitalize text-base-content/80">
                      {service.category}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/booking/${serviceId}`}
                className="btn btn-primary"
              >
                Book Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}