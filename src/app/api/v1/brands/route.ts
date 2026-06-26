import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { BrandController } from "@/modules/brand/brand.controller";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => { 
  await connectDB(); 
  return BrandController.createBrand(req); 
});

export const GET = catchAsync(async () => { 
  await connectDB(); 
  return BrandController.getAllBrands(); 
});