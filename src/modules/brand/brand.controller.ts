import { NextRequest } from "next/server";
import { Brand } from "./brand.model";
import { sendResponse } from "../../lib/sendResponse";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const createBrand = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as File | null;

    if (!name) {
      return sendResponse({
        statusCode: 400,
        success: false,
        message: "Name is required",
        data: null,
      });
    }
    if (!file || file.size === 0) {
      return sendResponse({
        statusCode: 400,
        success: false,
        message: "Logo image is required",
        data: null,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "brands");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const logoUrl = `/uploads/brands/${filename}`;
    const result = await Brand.create({ name, logoUrl });

    return sendResponse({
      statusCode: 201,
      success: true,
      message: "Brand added",
      data: result,
    });
  } catch (error: any) {
    console.error("Brand create error:", error);
    return sendResponse({
      statusCode: 500,
      success: false,
      message: error?.message || "Failed",
      data: null,
    });
  }
};

const getAllBrands = async () => {
  const result = await Brand.find().sort({ createdAt: -1 });
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Brands fetched",
    data: result,
  });
};

const deleteBrand = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const result = await Brand.findByIdAndDelete(id);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Brand deleted",
    data: result,
  });
};

export const BrandController = { createBrand, getAllBrands, deleteBrand };
