import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { ProductController } from "@/modules/product/product.controller";
import { NextRequest, NextResponse } from "next/server";

export const GET = catchAsync(async (req: NextRequest, context: any) => {
  await connectDB();
  return ProductController.getSingleProduct(req, context);
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    return await ProductController.updateProduct(req, { params });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    return await ProductController.deleteProduct(req, { params });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}