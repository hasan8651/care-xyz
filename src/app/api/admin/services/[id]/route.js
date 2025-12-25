import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req, props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

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

  if (
    !name ||
    !slug ||
    !shortDescription ||
    !description ||
    !rateType ||
    !rate
  ) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const db = await getDb();

  const result = await db.collection("services").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
        slug,
        category,
        shortDescription,
        description,
        rateType,
        rate: Number(rate),
        image,
      },
    }
  );

  if (!result.matchedCount) {
    return NextResponse.json(
      { message: "Service not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Service updated" });
}

export async function DELETE(req, props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;

  const db = await getDb();
  const result = await db
    .collection("services")
    .deleteOne({ _id: new ObjectId(id) });

  if (!result.deletedCount) {
    return NextResponse.json(
      { message: "Service not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Service deleted" });
}