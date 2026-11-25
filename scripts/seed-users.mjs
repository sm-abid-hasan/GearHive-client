
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const fileName of [".env.local", ".env"]) {
  const filePath = join(root, fileName);
  if (!existsSync(filePath)) continue;

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || line.trim().startsWith("#")) continue;
    const value = match[2].replace(/^["']|["']$/g, "");
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing. Create .env.local first (see .env.example).");
  process.exit(1);
}

const DEMO_USERS = [
  {
    name: "GearHive Admin",
    email: process.env.SEED_ADMIN_EMAIL || "admin@gearhive.com",
    password: process.env.SEED_ADMIN_PASSWORD || "Admin@123",
    role: "admin",
  },
  { name: "Rafiq Hossain", email: "owner@gearhive.com", password: "Owner@123", role: "owner", phone: "+880 1711 000001", address: "Gulshan, Dhaka" },
  { name: "Tanvir Ahmed", email: "owner2@gearhive.com", password: "Owner@123", role: "owner", phone: "+880 1711 000002", address: "Agrabad, Chattogram" },
  { name: "Nadia Rahman", email: "customer@gearhive.com", password: "Customer@123", role: "customer", phone: "+880 1712 345678", address: "House 12, Road 5, Dhanmondi, Dhaka" },
];

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "gearhive");

const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "customer", input: false },
      phone: { type: "string", required: false },
      address: { type: "string", required: false },
    },
  },
});

try {
  for (const demo of DEMO_USERS) {
    const existing = await db.collection("user").findOne({ email: demo.email });

    if (!existing) {
      await auth.api.signUpEmail({ body: { name: demo.name, email: demo.email, password: demo.password } });
      console.log(`+ created ${demo.email}`);
    } else {
      console.log(`= already exists ${demo.email}`);
    }

   
    const changes = { role: demo.role };
    if (demo.phone) changes.phone = demo.phone;
    if (demo.address) changes.address = demo.address;
    await db.collection("user").updateOne({ email: demo.email }, { $set: changes });
  }

  console.log("\nDemo accounts are ready:");
  DEMO_USERS.forEach((demo) => console.log(`  ${demo.role.padEnd(8)} ${demo.email}  /  ${demo.password}`));
} catch (error) {
  console.error("Seeding users failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
