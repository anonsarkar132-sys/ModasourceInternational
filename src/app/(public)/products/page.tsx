"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string; 
}

export default function CategoryListingPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/v1/categories");
        const data = await res.json();
        if (data.success) setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 size={40} className="animate-spin text-neutral-200" />
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans">
      <div className="max-w-[1920px] mx-auto">
        {/* Grid matching the 3-column layout from Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-neutral-200">
          {categories.map((cat) => (
            <Link 
              key={cat._id} 
              href={`/products/${cat.slug}`}
              className="relative group h-[75vh] md:h-[90vh] overflow-hidden bg-white"
            >
              {/* Category Image - Smooth Grayscale transition */}
              <img 
                src={cat.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80"} 
                alt={cat.name}
                className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0"
              />
              
              {/* Center Text Overlay (Appears on Hover) */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-700">
                <div className="text-center overflow-hidden">
                  <h2 
                    className="text-4xl md:text-6xl text-neutral-800 font-medium translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 tracking-tight"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {cat.name}
                  </h2>
                  <div className="w-0 group-hover:w-full h-[1px] bg-neutral-800 mx-auto mt-4 transition-all duration-1000 delay-100"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}