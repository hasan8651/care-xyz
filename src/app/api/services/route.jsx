import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const services = await db.collection("services").find({}).toArray();
  return NextResponse.json(services);
}