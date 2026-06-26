import { Product } from "./product.model";
import { IProduct } from "./product.interface";

const createProduct = async (payload: IProduct) => await Product.create(payload);

const getAllProducts = async (categoryQuery?: string) => {
  const filter = categoryQuery ? { category: categoryQuery } : {};
  return await Product.find(filter).sort({ createdAt: -1 });
};

// ID ba Slug jeta asbe, sheta diyei khujbe
const getSingleProduct = async (identifier: string) => {
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    return await Product.findById(identifier);
  }
  return await Product.findOne({ slug: identifier });
};

const updateProduct = async (identifier: string, payload: Partial<IProduct>) => {
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    return await Product.findByIdAndUpdate(identifier, payload, { returnDocument: 'after' });
  }
  return await Product.findOneAndUpdate({ slug: identifier }, payload, { returnDocument: 'after' });
};

const deleteProduct = async (identifier: string) => {
  if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
    return await Product.findByIdAndDelete(identifier);
  }
  return await Product.findOneAndDelete({ slug: identifier });
};

export const ProductService = { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };