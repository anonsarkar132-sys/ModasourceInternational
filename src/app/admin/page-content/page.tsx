"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, FileText } from "lucide-react";

export default function PageContentAdmin() {
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'services', 'esg'
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Fetch data depending on the active tab
  const fetchPageContent = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/page-content/${slug}`);
      const data = await res.json();
      
      if (data.success && data.data) {
        setFormData({
          title: data.data.title || "",
          content: data.data.content || "",
        });
      } else {
        // Jodi age theke kono data na thake, faka dekhabo
        setFormData({ title: "", content: "" });
      }
    } catch (error) {
      console.error("Failed to fetch page content", error);
    } finally {
      setLoading(false);
    }
  };

  // Jokhon i tab change hobe, tokhon i oi page er data fetch korbe
  useEffect(() => {
    fetchPageContent(activeTab);
  }, [activeTab]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/v1/page-content/${activeTab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Page content updated successfully!");
      } else {
        alert(data.message || "Failed to update content");
      }
    } catch (error) {
      console.error("Error saving content", error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "about", label: "About Us" },
    { id: "services", label: "Our Services" },
    { id: "esg", label: "ESG (Sustainability)" },
  ];

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <FileText size={24} className="text-amber-600" />
            Manage Page Content
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Update the text and titles for your static pages.</p>
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-amber-600 text-amber-600 bg-amber-50/30"
                  : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Area */}
        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-neutral-500">
              <Loader2 size={32} className="animate-spin mb-4 text-amber-600" />
              <p>Loading content for {tabs.find(t => t.id === activeTab)?.label}...</p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Page Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600 font-serif text-lg"
                  placeholder={`e.g. ${tabs.find(t => t.id === activeTab)?.label}`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Main Content</label>
                <textarea
                  required
                  rows={12}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600 text-neutral-600 leading-relaxed"
                  placeholder="Write the page content here..."
                />
                <p className="text-xs text-neutral-400 mt-2">
                  Tip: You can use basic HTML tags like &lt;br&gt; for line breaks or &lt;strong&gt; for bold text if needed.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition-colors font-medium disabled:opacity-50"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save {tabs.find(t => t.id === activeTab)?.label}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}