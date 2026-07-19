import { Category } from "./category.model";
import { ICategory } from "./category.interface";

const createCategory = async (payload: ICategory) =>
  await Category.create(payload);
const getAllCategories = async () => {
  return await Category.find()
    .populate("parent")
    .sort({ sortOrder: 1, createdAt: -1 });
};
// Mongoose warning theek kora holo
const updateCategory = async (id: string, payload: Partial<ICategory>) => {
  return await Category.findByIdAndUpdate(id, payload, {
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
