
import { NextResponse } from "next/server";

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null;
};

export const sendResponse = <T>(data: ApiResponse<T>) => {
  return NextResponse.json(
    { success: data.success, message: data.message, data: data.data },
    { status: data.statusCode }
  );
};