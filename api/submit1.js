import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

// Prevent multiple connections in Vercel
if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, whatsapp_updates } = req.body;

    const client = await clientPromise;
    const db = client.db("estimatesDB");
    const collection = db.collection("submissions");

    await collection.insertOne({
      name,
      email,
      phone,
      whatsapp_updates,
      createdAt: new Date(),
    });

    return res.status(200).json({ message: "Data stored successfully" });
  } catch (err) {
    console.error("MongoDB Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

