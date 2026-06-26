import mongoose, { Schema, model } from "mongoose";
import { IPageContent } from "./pageContent.interface";

const pageContentSchema = new Schema<IPageContent>(
  {
    pageSlug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const PageContent = mongoose.models.PageContent || model<IPageContent>("PageContent", pageContentSchema);