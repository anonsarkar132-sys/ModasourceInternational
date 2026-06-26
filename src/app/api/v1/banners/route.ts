import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { BannerController } from "@/modules/banner/banner.controller";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => { await connectDB(); return BannerController.createBanner(req); });
export const GET = catchAsync(async () => { await connectDB(); return BannerController.getAllBanners(); });