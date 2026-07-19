"use client";

import { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function CategoryProductsPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.categorySlug;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/products?category=${categorySlug}`);
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categorySlug]);

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
        className="group flex flex-col items-center"
      >
        <div className="w-full aspect-[4/5] bg-white border border-neutral-50 flex items-center justify-center overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
          <img
            src={images[imgIndex] || images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-[1.5s]"
          />

          {/* Left/Right Arrow Buttons — show on hover */}
          {hasMultiple && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm rounded-full"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm rounded-full"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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

          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-[13px] font-mono text-neutral-500 uppercase tracking-[0.2em] group-hover:text-neutral-900 transition-colors">
            {product.name}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <div className="w-full bg-white font-sans min-h-screen">
      {/* Dynamic Header */}
      <div className="py-20 text-center border-b border-neutral-100 bg-[#fafafa]">
        <h1
          className="text-3xl md:text-5xl text-neutral-800 uppercase tracking-[0.3em] font-light"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {categorySlug.replace("-", " ")}
        </h1>
        <div className="w-12 h-[1px] bg-amber-600 mx-auto mt-6"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={32} className="animate-spin text-neutral-300" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-200">
            <p className="text-neutral-400 font-mono text-sm uppercase tracking-widest">
              No collection found in this category.
            </p>
          </div>
        ) : (
          /* The Clean Grid Layout from Image 2 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
