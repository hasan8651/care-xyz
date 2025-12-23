import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const db = await getDb();
  const service = await db
    .collection("services")
    .findOne({ _id: new ObjectId(params.id) });

  if (!service) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(service);
}