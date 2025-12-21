import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getDb } from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login?callbackUrl=/my-bookings");

  const db = await getDb();
  const col = db.collection("bookings");

  const bookings = await col
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 && <p>No bookings yet.</p>}

      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b._id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{b.serviceName}</h2>
              <p>
                Duration: {b.duration} {b.unit}
              </p>
              <p>
                Location: {b.location.division}, {b.location.district},{" "}
                {b.location.city}, {b.location.area}
              </p>
              <p>Total: {b.totalCost} ৳</p>
              <p>Status: {b.status}</p>
              <div className="card-actions justify-end">
                {/* Cancel button (PATCH API) */}
                {b.status === "Pending" && (
                  <form
                    action={`/api/bookings/${b._id.toString()}`}
                    method="POST"
                  >
                    {/* app router এ server actions ব্যবহার করতেও পারেন,
                      এখানে simplicity এর জন্য plain form দেখালাম */}
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}