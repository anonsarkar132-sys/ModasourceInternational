import { catchAsync } from "@/lib/catchAsync";
import { AuthController } from "@/modules/auth/auth.controller";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => {
  return AuthController.login(req);
});