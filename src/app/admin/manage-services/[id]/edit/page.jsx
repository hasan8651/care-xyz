import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import EditServiceForm from "@/components/EditServiceForm";

export default async function EditServicePage(props) {
  const { id } = await props.params;

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

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

  const plainService = {
    ...service,
    _id: service._id.toString(),
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Service</h1>
      <EditServiceForm service={plainService} />
    </div>
  );
}