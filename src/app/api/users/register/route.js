import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nid, name, email, contact, password } = body;

    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Password validation: 6+ char, 1 uppercase, 1 lowercase
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passRegex.test(password)) {
      return NextResponse.json(
        {
          message:
            "Password must be at least 6 characters, with 1 uppercase & 1 lowercase letter",
        },
        { status: 400 }
      );
    }

    const db = await getDb();
    const usersCol = db.collection("users");

    const existing = await usersCol.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      nid,
      name,
      email,
      contact,
      passwordHash,
      role: "user",
      createdAt: new Date(),
    };

    await usersCol.insertOne(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}