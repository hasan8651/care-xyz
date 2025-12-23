import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nid, name, email, contact, password } = body;

    if (!email || !password || !name || !nid || !contact) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }


    // password regex korte hobe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { message: "Password must be 6+ characters with upper & lower case" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await hash(password, 10);

    const user = {
      nid,
      name,
      email,
      contact,
      password: hashed,
      role: "user",
      createdAt: new Date(),
    };

    await db.collection("users").insertOne(user);

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}