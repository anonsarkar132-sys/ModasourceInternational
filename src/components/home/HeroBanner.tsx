"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/v1/banners");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setBanners(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch banners", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Auto slide logic
  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
      }, 5000); // 5 seconds por por slide change hobe
      return () => clearInterval(timer);
    }
  }, [banners.length]);

  if (loading) {
    return (
      <div className="w-full h-[70vh] bg-neutral-100 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-amber-600" />
      </div>
    );
  }

  // Jodi admin theke kono banner add kora na thake
  if (banners.length === 0) {
    return (
      <div className="w-full h-[70vh] bg-neutral-900 flex items-center justify-center text-white text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Welcome to Moda Source</h1>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">Please add a banner from the admin panel.</p>
        </div>
      </div>
    );
  }

  const activeBanner = banners[currentSlide];

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-neutral-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out scale-105"
        style={{ backgroundImage: `url(${activeBanner.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay jate text bojha jay */}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
        <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight mb-6">
            {activeBanner.title || "Global Reach, Local Expertise"}
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-xl font-light">
            {activeBanner.subtitle || "Your premier solution provider in apparel design, sourcing, and manufacturing."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/products" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              Explore Collection <ArrowRight size={18} />
            </Link>
            <Link 
              href="/contact" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-amber-600" : "w-4 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}