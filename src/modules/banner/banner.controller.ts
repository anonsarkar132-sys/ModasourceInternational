import { NextRequest } from "next/server";
import { BannerService } from "./banner.service";
import { sendResponse } from "../../lib/sendResponse";
import { deleteUploadedFile } from "../../lib/deleteFile";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

const createBanner = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      return sendResponse({
        statusCode: 400,
        success: false,
        message: "File is required",
        data: null,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ mediaType detect
    const mediaType: "image" | "video" = file.type.startsWith("video/")
      ? "video"
      : "image";

    // ✅ Unique filename
    const originalName = file.name.replace(/\s/g, "_");
    const filename = `${Date.now()}-${originalName}`;

    // ✅ Upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(path.join(uploadDir, filename), buffer);

    const mediaUrl = `/uploads/banners/${filename}`;

    // ✅ Service দিয়ে create — interface match করছে
    const result = await BannerService.createBanner({
      title,
      subtitle,
      mediaUrl,
      mediaType,
      isActive: true,
    });

    return sendResponse({
      statusCode: 201,
      success: true,
      message: "Banner uploaded successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Banner upload error:", error);
    return sendResponse({
      statusCode: 500,
      success: false,
      message: error?.message || "Upload failed",
      data: null,
    });
  }
};

const getAllBanners = async () => {
  const result = await BannerService.getAllBanners();
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Banners fetched",
    data: result,
  });
};

const getSingleBanner = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const result = await BannerService.getSingleBanner(id);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Banner fetched",
    data: result,
  });
};

const updateBanner = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const body = await req.json();
  const { id } = await params;
  const result = await BannerService.updateBanner(id, body);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Banner updated",
    data: result,
  });
};

const deleteBanner = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  // Fetch banner first to get media URL
  const banner = await BannerService.getSingleBanner(id);
  if (banner && banner.mediaUrl) {
    deleteUploadedFile(banner.mediaUrl);
  }

  const result = await BannerService.deleteBanner(id);
  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Banner deleted",
    data: result,
  });
};

export const BannerController = {
  createBanner,
  getAllBanners,
  getSingleBanner,
  updateBanner,
  deleteBanner,
};
