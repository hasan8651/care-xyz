import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getDb } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/");

  const db = await getDb();
  const col = db.collection("bookings");

  const bookings = await col
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard – Payment Histories
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Service</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.userEmail}</td>
                <td>{b.serviceName}</td>
                <td>{b.totalCost} ৳</td>
                <td>{b.status}</td>
                <td>{b.paymentStatus}</td>
                <td>{new Date(b.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}