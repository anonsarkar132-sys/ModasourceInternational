"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Menu, X, ChevronDown, ChevronRight, PackageSearch } from "lucide-react";

type Category = {
  _id: string;
  name: string;
  slug: string;
  label?: string;
  parent?: string | null;
};

type MainCategory = Category & {
  subCategories: Category[];
};

type ProductMenu = {
  label: string;
  mainCategories: MainCategory[];
};

type CategoriesResponse = {
  success?: boolean;
  data?: Category[];
};

// Social Icons (LinkedIn, YouTube, WhatsApp)
const LinkedinIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>);
const WhatsappIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);

export default function Navbar() {
  const pathname = usePathname(); 
  const [productMenu, setProductMenu] = useState<ProductMenu | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMainIndex, setActiveMainIndex] = useState<number | null>(null);

  const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Capabilities", href: "/services" },
    { label: "Why Us", href: "/why-us" },
    { label: "Quality & ESG", href: "/esg" },
    { label: "Contact Us", href: "/contact" }
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await fetch("/api/v1/categories");
        const catData = (await catRes.json()) as CategoriesResponse;

        if (catData.success && catData.data) {
          const allCats = catData.data;
          const mainCats = allCats.filter((c) => !c.parent);
          const subCats = allCats.filter((c) => c.parent);

          setProductMenu({
            label: "Products",
            mainCategories: mainCats.map((main) => ({
              ...main,
              subCategories: subCats.filter((sub) => String(sub.parent) === String(main._id))
            }))
          });
        }
      } catch (error) {
        console.error("Error loading categories", error);
      }
    };
    fetchCategories();
  }, []);

  const isActive = (path: string) => pathname === path;
  const isProductsActive = pathname.startsWith("/products");

  const getLinkClasses = (path: string) => {
    const active = isActive(path);
    return `group relative whitespace-nowrap text-[12px] 2xl:text-[14px] tracking-[0.08em] 2xl:tracking-[0.1em] font-medium uppercase transition-colors py-2 ${active ? "text-[#C89B3C]" : "text-neutral-700 hover:text-[#C89B3C]"}`;
  };

  const getUnderlineClasses = (path: string) => {
    const active = isActive(path);
    return `absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B3C] transition-transform origin-left duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`;
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <div className="w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 xl:px-10 2xl:px-16 mx-auto">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* 1. Logo (Left Aligned - Fixed minimum width to balance layout) */}
          <div className="flex items-center min-w-0 xl:w-[180px] 2xl:w-[220px]">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="/modsourcelogo.png" 
                alt="Moda Source Logo" 
                width={220}
                height={56}
                priority
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[190px] sm:max-w-[220px] object-contain" 
              />
            </Link>
          </div>

          {/* 2. Desktop Menu (Center Aligned) */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-4 2xl:gap-8 h-full min-w-0">
            
            <Link href={navLinks[0].href} className={getLinkClasses(navLinks[0].href)}>
              {navLinks[0].label}
              <span className={getUnderlineClasses(navLinks[0].href)}></span>
            </Link>
            
            <Link href={navLinks[1].href} className={getLinkClasses(navLinks[1].href)}>
              {navLinks[1].label}
              <span className={getUnderlineClasses(navLinks[1].href)}></span>
            </Link>

            {/* Products menu is always rendered so it doesn't jump. Only the dropdown waits for data. */}
            <div 
              className="relative h-full flex items-center group cursor-pointer"
              onMouseLeave={() => setActiveMainIndex(null)}
            >
              <div className={`group/dropdown relative flex items-center gap-1.5 whitespace-nowrap text-[12px] 2xl:text-[14px] tracking-[0.08em] 2xl:tracking-[0.1em] font-medium uppercase transition-colors py-2 ${isProductsActive ? "text-[#C89B3C]" : "text-neutral-700 hover:text-[#C89B3C]"}`}>
                <PackageSearch size={17} className="text-[#C89B3C] shrink-0" />
                PRODUCTS
                <ChevronDown size={15} className={`mt-0.5 shrink-0 transition-transform duration-300 group-hover:rotate-180 ${isProductsActive ? "text-[#C89B3C]" : "text-neutral-400"}`} />
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B3C] transition-transform origin-left duration-300 ${isProductsActive ? "scale-x-100" : "scale-x-0 group-hover/dropdown:scale-x-100"}`}></span>
              </div>

              {/* Dropdown appears only when data is fetched */}
              {productMenu && productMenu.mainCategories && (
                <div className="absolute top-[calc(100%-1px)] left-1/2 -translate-x-1/2 w-[280px] bg-white shadow-md border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {productMenu.mainCategories.map((main, idx) => (
                    <div key={main._id} className="relative group/sub" onMouseEnter={() => setActiveMainIndex(idx)}>
                      <Link href={`/products/${main.slug}`} className="flex justify-between items-center px-6 py-3.5 text-[13px] tracking-widest text-neutral-600 hover:text-[#C89B3C] hover:bg-neutral-50 uppercase transition-colors">
                        {main.name}
                        {main.subCategories.length > 0 && <ChevronRight size={16} />}
                      </Link>

                      {main.subCategories.length > 0 && activeMainIndex === idx && (
                        <div className="absolute top-0 left-full w-[260px] bg-white shadow-md border border-gray-100 py-3 animate-in fade-in slide-in-from-left-2">
                          {main.subCategories.map((sub) => (
                            <Link key={sub._id} href={`/products/${sub.slug}`} className="block px-6 py-3.5 text-[13px] tracking-widest text-neutral-500 hover:text-[#C89B3C] hover:bg-neutral-50 uppercase transition-colors">
                              {sub.label || sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href={navLinks[2].href} className={getLinkClasses(navLinks[2].href)}>
              {navLinks[2].label}
              <span className={getUnderlineClasses(navLinks[2].href)}></span>
            </Link>
            
            <Link href={navLinks[3].href} className={getLinkClasses(navLinks[3].href)}>
              {navLinks[3].label}
              <span className={getUnderlineClasses(navLinks[3].href)}></span>
            </Link>
            
            <Link href={navLinks[4].href} className={getLinkClasses(navLinks[4].href)}>
              {navLinks[4].label}
              <span className={getUnderlineClasses(navLinks[4].href)}></span>
            </Link>
          </div>

          {/* 3. Social Icons (Right Aligned - Match Left Width for perfect centering) */}
          <div className="flex items-center justify-end xl:w-[180px] 2xl:w-[220px]">
            <div className="hidden xl:flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-[#C89B3C] transition-colors"><LinkedinIcon /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-[#C89B3C] transition-colors"><YoutubeIcon /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-[#C89B3C] transition-colors"><WhatsappIcon /></a>
            </div>

            {/* Mobile Toggle */}
            <div className="xl:hidden flex items-center ml-4">
              <button
                type="button"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="inline-flex h-11 w-11 items-center justify-center text-neutral-800 hover:text-[#C89B3C] transition-colors"
              >
                {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 absolute left-0 top-full w-full shadow-lg h-[calc(100dvh-5rem)] md:h-[calc(100dvh-6rem)] overflow-y-auto pb-24">
          <div className="px-5 sm:px-8 py-6 space-y-4">
            
            {navLinks.slice(0, 2).map((item, index) => (
              <Link key={index} href={item.href} onClick={() => setIsMobileOpen(false)} className={`block py-3 text-base uppercase tracking-widest font-medium border-b border-gray-50 transition-colors ${isActive(item.href) ? "text-[#C89B3C]" : "text-neutral-800 hover:text-[#C89B3C]"}`}>
                {item.label}
              </Link>
            ))}
            
            {/* Products Mobile Section */}
            <div className="py-3">
              <p className={`text-xs uppercase tracking-[0.2em] font-bold mb-5 ${isProductsActive ? "text-[#C89B3C]" : "text-neutral-500"}`}>Products</p>
              {productMenu?.mainCategories?.map((main) => (
                <div key={main._id} className="mb-5 pl-2">
                  <Link href={`/products/${main.slug}`} onClick={() => setIsMobileOpen(false)} className={`block font-semibold uppercase text-sm tracking-wider mb-3 transition-colors ${pathname === `/products/${main.slug}` ? "text-[#C89B3C]" : "text-neutral-800 hover:text-[#C89B3C]"}`}>
                    {main.name}
                  </Link>
                  <div className="pl-5 space-y-3 border-l-2 border-neutral-100">
                    {main.subCategories?.map((sub) => (
                      <Link key={sub._id} href={`/products/${sub.slug}`} onClick={() => setIsMobileOpen(false)} className={`block text-sm uppercase tracking-widest py-1 transition-colors ${pathname === `/products/${sub.slug}` ? "text-[#C89B3C] font-semibold" : "text-neutral-500 hover:text-[#C89B3C]"}`}>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {navLinks.slice(2).map((item, index) => (
              <Link key={index} href={item.href} onClick={() => setIsMobileOpen(false)} className={`block py-3 text-base uppercase tracking-widest font-medium border-b border-gray-50 transition-colors ${isActive(item.href) ? "text-[#C89B3C]" : "text-neutral-800 hover:text-[#C89B3C]"}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
