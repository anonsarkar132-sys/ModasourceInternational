import { Schema, model, models } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Compound unique index: the same subcategory name is allowed under different
// parents, but not twice under the same parent.
// (Main categories have parent = null, so two main categories with the same
// name are still blocked.)
categorySchema.index({ parent: 1, name: 1 }, { unique: true });

export const Category =
  models.Category || model<ICategory>("Category", categorySchema);
