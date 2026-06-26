import mongoose, { Schema, model } from "mongoose";
import { INavbar } from "./navbar.interface";

const navbarItemSchema = new Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  subItems: [{ label: String, href: String }]
});

const navbarSchema = new Schema<INavbar>({ items: [navbarItemSchema] }, { timestamps: true });

export const Navbar = mongoose.models.Navbar || model<INavbar>("Navbar", navbarSchema);