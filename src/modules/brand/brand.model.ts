import { Schema, model, models } from "mongoose";

export interface IBrand {
  name: string;
  logoUrl: string;
}

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Brand = models.Brand || model<IBrand>("Brand", brandSchema);