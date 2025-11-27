import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) throw new Error("No MongoDB connection string found in env");

export const connectDB = async () => {
  try {
    const client = await mongoose.connect(mongoURI, { dbName: "pulse" });
    console.log(
      `Connected to MongoDB (Mongoose) @ ${client.connection.host} - ${client.connection.name}`
    );
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  }
};
