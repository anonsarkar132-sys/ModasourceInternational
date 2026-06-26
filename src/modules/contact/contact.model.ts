import mongoose, { Schema, model } from "mongoose";
import { IContact } from "./contact.interface";

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "reviewed", "replied"], default: "pending" },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || model<IContact>("Contact", contactSchema);