"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react"; // 🔥 Removed unused icons since we are using flags now

export default function AboutPage() {
  const [brands, setBrands] = useState<any[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsRes = await fetch("/api/v1/brands");
        if (brandsRes.ok) {
          const brandData = await brandsRes.json();
          if (brandData.success) {
            setBrands(brandData.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch brands", error);
      }
    };
    fetchBrands();
  }, []);

  const missionBullets = [
    "Customer-first approach with agile and scalable sourcing",
    "Empowered and performance-driven teams",
    "Strong focus on cost optimization without compromising quality",
    "Tech-driven processes for speed, accuracy, and visibility",
    "Continuous innovation in product development and sourcing"
  ];

  const visionBullets = [
    "Long-term partnerships built on reliability and flexibility",
    "People-centric culture fostering collaboration and growth",
    "Balanced approach to quality, cost, and sustainability",
    "Integration of digital tools and advanced technologies across operations",
    "Innovation-led growth across product and supply chain"
  ];

  // 🔥 Updated: Replaced Lucide Icons with Small Country Flags
  const globalPresence = [
    {
      country: "Bangladesh",
      role: "Manufacturing HQ",
      icon: <img src="https://flagcdn.com/bd.svg" alt="Bangladesh Flag" className="h-8 w-auto object-cover rounded-sm shadow-sm mb-4" />,
      desc: "Our core manufacturing base, delivering large-scale production with strong expertise across knit, woven, and denim categories."
    },
    {
      country: "Dubai",
      role: "Financial Hub",
      icon: <img src="https://flagcdn.com/ae.svg" alt="UAE Flag" className="h-8 w-auto object-cover rounded-sm shadow-sm mb-4" />,
      desc: "A strategic financial center supporting global transactions, trade facilitation, and operational efficiency."
    },
    {
      country: "China",
      role: "Material Sourcing",
      icon: <img src="https://flagcdn.com/cn.svg" alt="China Flag" className="h-8 w-auto object-cover rounded-sm shadow-sm mb-4" />,
      desc: "A key sourcing hub for fabrics, trims, and raw materials—ensuring access to innovation, variety, and competitive pricing."
    },
    {
      country: "Chile",
      role: "Sales & Design Office",
      icon: <img src="https://flagcdn.com/cl.svg" alt="Chile Flag" className="h-8 w-auto object-cover rounded-sm shadow-sm mb-4" />,
      desc: "Our customer-facing hub supporting design, development, and business growth across LATAM markets."
    }
  ];

  const mission2030 = [
    {
      title: "People First",
      desc: "We are committed to building an empowered, inclusive, and high-performing team—investing in talent, leadership, and long-term growth."
    },
    {
      title: "Global Expansion",
      desc: "Strengthening our international presence with planned offices in USA, Australia, and the UK—bringing us closer to our customers and key markets."
    },
    {
      title: "Sustainable Transformation",
      desc: "Driving a complete shift towards sustainable products and responsible processes, integrating eco-friendly materials and efficient production practices."
    },
    {
      title: "Carbon Reduction Commitment",
      desc: "Actively working towards measurable impact by reducing environmental footprint across our operations and supply chain."
    }
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
          animation: marquee 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}} />

      {/* 1. Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] flex items-center bg-neutral-900">
        <img 
          src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1600&q=80" 
          alt="Apparel Manufacturing" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight tracking-tight drop-shadow-md">
            One stop destination for apparel needs.
          </h1>
        </div>
      </div>

      {/* 2. Who We Are Section */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-8">
              Who We Are
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Modasource International is a global apparel sourcing partner delivering end-to-end solutions for brands and retailers across international markets.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Since our inception in 2015, we have built a customer-centric platform focused on reliability, flexibility, and quality execution.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Over the years, we have expanded our global footprint with the launch of our Dubai & China office in 2020 as a financial & material sourcing hub, followed by our Sales & Design office in Chile in 2024, supporting customers across the EU and LATAM regions.
            </p>
            <p className="text-lg text-neutral-600 leading-relaxed">
              With a strong sourcing network and deep product expertise, we bridge the gap between creative vision and manufacturing execution—offering scalable, transparent, and efficient solutions tailored to each brand’s needs.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" 
              alt="Who We Are" 
              className="w-full h-auto object-cover rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C89B3C] -z-10 rounded-sm hidden md:block"></div>
          </div>
        </div>
      </div>

      {/* 3. Mission & Vision Section */}
      <div className="bg-[#fafafa] py-24 border-y border-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Our Mission (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 bg-white p-10 shadow-sm border border-neutral-100 rounded-sm">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Our Mission</h3>
              <p className="text-lg text-neutral-600 mb-8 font-medium">
                To be a trusted apparel sourcing partner—delivering customer-centric, flexible, and cost-efficient solutions through innovation, transparency, and operational excellence.
              </p>
              <ul className="space-y-4">
                {missionBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-600 text-base">
                    <CheckCircle2 size={22} className="text-[#C89B3C] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 h-[400px] lg:h-full relative rounded-sm overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" alt="Our Mission" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Our Vision (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="h-[400px] lg:h-full relative rounded-sm overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" alt="Our Vision" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white p-10 shadow-sm border border-neutral-100 rounded-sm">
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Our Vision</h3>
              <p className="text-lg text-neutral-600 mb-8 font-medium">
                To become a globally preferred sourcing platform driven by customer value, people excellence, and smart innovation.
              </p>
              <ul className="space-y-4">
                {visionBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-neutral-600 text-base">
                    <CheckCircle2 size={22} className="text-[#C89B3C] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Global Presence (Flags instead of Icons) */}
      <div className="py-24 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">Our Global Presence</h2>
          <p className="text-xl text-neutral-600 leading-relaxed">
            A strategically positioned global network enabling seamless sourcing, financial efficiency, and market proximity across key regions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {globalPresence.map((loc, idx) => (
            <div key={idx} className="bg-white border border-neutral-100 p-8 rounded-sm hover:border-[#C89B3C] hover:-translate-y-2 transition-all duration-300 group shadow-sm hover:shadow-md text-center">
              <div className="flex justify-center">{loc.icon}</div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-[#C89B3C] transition-colors">{loc.country}</h4>
              <p className="text-[#C89B3C] font-bold text-sm uppercase tracking-widest mb-4">{loc.role}</p>
              <p className="text-neutral-600 leading-relaxed">{loc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Our Customers */}
      <div className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
               <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                Our Customers
              </h2>
              <div className="w-16 h-1 bg-[#C89B3C] mb-8"></div>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                Our diverse clientele in the fashion and apparel industry spans the globe, encompassing a wide array of international brands, retailers, and manufacturers.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=70" 
                className="w-full h-auto object-cover grayscale opacity-80" 
                alt="Global Reach Map" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. Brands We Are Working */}
      <div className="py-20 bg-white overflow-hidden marquee-container">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">Brands We Are Working</h3>
        </div>

        {brands.length > 0 && (
          <div className="animate-marquee items-center gap-12 md:gap-20 px-6 mt-10">
            {[...brands, ...brands].map((brand, index) => (
              <img 
                key={`${brand._id}-${index}`}
                src={brand.logoUrl} 
                alt={brand.name} 
                className="max-h-12 md:max-h-16 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
        )}
      </div>

      {/* 7. Our Team Section */}
      <div className="bg-[#fafafa] py-24 border-t border-neutral-200">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-6">
                Our Team
              </h2>
              <h4 className="text-sm font-bold text-[#C89B3C] mb-6 uppercase tracking-widest">Working at Moda Source</h4>
              <p className="text-lg text-neutral-600 leading-relaxed text-justify">
                Modasource International is a dynamic and young organization that prides itself on a culture of entrepreneurship and employee ownership. Every team member is considered its most valuable asset, and the company is committed to their professional development. By providing extensive training and fostering an engaging and supportive environment, we ensure that each employee has the opportunity to grow and thrive. This approach not only drives innovation and excellence but also builds a strong, motivated workforce dedicated to the company's success.
              </p>
            </div>
            <div>
               <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=70" className="w-full h-[400px] object-cover rounded-sm shadow-md grayscale-[20%]" alt="Our Team" />
            </div>
          </div>
        </div>
      </div>

      {/* 8. Our Founder Section */}
      <div className="bg-neutral-900 text-white py-24">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80" className="w-full max-w-md mx-auto object-cover rounded-sm grayscale" alt="Our Founder" />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h4 className="text-sm font-bold text-[#C89B3C] uppercase tracking-widest mb-2">Our Founder</h4>
              <p className="text-lg leading-relaxed text-neutral-300 text-justify">
                Our Founder began his illustrious journey in the apparel industry in 1994, steadily rising through the ranks from a trainee to roles in product development, technical operations, merchandising, and factory management. With over 30 years of diverse experience, he founded Moda Source to redefine the art of sourcing by seamlessly integrating creativity with practicality.
              </p>
              <p className="text-lg leading-relaxed text-neutral-300 text-justify">
                Under his visionary leadership, the company has evolved into a premier sourcing solutions provider, celebrated for its innovative approach to fabrics, sustainability, global sourcing, and design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 9. Mission 2030 */}
      <div className="bg-[#111] text-white py-24 md:py-32">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Our Mission 2030</h2>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
              A clear roadmap to build a people-driven, globally connected, and fully sustainable sourcing platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {mission2030.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#1a1a1a] border border-neutral-800 p-10 md:p-12 rounded-sm hover:border-[#C89B3C] transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-neutral-800 flex items-center justify-center rounded-full group-hover:bg-[#C89B3C] transition-colors">
                    <span className="text-xl font-bold text-white">{idx + 1}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-[#C89B3C] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}