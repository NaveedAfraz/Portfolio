import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

const BASE_VISITS = 5000;

export const NotebookModal = ({ isOpen, onClose }) => {
  const [visits, setVisits] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_visits_v2");
      return saved ? parseInt(saved, 10) : BASE_VISITS + 3;
    } catch {
      return BASE_VISITS + 3;
    }
  });

  // Listen for escape key and prevent background body scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Re-check visits count
    try {
      const saved = localStorage.getItem("portfolio_visits_v2");
      if (saved) setVisits(parseInt(saved, 10));
    } catch {
      // Ignore
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Today's date formatting (e.g. 17 / 09)
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto select-text">
          {/* Dark backdrop overlay with slight vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
          />

          {/* Top-right Status Pill & Close Icon (Exact replica of reference image) */}
          <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[1010] flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-neutral-700/80 text-xs font-mono text-neutral-200 shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold">1</span>
              <span className="text-neutral-500">|</span>
              <span className="flex items-center gap-1">
                <span>👥</span>
                <span className="font-semibold">{visits.toLocaleString()}</span>
              </span>
              <span className="text-neutral-500">|</span>
              <span className="text-sm">🌐</span>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              title="Close Notebook (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Physical Mat / Fabric Backdrop under the notebook (like in reference photo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-[680px] p-2 sm:p-5 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10"
            style={{
              backgroundColor: "#18181b",
              backgroundImage: `
                radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                radial-gradient(rgba(255, 255, 255, 0.04) 1px, #141416 1px)
              `,
              backgroundSize: "20px 20px, 40px 40px",
              backgroundPosition: "0 0, 10px 10px",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            {/* The Real Spiral Notebook Page */}
            <div
              className="relative w-full rounded-l-2xl rounded-r-xs shadow-[0_15px_35px_rgba(0,0,0,0.45)] overflow-hidden font-kalam text-[#191c24]"
              style={{
                backgroundColor: "#fcfbf7",
                boxShadow:
                  "-5px 10px 30px rgba(0,0,0,0.25), 0 0 0 1px rgba(160,150,130,0.25), inset -10px 0 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* Ruled Blue Lines + Red Left Margin Background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, transparent 52px, rgba(239, 68, 68, 0.42) 52px, rgba(239, 68, 68, 0.42) 53.5px, transparent 53.5px),
                    repeating-linear-gradient(transparent, transparent 31px, rgba(148, 163, 184, 0.38) 31px, rgba(148, 163, 184, 0.38) 32px)
                  `,
                  backgroundPosition: "0 24px",
                }}
              />

              {/* Right Edge Spiral Wire Binding (Punched holes & metallic silver coils) */}
              <div className="absolute top-2 bottom-2 right-0 w-7 sm:w-8 flex flex-col justify-between items-end pointer-events-none z-30 select-none">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-end w-full h-3 pr-1.5"
                  >
                    {/* Punched oval paper hole */}
                    <div className="w-2 sm:w-2.5 h-3 rounded-full bg-[#1c1917] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-neutral-700/60" />
                    {/* Metallic wire spiral ring looping around the edge */}
                    <div
                      className="absolute right-0 w-4 sm:w-5 h-2 rounded-r-full border-t-2 border-r-2 border-b-2 border-neutral-400"
                      style={{
                        background:
                          "linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 45%, #52525b 100%)",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Notebook Inner Content Area */}
              <div className="relative z-10 pl-5 sm:pl-9 pr-9 sm:pr-12 pt-3 pb-8 sm:pb-10 leading-[32px]">
                
                {/* Top Header: "today." and date box (just like reference image) */}
                <div className="flex justify-end items-center h-8 mb-2 pr-2">
                  <div className="flex items-center gap-1.5 text-right font-bold text-neutral-800">
                    <span className="font-handwriting text-xl sm:text-2xl text-neutral-900">
                      today.
                    </span>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-700 border-b border-neutral-800 px-1">
                        {day}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-600">
                        {month}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Section: Real Passport Photo + Info */}
                <div className="flex items-start gap-3 sm:gap-5 mb-3 sm:mb-4">
                  
                  {/* Real Passport Photo with white paper border */}
                  <div className="relative shrink-0 mt-0.5">
                    {/* Small Scotch Tape at Top */}
                    <div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-3 bg-white/60 border border-white/80 backdrop-blur-[1px] rotate-[-2deg] shadow-xs z-20 pointer-events-none"
                    />
                    
                    <div className="w-[84px] h-[106px] sm:w-[96px] sm:h-[120px] bg-white p-1 pb-2 shadow-[0_3px_10px_rgba(0,0,0,0.22)] border border-neutral-300 rotate-[-1deg]">
                      <img
                        src="/images/naveed-portrait.png"
                        alt="Naveed Afraz"
                        className="w-full h-full object-cover object-top filter grayscale-[10%] contrast-105"
                        onError={(e) => {
                          e.currentTarget.src = "/images/naveed-hero-cover.jpg";
                        }}
                      />
                    </div>
                  </div>

                  {/* Name, Location, Website & Tagline */}
                  <div className="flex-1 min-w-0 pt-0">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-[32px]">
                      Naveed Afraz
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-800 font-medium leading-[30px]">
                      Hyderabad, India
                    </p>
                    <a
                      href="https://naveedafraz.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm sm:text-base text-neutral-800 underline decoration-neutral-600 underline-offset-2 hover:text-cyan-800 leading-[28px] inline-block font-semibold"
                    >
                      naveedafraz.com
                    </a>

                    {/* Tagline: I ~~imagine~~ build [products] into existence */}
                    <div className="mt-1 text-base sm:text-lg text-neutral-900 font-semibold leading-[32px]">
                      <span>I </span>
                      <span className="relative inline-block mx-1">
                        {/* "build" written right above crossed out "imagine" */}
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-handwriting text-sm sm:text-base text-neutral-900 font-bold tracking-tight rotate-[-3deg]">
                          build
                        </span>
                        <span className="line-through decoration-neutral-900 decoration-[1.5px] text-neutral-600">
                          imagine
                        </span>
                      </span>
                      {/* [products] inside hand-drawn pen box */}
                      <span
                        className="inline-block px-1.5 py-0 border border-neutral-900 font-bold"
                        style={{
                          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        }}
                      >
                        products
                      </span>
                      <span> into existence</span>
                    </div>
                  </div>
                </div>

                {/* Projects Section (Exact replica of reference image style) */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-neutral-900 leading-[32px]">
                    <span className="underline decoration-neutral-800 underline-offset-2">
                      Projects
                    </span>
                    <span className="text-neutral-700">──&gt;</span>
                    <span
                      className="px-2 py-0 border border-neutral-900 text-sm sm:text-base font-bold"
                      style={{
                        borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                      }}
                    >
                      Products
                    </span>
                  </div>

                  <div className="space-y-1 text-sm sm:text-base text-neutral-900 font-medium pt-1">
                    {/* Project 1: Klipp */}
                    <div className="flex flex-wrap items-baseline gap-x-2 leading-[30px]">
                      <a
                        href="https://klipp-web.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        className="px-1.5 py-0 border border-neutral-900 font-bold hover:bg-neutral-200/50 transition-colors inline-flex items-center gap-1"
                        style={{
                          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        }}
                      >
                        <span>Klipp</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                      <span className="text-neutral-600">─</span>
                      <span>
                        For creators. AI highlight clipping, captions &amp; stuff that helps{" "}
                        <span className="underline decoration-neutral-900">build faster</span>.
                      </span>
                    </div>

                    {/* Project 2: Tech Students */}
                    <div className="flex flex-wrap items-baseline gap-x-2 leading-[30px]">
                      <a
                        href="https://techstudents.in"
                        target="_blank"
                        rel="noreferrer"
                        className="px-1.5 py-0 border border-neutral-900 font-bold hover:bg-neutral-200/50 transition-colors inline-flex items-center gap-1"
                        style={{
                          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        }}
                      >
                        <span>techstudents.in</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                      <span className="text-neutral-600">─</span>
                      <span>
                        For engineering students. Community{" "}
                        <span className="underline decoration-neutral-900">deserves</span> its own space.
                      </span>
                    </div>

                    {/* Project 3: MSE Org */}
                    <div className="flex flex-wrap items-baseline gap-x-2 leading-[30px]">
                      <a
                        href="https://mseorg.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-1.5 py-0 border border-neutral-900 font-bold hover:bg-neutral-200/50 transition-colors inline-flex items-center gap-1"
                        style={{
                          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        }}
                      >
                        <span>mseorg.com</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                      <span className="text-neutral-600">─</span>
                      <span>
                        For schools &amp; institutes. Smart multi-tenant ERP system.
                      </span>
                    </div>

                    {/* More projects note with handwritten correction */}
                    <div className="text-xs sm:text-sm text-neutral-700 italic pt-1 pl-4 leading-[28px]">
                      (More{" "}
                      <span className="relative inline-block mx-0.5">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-handwriting text-xs text-neutral-900 font-bold">
                          products
                        </span>
                        <span className="line-through decoration-neutral-800">projects</span>
                      </span>{" "}
                      &amp; blogs in{" "}
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          const elem = document.getElementById("projects");
                          if (elem) elem.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="underline decoration-neutral-900 font-bold text-neutral-900 hover:text-cyan-800 cursor-pointer"
                      >
                        Web version
                      </button>
                      )
                    </div>
                  </div>
                </div>

                {/* Currently Section */}
                <div className="mb-4">
                  <div className="text-lg sm:text-xl font-bold text-neutral-900 leading-[32px]">
                    <span>Currently ──</span>
                  </div>
                  <div className="space-y-0.5 text-sm sm:text-base text-neutral-800 font-medium pl-3">
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span>Building products people love ❤️</span>
                    </div>
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span>Exploring AI, startups &amp; opportunities</span>
                    </div>
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span>Connecting with builders &amp; creators</span>
                    </div>
                  </div>
                </div>

                {/* Connect Section */}
                <div>
                  <div className="text-lg sm:text-xl font-bold text-neutral-900 leading-[32px]">
                    <span>Connect ──</span>
                  </div>
                  <div className="space-y-0.5 text-sm sm:text-base text-neutral-800 font-medium pl-3">
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span className="font-bold">Email : </span>
                      <a
                        href="mailto:naveedafraz2003@gmail.com"
                        className="hover:underline hover:text-cyan-800"
                      >
                        naveedafraz2003@gmail.com
                      </a>
                    </div>
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span className="font-bold">X : </span>
                      <a
                        href="https://twitter.com/NaveedAfrazX"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline hover:text-cyan-800"
                      >
                        @NaveedAfrazX
                      </a>
                    </div>
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span className="font-bold">Github : </span>
                      <a
                        href="https://github.com/NaveedAfraz"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline hover:text-cyan-800"
                      >
                        @NaveedAfraz
                      </a>
                    </div>
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span className="font-bold">LinkedIn : </span>
                      <a
                        href="https://www.linkedin.com/in/naveed-afraz-977a46310/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline hover:text-cyan-800"
                      >
                        @naveed-afraz
                      </a>
                    </div>
                    <div className="leading-[30px]">
                      <span className="text-neutral-600 mr-2">─</span>
                      <span className="font-bold">WhatsApp : </span>
                      <a
                        href="https://wa.me/918328233497"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline hover:text-cyan-800"
                      >
                        +91 83282 33497
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NotebookModal;
