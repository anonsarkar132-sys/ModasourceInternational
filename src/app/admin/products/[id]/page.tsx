"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  Package,
  UploadCloud,
  X,
  ImageIcon,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id || params.slug;

  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

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
            setName(p.name || "");
            setSlug(p.slug || "");
            setCategory(p.category || "");
            setDescription(p.description || "");
            setExistingImages(p.images && p.images.length > 0 ? p.images : []);
            setIsFeatured(p.isFeatured || false);
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

  // Auto Generate Slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setName(name);
    setSlug(slug);
  };

  // Handle new file uploads
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...selected]);
    setNewPreviews((prev) => [
      ...prev,
      ...selected.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeNewImage = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Updated Data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const totalImages = existingImages.length + newFiles.length;
    if (totalImages === 0) {
      alert("Please add at least one image");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isFeatured", String(isFeatured));
      formData.append("existingImages", JSON.stringify(existingImages));

      // Append new files
      newFiles.forEach((f) => formData.append("images", f));

      const res = await fetch(`/api/v1/products/${productId}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
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
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
        <Link
          href="/admin/products"
          className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-800 flex items-center gap-2">
            <Package size={24} className="text-amber-600" />
            Edit Product
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Update product details and manage images.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b pb-3">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">
                  Product Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-md focus:border-amber-600 outline-none"
                  placeholder="e.g. Premium Crewneck T-Shirt"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-700">
                  Slug (Auto-generated)
                </label>
                <input
                  required
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-md bg-neutral-50 font-mono text-xs text-neutral-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Description
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-600 focus:border-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b pb-3">
              Organization
            </h2>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">
                Select Category
              </label>
              {fetchingData ? (
                <div className="flex items-center gap-2 text-neutral-400 text-sm py-2">
                  <Loader2 size={16} className="animate-spin" /> Fetching...
                </div>
              ) : (
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-md bg-white outline-none focus:border-amber-600 cursor-pointer text-sm"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="pt-4 border-t border-neutral-50">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 rounded border-neutral-300 text-amber-600 focus:ring-amber-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                  Feature on Homepage
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-100 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-amber-600" /> Product Images
            </h2>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-neutral-700">
                  Existing Images
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((url, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded-md border border-neutral-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Previews */}
            {newPreviews.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-neutral-700">
                  New Images to Upload
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {newPreviews.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={src}
                        alt={`New ${index + 1}`}
                        className="w-full h-full object-cover rounded-md border border-neutral-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            <div
              className="border-2 border-dashed border-neutral-200 rounded-md p-6 text-center hover:bg-neutral-50 transition-colors cursor-pointer"
              onClick={() => fileRef.current?.click()}
            >
              <UploadCloud
                size={28}
                className="mx-auto text-neutral-300 mb-2"
              />
              <p className="text-sm text-neutral-400">
                Click to upload more images
              </p>
              <p className="text-xs text-neutral-300 mt-1">
                PNG, JPG, WEBP supported
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
                className="hidden"
              />
            </div>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 text-sm text-amber-600 font-bold hover:text-amber-700"
            >
              <Plus size={18} /> ADD MORE IMAGES
            </button>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 flex justify-end gap-4">
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
        </div>
      </form>
    </div>
  );
}
