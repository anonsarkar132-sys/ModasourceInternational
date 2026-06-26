"use client";

import { ImageIcon, Menu, Tags, Package } from "lucide-react";

const stats = [
  { title: "Total Banners", value: "3", icon: ImageIcon, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Total Categories", value: "5", icon: Tags, color: "text-green-600", bg: "bg-green-100" },
  { title: "Total Products", value: "24", icon: Package, color: "text-amber-600", bg: "bg-amber-100" },
  { title: "Navbar Items", value: "6", icon: Menu, color: "text-purple-600", bg: "bg-purple-100" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-800">Dashboard Overview</h1>
        <p className="text-neutral-500 text-sm mt-1">Welcome back to Moda Source Admin Panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-neutral-800">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 mt-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Quick Actions</h2>
        <p className="text-sm text-neutral-600">
          Use the sidebar on the left to navigate through different sections. You can manage your website's hero banners, navigation menu, product categories, and the product catalog directly from this portal.
        </p>
      </div>
    </div>
  );
}