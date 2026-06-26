
import { NextRequest, NextResponse } from "next/server";

// Next.js App Router er jonno async error catcher
export const catchAsync = (fn: Function) => {
  return async (req: NextRequest, context: any) => {
    try {
      return await fn(req, context);
    } catch (error: any) {
      console.error("API Error:", error);
      return NextResponse.json(
        { success: false, message: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};