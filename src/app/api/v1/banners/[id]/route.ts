import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { BannerController } from "@/modules/banner/banner.controller";
import { NextRequest } from "next/server";

export const GET = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return BannerController.getSingleBanner(req, context); });
export const PUT = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return BannerController.updateBanner(req, context); });
export const DELETE = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return BannerController.deleteBanner(req, context); });