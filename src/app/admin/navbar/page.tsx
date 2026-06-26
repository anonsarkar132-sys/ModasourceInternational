"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Menu, Save, Link as LinkIcon } from "lucide-react";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: SubItem[];
}

export default function NavbarAdminPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch Existing Navbar Data
  const fetchNavbar = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/navbar");
      const data = await res.json();
      if (data.success && data.data) {
        setNavItems(data.data.items || []);
      } else {
        // Jodi database e kichu na thake, tahole default ekta list diye dibo
        setNavItems([
          { label: "About Us", href: "/about" },
          { label: "Our Services", href: "/services" },
          { label: "Products", href: "/products", subItems: [
            { label: "Menswear", href: "/products/menswear" },
            { label: "Womenswear", href: "/products/womenswear" }
          ]},
          { label: "ESG", href: "/esg" },
          { label: "Contact Us", href: "/contact" }
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch navbar", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavbar();
  }, []);

  // Handlers for Main Links
  const addMainLink = () => {
    setNavItems([...navItems, { label: "", href: "" }]);
  };

  const removeMainLink = (index: number) => {
    const updated = [...navItems];
    updated.splice(index, 1);
    setNavItems(updated);
  };

  const updateMainLink = (index: number, field: "label" | "href", value: string) => {
    const updated = [...navItems];
    updated[index][field] = value;
    setNavItems(updated);
  };

  // Handlers for Sub Links (Dropdowns)
  const addSubLink = (mainIndex: number) => {
    const updated = [...navItems];
    if (!updated[mainIndex].subItems) {
      updated[mainIndex].subItems = [];
    }
    updated[mainIndex].subItems!.push({ label: "", href: "" });
    setNavItems(updated);
  };

  const removeSubLink = (mainIndex: number, subIndex: number) => {
    const updated = [...navItems];
    updated[mainIndex].subItems!.splice(subIndex, 1);
    setNavItems(updated);
  };

  const updateSubLink = (mainIndex: number, subIndex: number, field: "label" | "href", value: string) => {
    const updated = [...navItems];
    updated[mainIndex].subItems![subIndex][field] = value;
    setNavItems(updated);
  };

  // Save changes to database
  // Save changes to database
  const handleSave = async () => {
    // Frontend Validation: Check if any label or href is empty
    for (const item of navItems) {
      if (!item.label.trim() || !item.href.trim()) {
        alert("Error: All main links must have both a Label and a URL.");
        return;
      }
      if (item.subItems) {
        for (const sub of item.subItems) {
          if (!sub.label.trim() || !sub.href.trim()) {
            alert(`Error: A dropdown link under "${item.label}" is missing a Label or URL.`);
            return;
          }
        }
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/v1/navbar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: navItems }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Navbar updated successfully!");
        fetchNavbar();
      } else {
        alert(data.message || "Failed to update navbar");
      }
    } catch (error) {
      console.error("Error saving navbar", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neutral-500">
        <Loader2 size={40} className="animate-spin mb-4 text-amber-600" />
        <p>Loading Navigation Menu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <Menu size={24} className="text-amber-600" />
            Manage Navigation Bar
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Configure the main menu links and dropdowns for your website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors font-medium disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      {/* Editor Area */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 space-y-6">
        {navItems.map((item, mainIndex) => (
          <div key={mainIndex} className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
            {/* Main Link Row */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">Link Label</label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateMainLink(mainIndex, "label", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
                  placeholder="e.g. About Us"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs font-medium text-neutral-500 mb-1 uppercase tracking-wider">URL Path</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon size={16} className="absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateMainLink(mainIndex, "href", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
                      placeholder="e.g. /about"
                    />
                  </div>
                  <button
                    onClick={() => removeMainLink(mainIndex)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-md transition-colors"
                    title="Remove this main link"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sub Links Area (Dropdown) */}
            <div className="mt-4 pl-6 border-l-2 border-amber-200 space-y-3">
              {item.subItems && item.subItems.map((sub, subIndex) => (
                <div key={subIndex} className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-8 h-[1px] bg-amber-200 hidden md:block"></div>
                  <input
                    type="text"
                    value={sub.label}
                    onChange={(e) => updateSubLink(mainIndex, subIndex, "label", e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
                    placeholder="Dropdown Label (e.g. Menswear)"
                  />
                  <input
                    type="text"
                    value={sub.href}
                    onChange={(e) => updateSubLink(mainIndex, subIndex, "href", e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
                    placeholder="URL (e.g. /products/menswear)"
                  />
                  <button
                    onClick={() => removeSubLink(mainIndex, subIndex)}
                    className="p-1.5 text-red-400 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => addSubLink(mainIndex)}
                className="flex items-center gap-1 text-xs text-amber-600 font-medium hover:text-amber-700 mt-2"
              >
                <Plus size={14} /> Add Dropdown Link
              </button>
            </div>
          </div>
        ))}

        <div className="pt-4">
          <button
            onClick={addMainLink}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors font-medium text-sm"
          >
            <Plus size={16} /> Add New Main Link
          </button>
        </div>
      </div>
    </div>
  );
}