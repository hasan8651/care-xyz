import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import AdminServiceRow from "@/components/AdminServiceRow";

export default async function ManageServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const db = await getDb();
  const rawServices = await db
    .collection("services")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const services = rawServices.map((s) => ({
    ...s,
    _id: s._id.toString(),
    createdAtText: s.createdAt
      ? s.createdAt.toLocaleString("en-GB", {
          timeZone: "Asia/Dhaka",
        })
      : "",
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Rate</th>
              <th>Image</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <AdminServiceRow key={service._id} service={service} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}