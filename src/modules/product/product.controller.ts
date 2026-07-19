import { NextRequest } from "next/server";
import { ProductService } from "./product.service";
import { sendResponse } from "../../lib/sendResponse";
import { deleteMultipleFiles } from "../../lib/deleteFile";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const createProduct = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const isFeatured = formData.get("isFeatured") === "true";

    // Multiple image files
    const files = formData.getAll("images") as File[];

    if (!name || !slug || !description || !category) {
      return sendResponse({
        statusCode: 400,
        success: false,
        message: "All fields are required",
        data: null,
      });
    }
    if (!files || files.length === 0 || files[0].size === 0) {
      return sendResponse({
        statusCode: 400,
        success: false,
        message: "At least one image is required",
        data: null,
      });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const imageUrls: string[] = [];
    for (const file of files) {
      if (file.size === 0) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}-${file.name.replace(/\s/g, "_")}`;
      await writeFile(path.join(uploadDir, filename), buffer);
      imageUrls.push(`/uploads/products/${filename}`);
    }

    const result = await ProductService.createProduct({
      name,
      slug,
      description,
      category,
      images: imageUrls,
      isFeatured,
    });

    return sendResponse({
      statusCode: 201,
      success: true,
      message: "Product created",
      data: result,
    });
  } catch (error: any) {
    console.error("Product create error:", error);
    return sendResponse({
      statusCode: 500,
      success: false,
      message: error?.message || "Failed",
      data: null,
    });
  }
};

const getAllProducts = async (req: NextRequest) => {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const result = await ProductService.getAllProducts(category || undefined);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Products fetched",
    data: result,
  });
};

const getSingleProduct = async (
  req: NextRequest,
  { params }: { params: Promise<any> }
) => {
  const { id, slug } = await params;
  const result = await ProductService.getSingleProduct(id || slug);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Product fetched",
    data: result,
  });
};

const updateProduct = async (
  req: NextRequest,
  { params }: { params: Promise<any> }
) => {
  const body = await req.json();
  const { id, slug } = await params;
  const result = await ProductService.updateProduct(id || slug, body);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Product updated",
    data: result,
  });
};

const deleteProduct = async (
  req: NextRequest,
  { params }: { params: Promise<any> }
) => {
  const { id, slug } = await params;
  const identifier = id || slug;

  // Fetch product first to get image URLs
  const product = await ProductService.getSingleProduct(identifier);
  if (product && product.images) {
    deleteMultipleFiles(product.images);
  }

  const result = await ProductService.deleteProduct(identifier);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Product deleted",
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
