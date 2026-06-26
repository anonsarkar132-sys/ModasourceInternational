import { NextRequest } from "next/server";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../lib/sendResponse";

const login = async (req: NextRequest) => {
  const body = await req.json();
  const result = await AuthService.loginAdmin(body.password);

  return sendResponse({
    statusCode: 200,
    success: true,
    message: "Admin logged in successfully",
    data: result,
  });
};

export const AuthController = { login };