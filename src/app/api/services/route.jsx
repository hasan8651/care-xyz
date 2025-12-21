import { NextResponse } from "next/server";
import { getServicesCollection } from "@/lib/db";

export async function GET() {
  const servicesCol = await getServicesCollection();
  const services = await servicesCol.find({}).toArray();
  return NextResponse.json(services);
}