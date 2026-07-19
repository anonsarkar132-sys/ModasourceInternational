import { NextRequest } from "next/server";
import { CategoryService } from "./category.service";
import { sendResponse } from "../../lib/sendResponse";
import { deleteUploadedFile } from "../../lib/deleteFile";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";
import { Category } from "./category.model";

const createCategory = async (req: NextRequest) => {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name = "",
      slug = "",
      parent: string | null = null,
      sortOrder = 0;
    let imageUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = formData.get("name") as string;
      slug = formData.get("slug") as string;
      parent = (formData.get("parent") as string) || null;
      const sortOrderVal = formData.get("sortOrder");
      sortOrder = sortOrderVal ? Number(sortOrderVal as string) : 0;
      const file = formData.get("file") as File | null;

      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "categories"
        );
        if (!fs.existsSync(uploadDir))
          fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        imageUrl = `/uploads/categories/${filename}`;
      }
    } else {
      const body = await req.json();
      name = body.name;
      slug = body.slug;
      parent = body.parent || null;
      imageUrl = body.image || "";
      sortOrder = body.sortOrder !== undefined ? Number(body.sortOrder) : 0;
    }

    if (!name || !slug) {
      return sendResponse({
        statusCode: 400,
        success: false,
        message: "Name and slug are required",
        data: null,
      });
    }

    const result = await Category.create({
      name,
      slug,
      image: imageUrl,
      parent: parent || null,
      sortOrder,
    });

    return sendResponse({
      statusCode: 201,
      success: true,
      message: "Category created",
      data: result,
    });
  } catch (error: any) {
    console.error("Category create error:", error);
    return sendResponse({
      statusCode: 500,
      success: false,
      message: error?.message || "Failed",
      data: null,
    });
  }
};

const getAllCategories = async () => {
  const result = await CategoryService.getAllCategories();
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Categories fetched",
    data: result,
  });
};

const updateCategory = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const contentType = req.headers.get("content-type") || "";
    let updateData: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      updateData.name = formData.get("name") as string;
      updateData.slug = formData.get("slug") as string;
      updateData.parent = (formData.get("parent") as string) || null;
      const sortOrderVal = formData.get("sortOrder");
      if (sortOrderVal !== null && sortOrderVal !== "") {
        updateData.sortOrder = Number(sortOrderVal as string);
      }
      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        // Delete old image if it exists
        const existing = await Category.findById(id);
        if (existing?.image) {
          deleteUploadedFile(existing.image);
        }

        // Upload new image
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const uploadDir = path.join(
          process.cwd(),
          "public",
          "uploads",
          "categories"
        );
        if (!fs.existsSync(uploadDir))
          fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(path.join(uploadDir, filename), buffer);
        updateData.image = `/uploads/categories/${filename}`;
      }
    } else {
      const body = await req.json();
      // Only set fields that are actually provided in the request body
      if (body.name !== undefined) updateData.name = body.name;
      if (body.slug !== undefined) updateData.slug = body.slug;
      if (body.parent !== undefined) updateData.parent = body.parent || null;
      if (body.sortOrder !== undefined)
        updateData.sortOrder = Number(body.sortOrder);
    }

    const result = await CategoryService.updateCategory(id, updateData);
    if (!result) {
      return sendResponse({
        statusCode: 404,
        success: false,
        message: "Category not found",
        data: null,
      });
    }
    return sendResponse({
      statusCode: 200,
      success: true,
      message: "Category updated",
      data: result,
    });
  } catch (error: any) {
    console.error("Category update error:", error);
    return sendResponse({
      statusCode: 500,
      success: false,
      message: error?.message || "Failed to update category",
      data: null,
    });
  }
};

const deleteCategory = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  // Fetch category first to get image URL
  const category = await Category.findById(id);
  if (category && category.image) {
    deleteUploadedFile(category.image);
  }

  const result = await CategoryService.deleteCategory(id);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Category deleted",
    data: result,
  });
};

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
