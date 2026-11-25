
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI is not set. Copy .env.example to .env.local and add your MongoDB connection string.");
}


const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";


const globalForMongo = globalThis;
if (!globalForMongo._gearhiveMongoClient) {
  globalForMongo._gearhiveMongoClient = new MongoClient(uri);
}

export const mongoClient = globalForMongo._gearhiveMongoClient;
export const db = mongoClient.db(process.env.MONGODB_DB || "gearhive");
