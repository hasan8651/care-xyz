import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="card bg-base-100 shadow">
      {service.image && (
        <figure>
       
          <Image src={service.image} alt={service.name} className="h-40 w-full object-cover" width={100} height={100} unoptimized />
        </figure>
      )}
      <div className="card-body">
        <h3 className="card-title">{service.name}</h3>
        <p>{service.shortDescription}</p>
        <p className="font-semibold">
          ৳{service.rate} / {service.rateType}
        </p>
        <div className="card-actions justify-end">
          <Link href={`/service/${service._id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}