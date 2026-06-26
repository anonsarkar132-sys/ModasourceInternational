import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { CategoryController } from "@/modules/category/category.controller";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => { 
  await connectDB(); 
  return CategoryController.createCategory(req); 
});

export const GET = catchAsync(async (req: NextRequest) => { 
  await connectDB(); 
  return CategoryController.getAllCategories(req); 
});