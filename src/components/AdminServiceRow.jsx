"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminServiceRow({ service }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm(`Delete service "${service.name}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/services/${service._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete service");
        return;
      }

      toast.success("Service deleted");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <tr>
      <td>{service.name}</td>
      <td>{service.category || "-"}</td>
      <td>
        ৳{service.rate} / {service.rateType}
      </td>
      <td>
        {service.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.image}
            alt={service.name}
            className="h-10 w-16 object-cover rounded"
          />
        ) : (
          <span className="text-xs opacity-60">No image</span>
        )}
      </td>
      <td>{service.createdAtText}</td>
      <td>
        <div className="flex gap-2">
          <a
            href={`/admin/manage-services/${service._id}/edit`}
            className="btn btn-xs btn-outline"
          >
            Edit
          </a>
          <button
            className="btn btn-xs btn-error"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}