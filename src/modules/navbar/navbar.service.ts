import { Navbar } from "./navbar.model";
import { INavbar } from "./navbar.interface";

const getNavbar = async () => await Navbar.findOne();
const updateNavbar = async (payload: INavbar) => {
  const existing = await Navbar.findOne();
  if (existing) return await Navbar.findByIdAndUpdate(existing._id, payload, { new: true });
  return await Navbar.create(payload);
};

export const NavbarService = { getNavbar, updateNavbar };