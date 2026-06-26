import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { PageContentController } from "@/modules/page-content/pageContent.controller";
import { NextRequest } from "next/server";

export const GET = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return PageContentController.getPageContent(req, context); });
export const PUT = catchAsync(async (req: NextRequest, context: any) => { await connectDB(); return PageContentController.updatePageContent(req, context); });