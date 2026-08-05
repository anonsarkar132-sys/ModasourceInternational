import { Category } from "./category.model";
import { ICategory } from "./category.interface";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/**
 * Generates a unique slug. Since the slug index is globally unique but
 * subcategory names are not (same name may exist under different parents),
 * we append a numeric suffix (e.g. "shirt", "shirt-2", "shirt-3") until the
 * slug no longer collides.
 */
const generateUniqueSlug = async (
  baseSlug: string,
  ignoreId?: string,
): Promise<string> => {
  let slug = baseSlug;
  let counter = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const query: { slug: string; _id?: { $ne: string } } = { slug };
    if (ignoreId) query._id = { $ne: ignoreId };
    const existing = await Category.findOne(query).select("_id").lean();
    if (!existing) return slug;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const createCategory = async (payload: ICategory) => {
  const name = payload.name.trim();
  const baseSlug = payload.slug ? slugify(payload.slug) : slugify(name);
  const slug = await generateUniqueSlug(baseSlug);
  return await Category.create({ ...payload, name, slug });
};

const getAllCategories = async () => {
  return await Category.find()
    .populate("parent")
    .sort({ sortOrder: 1, createdAt: -1 });
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  const updateData = { ...payload };

  if (updateData.name) {
    updateData.name = updateData.name.trim();
  }

  // If the slug is being changed, make sure it stays unique.
  if (updateData.slug) {
    const baseSlug = slugify(updateData.slug);
    updateData.slug = await generateUniqueSlug(baseSlug, id);
  }

  return await Category.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });
};

const deleteCategory = async (id: string) =>
  await Category.findByIdAndDelete(id);

export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
