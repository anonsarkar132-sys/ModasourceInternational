"use client";

import Link from "next/link";
import { ShieldCheck, Globe, Zap, Leaf, CheckCircle2, ArrowRight } from "lucide-react";

export default function WhyUsPage() {
  
  // Client's exact 6 checkmark features
  const checkFeatures = [
    {
      title: "Zero MOQ Flexibility",
      desc: "Develop and scale your collections without restriction—MOQ is never a limitation."
    },
    {
      title: "End-to-End Sourcing Solutions",
      desc: "From concept to delivery, we provide fully integrated support across design, development, production, and logistics."
    },
    {
      title: "Multi-Country Sourcing Network",
      desc: "Diversified sourcing across key regions to ensure competitive pricing, flexibility, and risk management."
    },
    {
      title: "Quality & Compliance Excellence",
      desc: "Structured quality control systems aligned with global standards and supported by certified partners."
    },
    {
      title: "Speed-to-Market Execution",
      desc: "Agile processes and dedicated teams enabling fast development cycles and on-time delivery."
    },
    {
      title: "Sustainable & Transparent Approach",
      desc: "Commitment to responsible sourcing, ethical practices, and long-term sustainability."
    }
  ];

  // Client's exact 4 Main Cards
  const advantages = [
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: "Global Sourcing Network",
      description: "A diversified and well-established sourcing platform across Bangladesh, Asia, and key global hubs—ensuring competitive pricing, scalability, and supply chain resilience."
    },
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "Quality & Compliance Excellence",
      description: "Robust quality assurance systems supported by multi-stage inspections, certified partners, and international compliance standards—ensuring consistent product performance across all programs."
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: "Speed-to-Market Execution",
      description: "An agile and responsive operating model combining efficient development cycles, flexible production, and streamlined logistics—delivering your collections faster and more efficiently."
    },
    {
      icon: <Leaf size={32} strokeWidth={1.5} />,
      title: "Sustainable & Responsible Sourcing",
      description: "A strong commitment to ethical practices, sustainable materials, and transparent operations—aligned with global ESG standards and long-term environmental responsibility."
    }
  ];

  return (
    // 🔥 Font updated to Helvetica as requested
    <div className="w-full bg-white selection:bg-[#C89B3C] selection:text-white" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      
      {/* ─── HERO SECTION ─── */}
      <div className="relative w-full h-[50vh] md:h-[60vh] bg-neutral-900 flex items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?auto=format&fit=crop&w=1600&q=80" 
          alt="Premium Tailoring" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <p className="text-[#C89B3C] text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-bold">
            The Moda Source Advantage
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto drop-shadow-md">
            Excellence in<br />Every Thread.
          </h1>
        </div>
      </div>

      {/* ─── INTRO SECTION ─── */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-6">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-8">
              Why partner with us?
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              In today’s dynamic apparel industry, brands need more than just a supplier—they need a reliable and strategic sourcing partner. Modasource International bridges the gap between product vision and scalable manufacturing, delivering solutions that are flexible, transparent, and built for growth.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed mb-10">
              With a strong global sourcing network and deep product expertise, we simplify the complexities of production—managing quality, timelines, and logistics—so you can stay focused on building your brand.
            </p>

            {/* 🔥 Client's old small bullets kept for extra value, styled nicely */}
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 pb-8 border-b border-neutral-100">
              {["30+ Years Expertise", "100+ Audited Factories", "End-to-End Solution"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-bold text-neutral-800 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#C89B3C]"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-6 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-xl">
             <img 
               src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80" 
               className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700" 
               alt="Quality Control" 
             />
          </div>
        </div>
      </div>

      {/* ─── 6 CHECKMARK FEATURES SECTION ─── */}
      <div className="bg-[#fafafa] py-24 border-y border-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {checkFeatures.map((feature, idx) => (
              <div key={idx} className="flex gap-5 group">
                <CheckCircle2 size={28} className="text-[#C89B3C] shrink-0 mt-1 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2">{feature.title}</h4>
                  <p className="text-neutral-600 leading-relaxed text-base">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 4 CORE ADVANTAGES GRID ─── */}
      <div className="bg-white py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
              Our Pillars of Strength
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              The core principles that drive our operations and deliver unparalleled value to our global clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => (
              <div key={index} className="bg-white p-10 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-neutral-100 group">
                <div className="w-16 h-16 bg-neutral-50 flex items-center justify-center rounded-full mb-8 text-neutral-400 group-hover:bg-[#C89B3C] group-hover:text-white transition-colors duration-500">
                  {adv.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-[#C89B3C] transition-colors">
                  {adv.title}
                </h3>
                <p className="text-base leading-relaxed text-neutral-600">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA / BOTTOM BANNER ─── */}
      <div className="bg-neutral-900 py-24 text-center">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
              Ready to elevate your supply chain?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
              Let's discuss how Modasource International can streamline your production, reduce costs, and improve the quality of your next collection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto bg-[#C89B3C] hover:bg-[#b08731] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link 
                href="/services" 
                className="w-full sm:w-auto bg-transparent border border-neutral-700 hover:border-[#C89B3C] hover:text-[#C89B3C] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest transition-colors text-center"
              >
                Explore Capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}