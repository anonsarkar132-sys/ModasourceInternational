import { catchAsync } from "@/lib/catchAsync";
import { connectDB } from "@/lib/db";
import { ContactController } from "@/modules/contact/contact.controller";
import { NextRequest } from "next/server";

export const POST = catchAsync(async (req: NextRequest) => { await connectDB(); return ContactController.createContact(req); });
export const GET = catchAsync(async () => { await connectDB(); return ContactController.getAllContacts(); });