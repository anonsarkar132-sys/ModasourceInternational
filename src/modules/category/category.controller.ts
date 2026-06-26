import { NextRequest } from "next/server";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../lib/sendResponse";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { Category } from "./category.model";

const createCategory = async (req: NextRequest) => {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name = "", slug = "", parent: string | null = null;
    let imageUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name   = formData.get("name")   as string;
      slug   = formData.get("slug")   as string;
      parent = (formData.get("parent") as string) || null;
      const file = formData.get("file") as File | null;

      if (file && file.size > 0) {
        const buffer   = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads", "categories");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        imageUrl = `/uploads/categories/${filename}`;
      }
    } else {
      const body = await req.json();
      name   = body.name;
      slug   = body.slug;
      parent = body.parent || null;
      imageUrl = body.image || "";
    }

    if (!name || !slug) {
      return sendResponse({ statusCode: 400, success: false, message: "Name and slug are required", data: null });
    }

    const result = await Category.create({
      name,
      slug,
      image: imageUrl,
      parent: parent || null,
    });

    return sendResponse({ statusCode: 201, success: true, message: "Category created", data: result });
  } catch (error: any) {
    console.error("Category create error:", error);
    return sendResponse({ statusCode: 500, success: false, message: error?.message || "Failed", data: null });
  }
};

const getAllCategories = async () => {
  const result = await CategoryService.getAllCategories();
  return sendResponse({ statusCode: 200, success: true, message: "Categories fetched", data: result });
};

const updateCategory = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const body = await req.json();
  const { id } = await params;
  const result = await CategoryService.updateCategory(id, body);
  return sendResponse({ statusCode: 200, success: true, message: "Category updated", data: result });
};

const deleteCategory = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const result = await CategoryService.deleteCategory(id);
  return sendResponse({ statusCode: 200, success: true, message: "Category deleted", data: result });
};

export const CategoryController = { createCategory, getAllCategories, updateCategory, deleteCategory };