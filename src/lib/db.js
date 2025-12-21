import clientPromise from "./mongodb";

export async function getDb() {
  const client = await clientPromise;
  return client.db("care_xyz"); // DB নাম
}

export async function getUsersCollection() {
  const db = await getDb();
  return db.collection("users");
}

export async function getServicesCollection() {
  const db = await getDb();
  return db.collection("services");
}

export async function getBookingsCollection() {
  const db = await getDb();
  return db.collection("bookings");
}