"use client";

import { uploadToImgbb } from "@/lib/uploadImage";
import { useState } from "react";
import toast from "react-hot-toast";


export default function AddServiceForm() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    rateType: "hour",
    rate: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadToImgbb(imageFile);
      }

      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rate: Number(form.rate),
          image: imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to create service");
        setLoading(false);
        return;
      }

      toast.success("Service created");
      setForm({
        name: "",
        slug: "",
        category: "",
        shortDescription: "",
        description: "",
        rateType: "hour",
        rate: "",
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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
        placeholder="Category (baby / elderly / sick)"
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

      <input
        type="file"
        accept="image/*"
        className="file-input file-input-bordered w-full"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />

      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Add Service"}
      </button>
    </form>
  );
}