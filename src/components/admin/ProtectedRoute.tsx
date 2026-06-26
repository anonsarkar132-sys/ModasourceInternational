"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Jodi token na thake ebong login page-e na thake, tahole login-e pathiye dibo
    if (!token && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    }
    // Jodi login kora thake kintu login page-e ashte chay, dashboard-e pathiye dibo
    if (token && pathname.includes("/admin/login")) {
      router.push("/admin/dashboard");
    }
  }, [token, pathname, router]);

  // Hydration error thekanor jonno
  if (!mounted) return null;

  // Login page hole shudhu children (Form) dekhabe, sidebar dekhabe na
  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  // Baki shob admin page-e Sidebar ar Header soho dekhabe
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}