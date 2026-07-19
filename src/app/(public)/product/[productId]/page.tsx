"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  ArrowLeft,
  Tag,
  Package,
  FileText,
  Star,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.productId as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      setError("Product ID not found");
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/v1/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Product not found");
        setProduct(data.data);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || "Product",
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] gap-4 bg-white">
        <div className="relative">
          <Loader2 size={44} className="animate-spin text-amber-600" />
          <div className="absolute inset-0 bg-amber-600/5 rounded-full blur-xl animate-pulse" />
        </div>
        <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.4em]">
          Loading Product Details...
        </p>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-neutral-500 p-4 bg-white">
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <AlertCircle size={36} className="text-red-400" />
        </div>
        <p className="font-mono text-sm uppercase tracking-widest text-center max-w-md">
          {error || "Product not found"}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-8 flex items-center gap-2 text-xs border-b border-neutral-300 pb-1 text-neutral-500 uppercase tracking-widest hover:text-neutral-900 transition-all duration-300"
        >
          <ArrowLeft size={14} />
          Back to Collection
        </button>
      </div>
    );
  }

  const images = product.images?.filter((img: string) => img?.trim()) || [];
  const currentImage = images[currentImageIndex] || "/placeholder.svg";
  const hasMultipleImages = images.length > 1;

  // Format description - handle null/undefined
  const description = product.description || "No description available.";

  return (
    <div className="w-full bg-white font-sans min-h-screen">
      {/* Top Navigation Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 uppercase tracking-[0.15em]">
            <Link
              href="/products"
              className="hover:text-neutral-800 transition-colors"
            >
              Collections
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-600 truncate max-w-[120px] md:max-w-[200px]">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="relative p-2 text-neutral-400 hover:text-neutral-800 transition-colors"
              title="Share"
            >
              <Share2 size={16} />
              {showShareTooltip && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[9px] px-3 py-1.5 rounded-full whitespace-nowrap font-mono uppercase tracking-wider">
                  Link Copied!
                </span>
              )}
            </button>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 hover:text-neutral-800 uppercase tracking-[0.15em] transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ===== LEFT: Image Section ===== */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] bg-[#fafafa] border border-neutral-100 overflow-hidden group">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain p-10 md:p-16 transition-opacity duration-500"
              />

              {/* Image Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-white shadow-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} className="text-neutral-700" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 hover:bg-white shadow-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} className="text-neutral-700" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-neutral-200">
                  <span className="text-[10px] font-mono text-neutral-600">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-20 border-2 transition-all duration-300 overflow-hidden ${
                      idx === currentImageIndex
                        ? "border-amber-600 opacity-100"
                        : "border-neutral-200 opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== RIGHT: Product Details ===== */}
          <div className="flex flex-col justify-start pt-4 lg:pt-12">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block text-[9px] font-mono text-amber-700 bg-amber-50 px-4 py-1.5 uppercase tracking-[0.25em] border border-amber-200/50">
                {product.category || "Collection"}
              </span>
            </div>

            {/* Product Name */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl text-neutral-900 font-light leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {product.name}
            </h1>

            {/* Decorative Divider */}
            <div className="w-12 h-[1px] bg-amber-600 my-8" />

            {/* Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText size={13} className="text-amber-600" />
                <h3 className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.25em]">
                  Description
                </h3>
              </div>
              <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Details Section */}
            {/* <div className="mt-10 space-y-6 border-t border-neutral-100 pt-8">
              <div className="flex items-center gap-2 mb-4">
                <Package size={13} className="text-amber-600" />
                <h3 className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.25em]">
                  Product Details
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {product.category && (
                  <div className="flex items-center justify-between py-3 border-b border-neutral-50 group hover:bg-neutral-50/50 transition-colors px-3 -mx-3 rounded-sm">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-[0.1em]">
                      Category
                    </span>
                    <span className="text-[12px] text-neutral-800 font-mono">
                      {product.category}
                    </span>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
