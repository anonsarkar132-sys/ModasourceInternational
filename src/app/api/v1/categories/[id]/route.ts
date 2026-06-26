import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { CategoryController } from "@/modules/category/category.controller";
import { NextRequest } from "next/server";

export const PUT = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return CategoryController.updateCategory(req, context); });
export const DELETE = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return CategoryController.deleteCategory(req, context); });