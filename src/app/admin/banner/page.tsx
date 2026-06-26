"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, UploadCloud, Image as ImageIcon } from "lucide-react";

export default function BannersAdminPage() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Database theke banner gulo niye asha
  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/v1/banners");
      const data = await res.json();
      if (data.success) {
         setBanners(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch banners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Notun banner upload kora
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image or video file.");
    
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("file", file);

    try {
      const res = await fetch("/api/v1/banners", {
        method: "POST",
        body: formData, 
      });
      const data = await res.json();
      
      if (data.success) {
        // State clear kora
        setTitle(""); 
        setSubtitle(""); 
        setFile(null);
        
        // Input file html element reset kora
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        fetchBanners(); // Notun data anar jonno refresh
        alert("Banner uploaded successfully!");
      } else {
        alert(data.message || "Failed to upload banner");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Banner delete kora
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    
    try {
      const res = await fetch(`/api/v1/banners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchBanners(); // Delete er por list refresh kora
      } else {
        alert("Failed to delete banner");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting banner");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <ImageIcon className="text-amber-600" size={28} />
            Manage Hero Banners
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Upload image or video for the home page slider.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Form Box */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 sticky top-24">
            <h2 className="text-lg font-semibold mb-6 border-b border-neutral-100 pb-2">Add New Banner</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1.5">Banner Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g., Excellence in Thread" 
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1.5">Subtitle</label>
                <input 
                  type="text" 
                  value={subtitle} 
                  onChange={(e) => setSubtitle(e.target.value)} 
                  placeholder="e.g., Sourcing solutions" 
                  className="w-full border border-neutral-200 px-4 py-2.5 rounded-md outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 block mb-1.5">Upload Media (Image/Video)</label>
                <div className="border-2 border-dashed border-neutral-200 rounded-md p-4 text-center hover:bg-neutral-50 transition-colors">
                  <input 
                    id="file-upload"
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-600 hover:file:bg-amber-100 cursor-pointer"
                  />
                </div>
                {file && <p className="text-xs text-green-600 mt-2 font-medium">Selected: {file.name}</p>}
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className="w-full bg-neutral-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-amber-600 flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18}/>}
                {submitting ? "Uploading..." : "Upload Media"}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Banners List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 min-h-[500px]">
            <h2 className="text-lg font-semibold mb-6 border-b border-neutral-100 pb-2">Existing Banners</h2>
            
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={32} className="animate-spin text-amber-600" />
              </div>
            ) : banners.length === 0 ? (
              <div className="text-center py-20 text-neutral-500">
                <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
                <p>No banners uploaded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner) => (
                  <div key={banner._id} className="border border-neutral-200 rounded-lg overflow-hidden group relative shadow-sm hover:shadow-md transition-all bg-white">
                    
                    {/* Media Preview (Video naki Image) */}
                    <div className="aspect-video w-full bg-neutral-100 relative">
                      {banner.mediaType === 'video' ? (
                        <video 
                          src={banner.mediaUrl} 
                          className="w-full h-full object-cover" 
                          controls 
                          muted 
                        />
                      ) : (
                        <img 
                          src={banner.mediaUrl || banner.imageUrl} 
                          alt={banner.title} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                      {/* Label for Media Type */}
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded uppercase tracking-wider font-mono">
                        {banner.mediaType || 'Image'}
                      </div>
                    </div>

                    {/* Banner Text Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-neutral-800 line-clamp-1">{banner.title || "No Title"}</h3>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-1">{banner.subtitle || "No Subtitle"}</p>
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => handleDelete(banner._id)}
                      className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      title="Delete Banner"
                    >
                      <Trash2 size={16} />
                    </button>

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