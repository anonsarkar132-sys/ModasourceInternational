"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2, Package, Tag, Layers, ImageIcon, FileText, UploadCloud, X } from "lucide-react";

interface Category { _id: string; name: string; slug: string; parent?: any; }

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories]   = useState<Category[]>([]);
  const [fetchingCats, setFetchingCats] = useState(true);
  const [submitting, setSubmitting]   = useState(false);

  const [name, setName]               = useState("");
  const [slug, setSlug]               = useState("");
  const [category, setCategory]       = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured]   = useState(false);
  const [files, setFiles]             = useState<File[]>([]);
  const [previews, setPreviews]       = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res  = await fetch("/api/v1/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
          if (data.data.length > 0) setCategory(data.data[0].slug);
        }
      } catch (e) { console.error(e); }
      finally { setFetchingCats(false); }
    };
    fetch_();
  }, []);

  const mainCategories = categories.filter(c => !c.parent);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected]);
    setPreviews(prev => [...prev, ...selected.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    setFiles(prev    => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please add at least one image.");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name",        name);
    formData.append("slug",        slug);
    formData.append("description", description);
    formData.append("category",    category);
    formData.append("isFeatured",  String(isFeatured));
    files.forEach(f => formData.append("images", f));

    try {
      const res  = await fetch("/api/v1/products", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) router.push("/admin/products");
      else alert(data.message || "Failed to create product");
    } catch (e) { alert("Something went wrong"); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <Link href="/admin/products" className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <Package size={24} className="text-amber-600" /> Add New Product
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Upload and categorize your product.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b pb-3 flex items-center gap-2">
              <Tag size={18} className="text-amber-600" /> Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Product Name</label>
                <input required type="text" value={name} onChange={handleNameChange}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-md focus:border-amber-600 outline-none"
                  placeholder="e.g. Premium Crewneck T-Shirt" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">Slug (Auto-generated)</label>
                <input required type="text" value={slug} onChange={e => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-md bg-neutral-50 font-mono text-xs text-neutral-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700 flex items-center gap-2"><FileText size={16}/> Description</label>
              <textarea required rows={5} value={description} onChange={e => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-md focus:border-amber-600 outline-none resize-none"
                placeholder="Enter fabric details, fitting, and sizing info..." />
            </div>
          </div>

          {/* ✅ Image Upload */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-amber-600" /> Product Images
            </h2>

            {/* Preview Grid */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img src={src} alt={`img-${i}`} className="w-full h-full object-cover rounded-md border border-neutral-100" />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-2 border-dashed border-neutral-200 rounded-md p-6 text-center hover:bg-neutral-50 transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}>
              <UploadCloud size={28} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-sm text-neutral-400">Click to upload images</p>
              <p className="text-xs text-neutral-300 mt-1">PNG, JPG, WEBP supported</p>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
            </div>

            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 text-sm text-amber-600 font-bold hover:text-amber-700">
              <Plus size={18} /> ADD MORE IMAGES
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b pb-3 flex items-center gap-2">
              <Layers size={18} className="text-amber-600" /> Organization
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Select Category</label>
              {fetchingCats ? (
                <div className="flex items-center gap-2 text-neutral-400 text-sm py-2"><Loader2 size={16} className="animate-spin" /> Fetching...</div>
              ) : (
                <select required value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-md bg-white outline-none focus:border-amber-600 cursor-pointer text-sm">
                  <option value="" disabled>-- Choose Category --</option>
                  {mainCategories.map(main => (
                    <optgroup key={main._id} label={main.name}>
                      {categories.filter(sub => String(sub.parent?._id || sub.parent) === String(main._id)).map(sub => (
                        <option key={sub._id} value={sub.slug}>{sub.name}</option>
                      ))}
                      <option value={main.slug}>Full {main.name} Collection</option>
                    </optgroup>
                  ))}
                </select>
              )}
            </div>
            <div className="pt-4 border-t border-neutral-50">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 rounded border-neutral-300 text-amber-600 focus:ring-amber-600 cursor-pointer" />
                <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">Feature on Homepage</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 space-y-4">
            <button type="submit" disabled={submitting}
              className="w-full bg-neutral-900 text-white py-3.5 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {submitting ? <Loader2 size={18} className="animate-spin" /> : "Publish Product"}
            </button>
            <Link href="/admin/products"
              className="block text-center w-full py-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-800 transition-colors">
              Discard Draft
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}