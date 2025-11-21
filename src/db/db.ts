import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
try {
  const mongoURI = process.env.MONGODB_URI;
  console.log(mongoURI);
  if (!mongoURI) throw new Error("No Mongo DB Connection String present");
  const client = await mongoose.connect(mongoURI, { dbName: "pulse" });
  console.log(
    `Connected to MongoDB @ ${client.connection.host} - ${client.connection.name}`
  );
} catch (error) {
  console.log(error);
  process.exit(1);
}
