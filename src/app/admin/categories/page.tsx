"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Trash2, FolderPlus, Tag, Image as ImageIcon, Layers, UploadCloud } from "lucide-react";

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name,   setName]   = useState("");
  const [slug,   setSlug]   = useState("");
  const [parent, setParent] = useState("");
  const [file,   setFile]   = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchCategories = async () => {
    try {
      const res  = await fetch("/api/v1/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const mainCategories = categories.filter(c => !c.parent);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else   setPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name",   name);
    formData.append("slug",   slug);
    formData.append("file",   file);
    if (parent) formData.append("parent", parent);

    try {
      const res = await fetch("/api/v1/categories", { method: "POST", body: formData });
      if (res.ok) {
        setName(""); setSlug(""); setParent(""); setFile(null); setPreview("");
        if (fileRef.current) fileRef.current.value = "";
        fetchCategories();
      } else {
        const d = await res.json();
        alert(d.message || "Failed to add category");
      }
    } catch (e) { console.error(e); alert("Error"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/v1/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div className="max-w-5xl space-y-8 pb-12">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
          <Layers className="text-amber-600" size={28} /> Manage Categories
        </h1>
        <p className="text-neutral-500 text-sm mt-1">Create main and sub-categories with cover images.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 sticky top-24">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-4">
              <FolderPlus size={20} className="text-amber-600" /> Add New
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5"><Tag size={14}/> Category Name</label>
                <input required type="text" value={name} onChange={handleNameChange}
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md outline-none focus:border-amber-500 text-sm" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700">URL Slug</label>
                <input required type="text" value={slug} onChange={e => setSlug(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 px-4 py-2.5 rounded-md text-sm font-mono text-neutral-500" />
              </div>

              {/* ✅ Image Upload */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5"><ImageIcon size={14}/> Cover Image</label>
                <div className="border-2 border-dashed border-neutral-200 rounded-md p-3 text-center hover:bg-neutral-50 transition-colors">
                  <input ref={fileRef} id="cat-file" type="file" accept="image/*" onChange={handleFileChange}
                    className="w-full text-sm text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer" />
                </div>
                {preview && (
                  <img src={preview} alt="preview" className="w-full h-32 object-cover rounded-md border border-neutral-100 mt-2" />
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5"><Layers size={14}/> Parent Category</label>
                <select value={parent} onChange={e => setParent(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md text-sm cursor-pointer">
                  <option value="">-- Main Category (No Parent) --</option>
                  {mainCategories.map(c => (
                    <option key={c._id} value={c._id}>Under: {c.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-neutral-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                {submitting ? "Saving..." : "Save Category"}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
            <h2 className="text-lg font-semibold mb-6 border-b pb-4">Category Hierarchy</h2>
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="animate-spin text-amber-600" /></div>
            ) : mainCategories.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm border-2 border-dashed rounded-lg">No categories found.</div>
            ) : (
              <div className="space-y-4">
                {mainCategories.map(main => (
                  <div key={main._id} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-neutral-50 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        {main.image && (
                          <img src={main.image} alt={main.name} className="w-12 h-12 object-cover rounded-md border border-neutral-100" />
                        )}
                        <div>
                          <h3 className="font-semibold text-neutral-800">{main.name}</h3>
                          <span className="text-xs font-mono text-neutral-500 bg-white px-2 py-0.5 rounded border mt-1 inline-block">/{main.slug}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(main._id)} className="text-neutral-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                    </div>
                    <div className="bg-white px-4 py-2">
                      {categories.filter(c => String(c.parent?._id || c.parent) === String(main._id)).length === 0 ? (
                        <p className="text-xs text-neutral-400 py-2 italic ml-4">No sub-categories</p>
                      ) : (
                        categories.filter(c => String(c.parent?._id || c.parent) === String(main._id)).map(sub => (
                          <div key={sub._id} className="flex justify-between items-center py-3 border-b last:border-0 border-neutral-50 ml-6 relative before:content-[''] before:absolute before:-left-4 before:top-1/2 before:w-3 before:h-px before:bg-neutral-300">
                            <div className="flex items-center gap-3">
                              {sub.image && (
                                <img src={sub.image} alt={sub.name} className="w-9 h-9 object-cover rounded border border-neutral-100" />
                              )}
                              <span className="text-sm font-medium text-neutral-700">{sub.name}</span>
                              <span className="text-[10px] font-mono text-neutral-400 border px-1.5 rounded bg-neutral-50">/{sub.slug}</span>
                            </div>
                            <button onClick={() => handleDelete(sub._id)} className="text-neutral-400 hover:text-red-500 p-1.5"><Trash2 size={16} /></button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}