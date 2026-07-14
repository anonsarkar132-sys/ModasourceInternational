import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    console.error("Connection URI:", MONGODB_URI.replace(/\/\/.*@/, "//***@"));
    throw error;
  }
};
