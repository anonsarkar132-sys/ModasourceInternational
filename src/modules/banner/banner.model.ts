import { Schema, model, models } from "mongoose";
import { IBanner } from "./banner.interface";

const bannerSchema = new Schema<IBanner>(
  {
    title:     { type: String },
    subtitle:  { type: String },
    mediaUrl:  { type: String, required: true },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ পুরনো cached model delete করে নতুন schema দিয়ে rebuild
delete (models as any).Banner;
export const Banner = model<IBanner>("Banner", bannerSchema);