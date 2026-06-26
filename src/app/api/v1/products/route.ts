
import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { ProductController } from "@/modules/product/product.controller";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => {
  await connectDB();
  return ProductController.createProduct(req);
});

export const GET = catchAsync(async (req: NextRequest) => {
  await connectDB();
  return ProductController.getAllProducts(req);
});