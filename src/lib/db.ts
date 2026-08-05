import mongoose from "mongoose";
import { Category } from "@/modules/category/category.model";

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

    // Drop the old globally-unique `name_1` index and create the new
    // compound `{ parent: 1, name: 1 }` unique index. This lets the same
    // subcategory name exist under different parents.
    await Category.syncIndexes();

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    console.error("Connection URI:", MONGODB_URI.replace(/\/\/.*@/, "//***@"));
    throw error;
  }
};
