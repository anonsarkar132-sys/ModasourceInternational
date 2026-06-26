"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Plus, Trash2, Package } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id || params.slug; // Apnar folder name jodi [slug] thake, tai backup hisebe rakha holo

  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    images: [""],
    isFeatured: false,
  });

  // Fetch Categories & Existing Product Data
  useEffect(() => {
    const loadData = async () => {
      setFetchingData(true);
      try {
        // 1. Fetch Categories
        const catRes = await fetch("/api/v1/categories");
        const catData = await catRes.json();
        if (catData.success) {
          setCategories(catData.data);
        }

        // 2. Fetch Existing Product Details
        if (productId) {
          const prodRes = await fetch(`/api/v1/products/${productId}`);
          const prodData = await prodRes.json();
          if (prodData.success && prodData.data) {
            const p = prodData.data;
            setFormData({
              name: p.name || "",
              slug: p.slug || "",
              category: p.category || "",
              description: p.description || "",
              images: p.images && p.images.length > 0 ? p.images : [""],
              isFeatured: p.isFeatured || false,
            });
          }
        }
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setFetchingData(false);
      }
    };

    loadData();
  }, [productId]);

  // Auto Generate Slug (jodi name change kore)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name, slug });
  };

  // Handle Dynamic Image Inputs
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Submit Updated Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean empty image URLs
    const cleanImages = formData.images.filter((url) => url.trim() !== "");
    if (cleanImages.length === 0) {
      alert("Please add at least one valid image URL");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images: cleanImages }),
      });
      const data = await res.json();

      if (data.success) {
        // Success hole product list page e redirect korbe
        router.push("/admin/products");
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product", error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-neutral-500">
        <Loader2 size={40} className="animate-spin mb-4 text-amber-600" />
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <Link href="/admin/products" className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <Package size={24} className="text-amber-600" />
            Edit Product
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Update the details of your existing product.</p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-neutral-800 border-b pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Product Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-amber-600 focus:border-amber-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600 bg-white"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                <span className="text-sm font-medium text-neutral-700">Feature this product on homepage</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
            />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-neutral-800 border-b pb-2">Product Images</h2>
          
          <div className="space-y-3">
            {formData.images.map((url, index) => (
              <div key={index} className="flex gap-2 items-center">
                <img 
                  src={url || "https://via.placeholder.com/40"} 
                  alt="Preview" 
                  className="w-10 h-10 object-cover rounded border border-gray-200"
                  onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/40")}
                />
                <input
                  type="url"
                  required={index === 0}
                  value={url}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <button
            type="button"
            onClick={addImageField}
            className="flex items-center gap-2 text-sm text-amber-600 font-medium hover:text-amber-700"
          >
            <Plus size={16} /> Add another image
          </button>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-300 text-neutral-600 font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-8 py-2 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}