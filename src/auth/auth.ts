import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Console } from "console";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db(process.env.MONGO_AUTH_DB);
console.log("Connected to MongoDB for Better Auth " + db.databaseName);
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.FRONTEND_ORIGIN!],
  cookies: {
    session: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  },
});
