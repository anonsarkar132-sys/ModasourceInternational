"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Trash2, PlusCircle, Tag, ImageIcon, Briefcase, UploadCloud } from "lucide-react";

export default function BrandsAdminPage() {
  const [brands, setBrands]       = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName]           = useState("");
  const [file, setFile]           = useState<File | null>(null);
  const [preview, setPreview]     = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchBrands = async () => {
    try {
      const res  = await fetch("/api/v1/brands");
      const data = await res.json();
      if (data.success) setBrands(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a logo image.");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/brands", { method: "POST", body: formData });
      if (res.ok) {
        setName(""); setFile(null); setPreview("");
        if (fileRef.current) fileRef.current.value = "";
        fetchBrands();
      } else {
        alert("Failed to add brand");
      }
    } catch (e) { alert("Error"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    await fetch(`/api/v1/brands/${id}`, { method: "DELETE" });
    fetchBrands();
  };

  return (
    <div className="max-w-5xl space-y-8 pb-12">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
          <Briefcase className="text-amber-600" size={28} /> Manage Partner Brands
        </h1>
        <p className="text-neutral-500 text-sm mt-1">Upload brand logos to display on the About page.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 sticky top-24">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 border-b pb-4">
              <PlusCircle size={20} className="text-amber-600" /> Add New Brand
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5"><Tag size={14}/> Brand Name</label>
                <input required type="text" placeholder="e.g. Zara, H&M" value={name} onChange={e => setName(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md outline-none focus:border-amber-500 text-sm" />
              </div>

              {/* ✅ Logo Upload */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5"><ImageIcon size={14}/> Logo Image</label>
                <div className="border-2 border-dashed border-neutral-200 rounded-md p-3 hover:bg-neutral-50 transition-colors">
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange}
                    className="w-full text-sm text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer" />
                </div>
                <p className="text-[11px] text-neutral-400">Transparent PNG recommended.</p>
                {preview && (
                  <div className="h-20 flex items-center justify-center border border-neutral-100 rounded-md bg-neutral-50 mt-2">
                    <img src={preview} alt="preview" className="max-h-full max-w-full object-contain p-2" />
                  </div>
                )}
              </div>

              <button type="submit" disabled={submitting}
                className="w-full bg-neutral-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                {submitting ? "Saving..." : "Save Brand"}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
            <h2 className="text-lg font-semibold mb-6 border-b pb-4">Active Brands</h2>
            {loading ? (
              <div className="flex justify-center py-12"><Loader2 size={32} className="animate-spin text-amber-600" /></div>
            ) : brands.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 text-sm border-2 border-dashed rounded-lg">No brands added yet.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {brands.map(brand => (
                  <div key={brand._id} className="border border-neutral-200 rounded-lg p-4 flex flex-col items-center justify-between group bg-neutral-50 hover:bg-white transition-colors relative">
                    <div className="h-20 w-full flex items-center justify-center mb-3">
                      <img src={brand.logoUrl} alt={brand.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="w-full flex justify-between items-center border-t border-neutral-100 pt-3">
                      <span className="text-xs font-semibold text-neutral-600 truncate mr-2">{brand.name}</span>
                      <button onClick={() => handleDelete(brand._id)} className="text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
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