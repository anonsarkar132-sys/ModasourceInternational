"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-20 pb-12 border-t border-gray-200 font-mono text-sm">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-neutral-100 pb-16">
          {/* Col 1: Logo & Group Info */}
          <div>
            <div className="mb-8">
              {/* 🔥 Original Image Logo Added Here */}
              <Link href="/">
                <img
                  src="/modsourcelogo.png"
                  alt="Moda Source Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>
            {/* 🔥 Text updated as per client guidelines (JKB Textile FZCO) */}
            <div className="text-neutral-600 flex items-center gap-2 text-base">
              Part of the{" "}
              <span className="font-sans font-bold text-xl text-neutral-800">
                JKB Textile FZCO
              </span>
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div className="flex flex-col items-center text-center">
            <p className="text-neutral-600 mb-6 leading-relaxed text-base font-sans">
              Sign up with your email address to receive
              <br />
              news and updates.
            </p>
            <div className="flex w-full max-w-sm mb-6">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 border border-gray-300 px-4 py-3 outline-none focus:border-gray-500 text-sm"
              />
              <button className="bg-neutral-800 hover:bg-amber-600 text-white px-8 py-3 transition-colors text-sm font-medium uppercase tracking-wider">
                Sign Up
              </button>
            </div>
            <p className="text-neutral-500 text-xs">We respect your privacy.</p>
          </div>

          {/* Col 3: Addresses */}
          <div className="text-left md:text-right text-neutral-600 leading-[1.8] text-sm">
            <p className="mb-6">
              Moda Source Ltd, 13th Floor,
              <br />
              Autograph Tower, 67 & 68 Kemal
              <br />
              Ataturk Avenue, Banani, Dhaka,
              <br />
              <span className="border-b border-neutral-400 pb-0.5 text-neutral-800 font-medium">
                Bangladesh.
              </span>
            </p>
            <p className="mb-6">
              Plot No. 222, PDS Towers, 5th Floor,
              <br />
              Udyog Vihar, Gurugram,
              <br />
              <span className="border-b border-neutral-400 pb-0.5 text-neutral-800 font-medium">
                India.
              </span>
            </p>
            <p>
              7/F, Park Fook Industrial Building,
              <br />
              615-617 Tai Nan West Street Cheung
              <br />
              Sha Wan, Kowloon,
              <br />
              <span className="border-b border-neutral-400 pb-0.5 text-neutral-800 font-medium">
                HongKong.
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-neutral-500 font-medium">
            Copyright © Moda Source {currentYear}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
