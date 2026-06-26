import { NextRequest } from "next/server";
import { ContactService } from "./contact.service";
import { contactValidationSchema } from "./contact.validation";
import { sendResponse } from "../../lib/sendResponse";

const createContact = async (req: NextRequest) => {
  const body = await req.json();
  const parsedBody = contactValidationSchema.parse(body);
  const result = await ContactService.createContact(parsedBody);
  return sendResponse({ statusCode: 201, success: true, message: "Message sent successfully", data: result });
};

const getAllContacts = async () => {
  const result = await ContactService.getAllContacts();
  return sendResponse({ statusCode: 200, success: true, message: "Contacts fetched successfully", data: result });
};

// Delete option add kora holo (Next.js 15 er await params soho)
const deleteContact = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const result = await ContactService.deleteContact(resolvedParams.id);
  return sendResponse({ statusCode: 200, success: true, message: "Message deleted", data: result });
};

export const ContactController = { createContact, getAllContacts, deleteContact };