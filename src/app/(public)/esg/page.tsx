"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, FileCheck, Leaf, Users } from "lucide-react";

export default function ESGPage() {
  // 4 Main Sections based on Client's PPTX
  const esgSections = [
    {
      id: 1,
      title: "Quality Assurance",
      icon: <ShieldCheck size={32} className="text-[#C89B3C] mb-4" />,
      desc: "At Modasource International, quality is embedded at every stage of the product lifecycle—from development to final delivery.",
      bullets: [
        "Structured AQL-based inspection system (Inline & Final)",
        "Fabric and garment testing aligned with international standards",
        "Dedicated QA team ensuring consistency and product integrity",
        "Continuous monitoring across production stages"
      ]
    },
    {
      id: 2,
      title: "Compliance & Standards",
      icon: <FileCheck size={32} className="text-[#C89B3C] mb-4" />,
      desc: "We work with certified manufacturing partners who meet globally recognized compliance benchmarks.",
      bullets: [
        "Factories audited under WRAP, BSCI, SEDEX frameworks",
        "Alignment with international retailer compliance requirements",
        "Transparent and traceable supply chain practices",
        "Strong focus on worker safety, welfare, and ethical operations"
      ]
    },
    {
      id: 3,
      title: "Sustainability Commitment",
      icon: <Leaf size={32} className="text-[#C89B3C] mb-4" />,
      desc: "We are committed to reducing environmental impact through responsible sourcing and sustainable practices.",
      bullets: [
        "Use of certified sustainable materials (GOTS, GRS, OEKO-TEX)",
        "Reduced water, chemical, and energy consumption initiatives",
        "Focus on long-term environmental responsibility",
        "Support for eco-friendly product development"
      ]
    },
    {
      id: 4,
      title: "Responsible Sourcing",
      icon: <Users size={32} className="text-[#C89B3C] mb-4" />,
      desc: "Our sourcing approach is built on transparency, accountability, and long-term partnerships.",
      bullets: [
        "Ethical vendor selection and continuous evaluation",
        "Full visibility across the supply chain",
        "Strong governance and risk management processes",
        "Commitment to fair labor practices and responsible production"
      ]
    }
  ];

  // 🔥 Placeholder Images added for Certifications (Matching your Golden Theme)
  const certifications = [
    { name: "WRAP", logo: "https://placehold.co/300x150/ffffff/c89b3c/png?text=WRAP" },
    { name: "BSCI", logo: "https://placehold.co/300x150/ffffff/c89b3c/png?text=BSCI" },
    { name: "SEDEX", logo: "https://placehold.co/300x150/ffffff/c89b3c/png?text=SEDEX" },
    { name: "GOTS", logo: "https://placehold.co/300x150/ffffff/c89b3c/png?text=GOTS" },
    { name: "GRS", logo: "https://placehold.co/300x150/ffffff/c89b3c/png?text=GRS" },
    { name: "OEKO-TEX", logo: "https://placehold.co/300x150/ffffff/c89b3c/png?text=OEKO-TEX" },
  ];

  return (
    <div className="w-full bg-white selection:bg-[#C89B3C] selection:text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* 🚀 CSS Animation for Infinite Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          display: flex;
          width: max-content;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />

      {/* 1. Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex flex-col justify-center items-center overflow-hidden bg-neutral-900">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #0a2e1a 0%, #1a4a2a 25%, #2d6b3f 50%, #1e5530 75%, #0d3320 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-md">
            Quality & ESG
          </h1>
          <div className="w-24 h-1 bg-[#C89B3C] mx-auto mb-6"></div>
        </div>
      </div>

      {/* 2. Intro Text Section */}
      <div className="bg-[#fafafa] py-16 md:py-24 border-b border-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 leading-tight max-w-5xl mx-auto">
            Delivering consistent quality while upholding the highest standards of ethical, sustainable, and responsible sourcing across our global supply chain.
          </h2>
        </div>
      </div>

      {/* 3. The 4 Pillars / Grid Section */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
          {esgSections.map((section) => (
            <div key={section.id} className="flex flex-col bg-white p-8 md:p-10 border border-neutral-100 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300">
              {section.icon}
              <h3 className="text-3xl font-bold text-neutral-900 mb-4">{section.title}</h3>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                {section.desc}
              </p>
              <ul className="space-y-4 mt-auto">
                {section.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-700 text-base">
                    <CheckCircle2 size={22} className="text-[#C89B3C] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Certifications & Accreditations (Animated Logo Slider with Images) */}
      <div className="py-20 bg-neutral-50 border-y border-neutral-200 overflow-hidden marquee-container">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">Certifications & Accreditations</h3>
          <div className="w-16 h-1 bg-[#C89B3C] mx-auto mt-4"></div>
        </div>
        
        <div className="animate-marquee items-center gap-12 md:gap-16 px-8 mt-10">
          {/* Doubled the array for smooth infinite scrolling */}
          {[...certifications, ...certifications, ...certifications].map((cert, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center min-w-[200px] h-28 bg-white border border-neutral-200 rounded-sm shadow-sm hover:border-[#C89B3C] transition-all duration-300 cursor-pointer group"
            >
              {/* 🔥 Here goes the Image */}
              <img 
                src={cert.logo} 
                alt={cert.name} 
                className="w-full h-full object-contain p-4 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bold Quote Section (Requested by Client) */}
      <div className="py-24 md:py-32 bg-[#111] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl text-[#C89B3C] opacity-20 font-serif leading-none">
            "
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight relative z-10 text-white">
            At Modasource International, quality and responsibility are not checkpoints—they are the foundation of everything we deliver.
          </h2>
          
          <div className="mt-12 w-24 h-1 bg-[#C89B3C] mx-auto"></div>
        </div>
      </div>

    </div>
  );
}