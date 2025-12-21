import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
  const { id } = params;
  const db = await getDb();
  const col = db.collection("services");

  // যদি slug হয়
  const service = await col.findOne({ slug: id });

  if (!service) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(service);
}