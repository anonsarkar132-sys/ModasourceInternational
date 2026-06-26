"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, Menu, Tags, Package, LogOut, FileText, Mail, Briefcase } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Banners", href: "/admin/banner", icon: ImageIcon },
  { name: "Navbar", href: "/admin/navbar", icon: Menu },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Partner Brands", href: "/admin/brands", icon: Briefcase },
  { name: "Page Content", href: "/admin/page-content", icon: FileText },
  { name: "Messages", href: "/admin/contact", icon: Mail },
]; 

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-neutral-950 text-white min-h-screen flex flex-col border-r border-neutral-800">
      <div className="h-20 flex items-center px-6 border-b border-neutral-800">
        <span className="text-xl font-serif tracking-widest">
          MODA<span className="text-amber-600">ADMIN</span>
        </span>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                isActive ? "bg-amber-600 text-white" : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-neutral-900 rounded-md transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}