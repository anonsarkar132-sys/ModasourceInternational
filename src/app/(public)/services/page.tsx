"use client";

import { CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  // 1. 9 Capabilities Items - Exact text from client's PPTX
  const capabilityItems = [
    { 
      id: 1, 
      title: "Concept & Design", 
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
      bullets: ["Trend research & forecasting", "Seasonal concept development", "Design support & product direction"]
    },
    { 
      id: 2, 
      title: "3D & Innovation", 
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
      bullets: ["Trend research & forecasting", "Seasonal concept development", "Design support & product direction"]
    },
    { 
      id: 3, 
      title: "Fabric & Material Sourcing", 
      image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=800&q=80",
      bullets: ["Global fabric mill network", "Sustainable material sourcing", "Custom fabric development"]
    },
    { 
      id: 4, 
      title: "Product Development", 
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
      bullets: ["Sampling & prototyping", "Fit development & grading", "Technical pack execution"]
    },
    { 
      id: 5, 
      title: "Technical Engineering", 
      // 🔥 Image Fixed
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      bullets: ["Construction optimization", "Performance enhancement", "Value engineering", "Tech Driven Solution"]
    }, 
    { 
      id: 6, 
      title: "Production & Compliance Management", 
      image: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=800&q=80",
      bullets: ["Vendor allocation & planning", "Capacity management", "Timeline execution", "Traceability & Compliance"]
    }, 
    { 
      id: 7, 
      title: "Quality Assurance", 
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80",
      bullets: ["Inline & final inspection", "AQL-based quality control", "Inhouse Testing & Accreditation"]
    },
    { 
      id: 8, 
      title: "Supply Chain & Logistics", 
      image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=800&q=80",
      bullets: ["Diversified sourcing", "Shipping & delivery coordination", "End-to-end visibility"]
    },
    { 
      id: 9, 
      title: "Flexible Production Model", 
      // 🔥 Image Fixed
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      bullets: ["ZERO MOQ capability", "Scalable production", "Fast turnaround programs"]
    }
  ];

  // 2. Supply Chain Boxes - Exact text from client's PPTX
  const supplyChainBoxes = [
    { title: "Multi-Country Sourcing Network", text: "A diversified sourcing platform across Bangladesh, China, and key global hubs—ensuring competitive pricing, scalability, and risk mitigation." },
    { title: "Vendor & Factory Network", text: "Strong partnerships with compliant and capable manufacturing units, enabling consistent quality and production efficiency." },
    { title: "Material & Trim Sourcing", text: "Access to a wide range of fabrics and trims through established supplier networks—ensuring innovation, variety, and cost optimization." },
    { title: "Production Planning & Execution", text: "Structured processes for capacity allocation, timeline management, and order tracking—ensuring on-time delivery and smooth execution." },
    { title: "Quality & Compliance Integration", text: "End-to-end quality control embedded within the supply chain—aligned with global standards and customer requirements." },
    { title: "Logistics & Delivery Management", text: "Efficient coordination of shipments and documentation, ensuring timely and reliable delivery across international markets." }
  ];

  return (
    // 🔥 Font updated to Helvetica exactly as requested
    <div className="w-full bg-white selection:bg-[#C89B3C] selection:text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* 1. Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[75vh] bg-neutral-900 flex flex-col justify-center items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=1600&q=70" 
          alt="Designing for the future" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="relative z-10 text-center px-4 mt-12 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold text-white tracking-tight mb-6 drop-shadow-md">
            Designing for the future
          </h1>
          <p className="text-[#C89B3C] text-sm md:text-lg tracking-[0.25em] uppercase font-bold mb-8">
            Bolder, brighter, together.
          </p>
        </div>
      </div>

      {/* Intro Text below Hero */}
      <div className="bg-[#fafafa] py-16 border-b border-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">
            Integrated Apparel Sourcing. Engineered for Performance.
          </h2>
          <p className="text-neutral-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Delivering end-to-end solutions—from concept to delivery—through innovation, flexibility, and a globally integrated supply chain.
          </p>
        </div>
      </div>

      {/* 2. Capabilities Grid Section (9 Cards) */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {capabilityItems.map((item) => (
            <div key={item.id} className="flex flex-col group border border-neutral-100 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 bg-white overflow-hidden hover:-translate-y-1">
              
              {/* Dynamic Image with Hover Zoom Effect */}
              <div className="w-full aspect-[16/9] bg-neutral-100 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
              </div>

              {/* Card Content */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl text-neutral-900 font-bold mb-6 group-hover:text-[#C89B3C] transition-colors">
                  {item.title}
                </h3>
                <ul className="space-y-4 flex-1">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-600 text-base leading-relaxed">
                      <CheckCircle2 size={20} className="text-[#C89B3C] shrink-0 mt-0.5 opacity-80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>
      </div>

      {/* 3. Supply Chain Section (Animated slightly on hover as requested) */}
      <div className="bg-[#111] text-white py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Supply Chain</h2>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
              A fully integrated and agile supply chain designed to deliver speed, flexibility, and reliability across global markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supplyChainBoxes.map((box, idx) => (
              <div 
                key={idx} 
                className="bg-[#1a1a1a] border border-neutral-800 p-10 rounded-sm hover:border-[#C89B3C] hover:-translate-y-2 transition-all duration-500 group"
              >
                <h4 className="text-xl font-bold mb-4 text-white group-hover:text-[#C89B3C] transition-colors">
                  {box.title}
                </h4>
                <p className="text-neutral-400 leading-relaxed text-base">
                  {box.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Animated Quote Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-32 overflow-hidden">
        <div className="flex justify-center relative group">
          
          <div className="bg-neutral-50 border border-neutral-100 p-12 md:p-20 rounded-sm w-full md:w-4/5 relative z-10 shadow-lg group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-700 text-center">
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-[#C89B3C] opacity-20 font-serif leading-none">
              "
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-neutral-800 font-bold leading-tight tracking-tight relative z-10">
              An agile and transparent supply chain—built to support speed, scale, and long-term growth.
            </h2>
            
            <div className="mt-8 w-24 h-1 bg-[#C89B3C] mx-auto group-hover:w-40 transition-all duration-700"></div>
          </div>

        </div>
      </div>

    </div>
  );
}