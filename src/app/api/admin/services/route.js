import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    name,
    slug,
    category,
    shortDescription,
    description,
    rateType,
    rate,
    image,
  } = body;

  if (!name || !slug || !shortDescription || !description || !rateType || !rate) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const db = await getDb();
  await db.collection("services").insertOne({
    name,
    slug,
    category,
    shortDescription,
    description,
    rateType,
    rate: Number(rate),
    image,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Service created" }, { status: 201 });
}