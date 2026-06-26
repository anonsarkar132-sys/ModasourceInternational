"use client";

import { Bell, UserCircle } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-neutral-800">Admin Portal</h2>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-neutral-500 hover:text-amber-600 transition-colors">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <UserCircle size={28} className="text-neutral-700" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-neutral-800">Admin</span>
            <span className="text-xs text-neutral-500">Superuser</span>
          </div>
        </div>
      </div>
    </header>
  );
}