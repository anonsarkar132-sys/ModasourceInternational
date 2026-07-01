"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronUp, Play } from "lucide-react";

export default function HomePage() {
  const [heroBanner, setHeroBanner] = useState<any>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/v1/banners");
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setHeroBanner(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching banner", error);
      }
    };
    fetchBanners();
  }, []);

  const accordionItems = [
    "Design Services",
    "Fabric Research & Development",
    "Technical Services",
    "Quality Control",
    "Global Logistics"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-[#C89B3C] selection:text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <Navbar />
      
      <main className="flex-grow w-full">

        {/* 1. Hero Banner Section - 🔥 Height Reduced to make bottom text visible without scrolling */}
        <div className="w-full h-[40vh] md:h-[55vh] bg-neutral-900 relative overflow-hidden">
          {heroBanner?.mediaUrl && (
            <>
              {heroBanner.mediaType === "video" ? (
                <video
                  src={heroBanner.mediaUrl}
                  className="w-full h-full object-cover object-left"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={heroBanner.mediaUrl}
                  alt={heroBanner.title || "Hero Banner"}
                  className="w-full h-full object-cover object-left"
                />
              )}
            </>
          )}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* 2. Hero Text Section - 🔥 Top padding slightly reduced to pull text up */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold text-neutral-900 mb-4 tracking-tight leading-[1.1]">
            Globally Connected,<br/>Locally Experienced
          </h1>
          <p className="text-neutral-500 text-lg md:text-xl tracking-wide max-w-3xl">
            End-to-end solutions for apparel design and manufacturing.
          </p>
        </div>

        {/* 3. Services Accordion & Image Grid */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Accordion */}
            <div className="space-y-0">
              <div className="border-t border-neutral-300"></div>
              {accordionItems.map((item, index) => (
                <div key={index} className="border-b border-neutral-300">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                    className="w-full py-6 flex justify-between items-center text-left text-xl lg:text-2xl text-neutral-800 tracking-wide hover:text-[#C89B3C] transition-colors font-medium"
                  >
                    {item}
                    {activeAccordion === index 
                      ? <ChevronUp size={24} className="text-[#C89B3C]" /> 
                      : <ChevronDown size={24} className="text-neutral-400" />
                    }
                  </button>
                  {activeAccordion === index && (
                    <div className="pb-8 text-base text-neutral-500 pr-8 leading-relaxed">
                      Comprehensive {item.toLowerCase()} tailored to meet your brand's unique needs and global standards.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Masonry Image Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" alt="Tailor / Design" className="w-full aspect-square object-cover" />
                <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80" alt="Clothing Rack" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <img src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80" alt="Folded Shirts" className="w-full aspect-square object-cover" />
                  <img src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=600&q=80" alt="Suit Tailoring" className="w-full aspect-square object-cover" />
                </div>
                <img src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=800&q=80" alt="Apparel Manufacturing" className="w-full aspect-square object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Video & Potential Section */}
        <div className="bg-[#fcfcfc] py-24 mt-12 border-t border-neutral-100">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Left: Video Player Mockup */}
              <div className="relative aspect-video bg-neutral-900 group cursor-pointer w-full shadow-lg">
                <img src="https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1600&q=80" alt="Video thumbnail" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-white/50 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#C89B3C] transition-colors">
                    <Play className="text-white ml-1" size={32} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-0 w-full p-6 flex justify-between text-white text-sm font-mono bg-gradient-to-t from-black/80 to-transparent">
                  <span>00:00 / 01:42</span>
                  <div className="flex gap-6">
                    <span>Volume</span>
                    <span>Settings</span>
                    <span>Fullscreen</span>
                  </div>
                </div>
              </div>

              {/* Right: Text Content */}
              <div className="pr-12">
                <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-bold text-neutral-900 mb-6 tracking-tight">
                  Integrated Apparel Sourcing. Engineered for Performance.
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-10">
                  Delivering end-to-end solutions—from concept to delivery—through innovation, flexibility, and a globally integrated supply chain.
                </p>
                <button className="bg-neutral-900 hover:bg-[#C89B3C] text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-bold transition-colors">
                  Learn More
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
