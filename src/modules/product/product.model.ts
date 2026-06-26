import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || model<IProduct>("Product", productSchema);