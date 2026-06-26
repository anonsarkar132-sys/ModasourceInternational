import { NextRequest } from "next/server";
import { PageContentService } from "./pageContent.service";
import { pageContentValidationSchema } from "./pageContent.validation";
import { sendResponse } from "../../lib/sendResponse";

const getPageContent = async (req: NextRequest, { params }: { params: Promise<{ page: string }> }) => {
  const resolvedParams = await params;
  const result = await PageContentService.getPageContent(resolvedParams.page);
  return sendResponse({ statusCode: 200, success: true, message: "Page content fetched", data: result });
};

const updatePageContent = async (req: NextRequest, { params }: { params: Promise<{ page: string }> }) => {
  const body = await req.json();
  const resolvedParams = await params;
  const parsedBody = pageContentValidationSchema.parse({ ...body, pageSlug: resolvedParams.page });
  const result = await PageContentService.updatePageContent(resolvedParams.page, parsedBody);
  return sendResponse({ statusCode: 200, success: true, message: "Page content updated", data: result });
};

export const PageContentController = { getPageContent, updatePageContent };