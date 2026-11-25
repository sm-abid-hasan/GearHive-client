// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   console.warn("MONGODB_URI is not set. Copy .env.example to .env.local and add your MongoDB connection string.");
// }

// const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

// const globalForMongo = globalThis;
// if (!globalForMongo._gearhiveMongoClient) {
//   globalForMongo._gearhiveMongoClient = new MongoClient(uri);
// }

// export const mongoClient = globalForMongo._gearhiveMongoClient;
// export const db = mongoClient.db(process.env.MONGODB_DB || "gearhive");

import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  console.warn(
    "MONGODB_URI is not set. Copy .env.example to .env.local and add your MongoDB connection string.",
  );
}

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "gearhive";

const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

const globalForMongo = globalThis;

function createClient() {
  const client = new MongoClient(uri, options);


  client.on("close", () => {
    globalForMongo._gearhiveMongoClient = null;
    globalForMongo._gearhiveMongoClientPromise = null;
  });

  client.on("topologyClosed", () => {
    globalForMongo._gearhiveMongoClient = null;
    globalForMongo._gearhiveMongoClientPromise = null;
  });

  return client;
}

if (!globalForMongo._gearhiveMongoClient) {
  globalForMongo._gearhiveMongoClient = createClient();
  globalForMongo._gearhiveMongoClientPromise =
    globalForMongo._gearhiveMongoClient.connect();
}

export const mongoClient = globalForMongo._gearhiveMongoClient;
export const clientPromise = globalForMongo._gearhiveMongoClientPromise;
export const db = mongoClient.db(dbName);