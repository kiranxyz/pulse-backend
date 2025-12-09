import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db(process.env.MONGO_AUTH_DB);
console.log("Connected to MongoDB for Better Auth " + db.databaseName);
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  apiKey: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.FRONTEND_ORIGIN!],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    },
  },
});
