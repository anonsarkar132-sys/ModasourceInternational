import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { NavbarController } from "@/modules/navbar/navbar.controller";
import { NextRequest } from "next/server";

export const GET = catchAsync(async () => { await connectDB(); return NavbarController.getNavbar(); });
export const PUT = catchAsync(async (req: NextRequest) => { await connectDB(); return NavbarController.updateNavbar(req); });