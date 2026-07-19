"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

export default function CategoryDynamicPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) || "";

  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categorySlug) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const catRes = await fetch("/api/v1/categories");
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        const catData = await catRes.json();
        if (!catData.success) throw new Error("Invalid category response");

        const allCategories: any[] = catData.data;
        const foundCat = allCategories.find(
          (c: any) => c.slug === categorySlug
        );

        if (!foundCat) {
          setError("Category not found");
          return;
        }

        setCurrentCategory(foundCat);

        const children = allCategories.filter((c: any) => {
          const pId = c.parent?._id || c.parent;
          return pId && String(pId) === String(foundCat._id);
        });

        setSubCategories(children);

        if (children.length === 0) {
          const prodRes = await fetch(
            `/api/v1/products?category=${categorySlug}`
          );
          if (!prodRes.ok) throw new Error("Failed to fetch products");
          const prodData = await prodRes.json();
          if (prodData.success) setProducts(prodData.data);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "Error loading content. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
        <Loader2 size={40} className="animate-spin text-amber-600" />
        <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          Accessing Collection...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-neutral-500 p-4">
        <AlertCircle size={40} className="mb-4 text-red-400" />
        <p className="font-mono text-sm uppercase text-center">{error}</p>
        <Link
          href="/products"
          className="mt-6 text-xs border-b border-neutral-800 pb-1"
        >
          Back to Collections
        </Link>
      </div>
    );
  }

  // CASE 1: Sub-category Grid — smaller cards
  if (subCategories.length > 0) {
    return (
      <div className="w-full bg-white font-sans">
        {/* Page Title */}
        <div className="py-12 text-center border-b border-neutral-100 bg-[#fafafa]">
          <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.4em] mb-3">
            Collection
          </p>
          <h1
            className="text-2xl md:text-4xl text-neutral-800 uppercase tracking-[0.25em] font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {currentCategory?.name || categorySlug.replace(/-/g, " ")}
          </h1>
          <div className="w-10 h-[1px] bg-amber-600 mx-auto mt-5" />
        </div>

        {/* ✅ Smaller cards — fixed height 420px */}
        <div className="max-w-[1400px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subCategories.map((sub) => {
              const isValidImage =
                sub.image &&
                sub.image.startsWith("https") &&
                (sub.image.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) ||
                  sub.image.includes("unsplash") ||
                  sub.image.includes("cloudinary") ||
                  sub.image.includes("imgur"));

              const imageSrc = isValidImage
                ? sub.image
                : "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80";

              return (
                <Link
                  key={sub._id}
                  href={`/products/${sub.slug}`}
                  className="relative group block overflow-hidden bg-neutral-100"
                  style={{ height: "420px" }}
                >
                  {/* Image */}
                  <img
                    src={imageSrc}
                    alt={sub.name}
                    className="w-full h-full object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-105"
                  />

                  {/* Normal state: dark gradient at bottom — name always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Hover: slightly more dark overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                  {/* ✅ Name — always visible at bottom-left */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2
                      className="text-xl md:text-2xl text-white font-light tracking-wide"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {sub.name}
                    </h2>
                    {/* Animated underline on hover */}
                    <div className="w-0 group-hover:w-12 h-[1px] bg-white/70 mt-2 transition-all duration-500" />
                    {/* Arrow on hover */}
                    <p className="text-[10px] font-mono text-white/0 group-hover:text-white/60 uppercase tracking-[0.3em] mt-2 transition-all duration-400">
                      Explore →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ===== Product Card Component with Image Slideshow =====
  function ProductCard({ product }: { product: any }) {
    const [imgIndex, setImgIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const images = product.images?.filter((img: string) => img?.trim()) || [];
    const hasMultiple = images.length > 1;

    const goToNext = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImgIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrev = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
      <Link
        href={`/product/${product._id}`}
        className="group flex flex-col cursor-pointer"
      >
        <div className="w-full aspect-[3/4] bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden relative">
          <img
            src={images[imgIndex] || images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Left/Right Arrow Buttons — show on hover */}
          {hasMultiple && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm rounded-full"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-700"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm rounded-full"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-700"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
        <div className="mt-3">
          <h3 className="text-[11px] font-mono text-neutral-500 uppercase tracking-[0.15em] group-hover:text-neutral-900 transition-colors duration-300">
            {product.name}
          </h3>
        </div>
      </Link>
    );
  }

  // CASE 2: Product Grid (leaf category)
  return (
    <div className="w-full bg-white font-sans min-h-screen">
      <div className="py-16 text-center border-b border-neutral-100 bg-[#fafafa]">
        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.4em] mb-3">
          Collection
        </p>
        <h1
          className="text-2xl md:text-4xl text-neutral-800 uppercase tracking-[0.25em] font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {currentCategory?.name || categorySlug.replace(/-/g, " ")}
        </h1>
        <div className="w-10 h-[1px] bg-amber-600 mx-auto mt-5" />
        <p className="text-[10px] font-mono text-neutral-400 mt-4 uppercase tracking-widest">
          {products.length} {products.length === 1 ? "Item" : "Items"}
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 font-mono text-sm uppercase tracking-widest">
              No products in this category yet.
            </p>
            <Link
              href="/products"
              className="inline-block mt-8 text-xs border-b border-neutral-400 pb-1 text-neutral-500 uppercase tracking-widest hover:text-neutral-900 transition-colors"
            >
              ← Back to Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
