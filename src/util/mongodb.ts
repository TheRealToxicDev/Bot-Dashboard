import { Db, MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_NAME } = process.env;

let db: Db;

if (!MONGODB_NAME || !MONGODB_URI)
  throw new Error("Missing MONGODB_NAME or MONGODB_URI in environment.");

export async function dbConnect() {
  if (db) return db;

  const client = await MongoClient.connect(MONGODB_URI!);
  const data = client.db(MONGODB_NAME);

  db = data;
  return db;
}
