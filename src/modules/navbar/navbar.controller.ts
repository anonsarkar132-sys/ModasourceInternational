import { NextRequest } from "next/server";
import { NavbarService } from "./navbar.service";
import { navbarValidationSchema } from "./navbar.validation";
import { sendResponse } from "../../lib/sendResponse";

const getNavbar = async () => {
  const result = await NavbarService.getNavbar();
  return sendResponse({ statusCode: 200, success: true, message: "Navbar fetched", data: result });
};

const updateNavbar = async (req: NextRequest) => {
  const body = await req.json();
  const parsedBody = navbarValidationSchema.parse(body);
  const result = await NavbarService.updateNavbar(parsedBody);
  return sendResponse({ statusCode: 200, success: true, message: "Navbar updated", data: result });
};

export const NavbarController = { getNavbar, updateNavbar };