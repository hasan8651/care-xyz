"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadToImgbb } from "@/lib/uploadImage";

export default function EditServiceForm({ service }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: service.name || "",
    slug: service.slug || "",
    category: service.category || "",
    shortDescription: service.shortDescription || "",
    description: service.description || "",
    rateType: service.rateType || "hour",
    rate: service.rate || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(service.image || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = service.image || "";

      if (imageFile) {
        imageUrl = await uploadToImgbb(imageFile);
      }

      const res = await fetch(`/api/admin/services/${service._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rate: Number(form.rate),
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update service");
        setLoading(false);
        return;
      }

      toast.success("Service updated");
      router.push("/admin/manage-services");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 card bg-base-100 p-4">
      <input
        type="text"
        placeholder="Service Name"
        className="input input-bordered w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Slug (e.g. baby-care)"
        className="input input-bordered w-full"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Category"
        className="input input-bordered w-full"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Short Description"
        className="input input-bordered w-full"
        value={form.shortDescription}
        onChange={(e) =>
          setForm({ ...form, shortDescription: e.target.value })
        }
        required
      />
      <textarea
        placeholder="Full Description"
        className="textarea textarea-bordered w-full"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        required
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          className="select select-bordered w-full"
          value={form.rateType}
          onChange={(e) => setForm({ ...form, rateType: e.target.value })}
        >
          <option value="hour">Hour</option>
          <option value="day">Day</option>
        </select>
        <input
          type="number"
          min="0"
          placeholder="Rate (৳)"
          className="input input-bordered w-full"
          value={form.rate}
          onChange={(e) => setForm({ ...form, rate: e.target.value })}
          required
        />
      </div>

   
      <div className="space-y-2">
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-full object-cover rounded"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={handleImageChange}
        />
        <p className="text-xs opacity-70">
             </p>
      </div>

      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
}