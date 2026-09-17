import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";

const BASE_VISITS = 5000;

export const NotebookModal = ({ isOpen, onClose }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const [visits, setVisits] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio_visits_v2");
      return saved ? parseInt(saved, 10) : BASE_VISITS + 3;
    } catch {
      return BASE_VISITS + 3;
    }
  });

  const goToPage = (newPage) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  // Keyboard navigation: Escape closes, Left/Right arrows flip pages
  useEffect(() => {
    if (!isOpen) {
      setPage(0);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        if (page === 0) {
          e.preventDefault();
          goToPage(1);
        }
      } else if (e.key === "ArrowLeft") {
        if (page === 1) {
          e.preventDefault();
          goToPage(0);
        }
      }
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
  }, [isOpen, onClose, page]);

  // Today's date formatting (e.g. 17 / 09)
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");

  if (typeof document === "undefined") return null;

  // Page 3D flip animation variants anchored to the spiral on the right
  const pageVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 50 : -50,
      opacity: 0,
      transformOrigin: "right center",
      scale: 0.96,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transformOrigin: "right center",
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.96,
      transformOrigin: "right center",
      transition: {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-3 overflow-hidden select-text">
          {/* Dark backdrop overlay with slight vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
          />

          {/* Top-right Status Pill & Close Icon */}
          <div className="fixed top-2.5 right-2.5 sm:top-4 sm:right-5 z-[1010] flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 border border-neutral-700/80 text-[11px] sm:text-xs font-mono text-neutral-200 shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold">1</span>
              <span className="text-neutral-500">|</span>
              <span className="flex items-center gap-1">
                <span>👥</span>
                <span className="font-semibold">{visits.toLocaleString()}</span>
              </span>
              <span className="text-neutral-500">|</span>
              <span>🌐</span>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              title="Close Notebook (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Physical Mat / Fabric Backdrop under the notebook (fits screen without scroll) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-[630px] p-2 sm:p-3.5 rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
            style={{
              backgroundColor: "#18181b",
              backgroundImage: `
                radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                radial-gradient(rgba(255, 255, 255, 0.04) 1px, #141416 1px)
              `,
              backgroundSize: "16px 16px, 32px 32px",
              backgroundPosition: "0 0, 8px 8px",
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), inset 0 0 35px rgba(0,0,0,0.6)",
              perspective: 1400,
            }}
          >
            {/* The Real Spiral Notebook Frame */}
            <div
              className="relative w-full rounded-l-xl sm:rounded-l-2xl rounded-r-xs shadow-[0_12px_30px_rgba(0,0,0,0.4)] overflow-hidden font-kalam text-[#191c24]"
              style={{
                backgroundColor: "#fcfbf7",
                boxShadow:
                  "-4px 8px 24px rgba(0,0,0,0.22), 0 0 0 1px rgba(160,150,130,0.25), inset -8px 0 16px rgba(0,0,0,0.05)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ruled Blue Lines (26px spacing) + Red Left Margin Background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, transparent 46px, rgba(239, 68, 68, 0.42) 46px, rgba(239, 68, 68, 0.42) 47.5px, transparent 47.5px),
                    repeating-linear-gradient(transparent, transparent 25px, rgba(148, 163, 184, 0.38) 25px, rgba(148, 163, 184, 0.38) 26px)
                  `,
                  backgroundPosition: "0 18px",
                }}
              />

              {/* Right Edge Spiral Wire Binding (23 coils anchored on the right) */}
              <div className="absolute top-2 bottom-2 right-0 w-6 sm:w-7 flex flex-col justify-between items-end pointer-events-none z-30 select-none">
                {Array.from({ length: 23 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-end w-full h-2.5 pr-1 sm:pr-1.5"
                  >
                    {/* Punched oval paper hole */}
                    <div className="w-1.5 sm:w-2 h-2.5 rounded-full bg-[#1c1917] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] border border-neutral-700/60" />
                    {/* Metallic wire spiral ring */}
                    <div
                      className="absolute right-0 w-3.5 sm:w-4.5 h-1.5 rounded-r-full border-t border-r border-b border-neutral-400"
                      style={{
                        background:
                          "linear-gradient(180deg, #e4e4e7 0%, #a1a1aa 45%, #52525b 100%)",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Turning Pages with 3D Page Flip Animation */}
              <AnimatePresence mode="wait" custom={direction}>
                {page === 0 ? (
                  /* ===================== PAGE 1: Profile & Products ===================== */
                  <motion.div
                    key="page-1"
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10 pl-4 sm:pl-8 pr-7 sm:pr-10 pt-2 pb-3.5 leading-[26px]"
                  >
                    {/* Top Header: "today." and date box */}
                    <div className="flex justify-between items-center h-6 mb-1 pr-1">
                      <span className="text-[11px] sm:text-xs font-handwriting text-neutral-500 font-bold">
                        page 01 / overview
                      </span>
                      <div className="flex items-center gap-1 text-right font-bold text-neutral-800">
                        <span className="font-handwriting text-lg sm:text-xl text-neutral-900">
                          today.
                        </span>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-700 border-b border-neutral-800 px-1 leading-tight">
                            {day}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-600 leading-tight">
                            {month}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Section: Real Passport Photo + Bio */}
                    <div className="flex items-start gap-2.5 sm:gap-4 mb-2">
                      {/* Real Passport Photo */}
                      <div className="relative shrink-0 mt-0.5">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 sm:w-8 h-2.5 bg-white/60 border border-white/80 backdrop-blur-[1px] rotate-[-2deg] shadow-xs z-20 pointer-events-none" />
                        <div className="w-[70px] h-[90px] sm:w-[80px] sm:h-[102px] bg-white p-1 pb-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.22)] border border-neutral-300 rotate-[-1deg]">
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
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-[26px]">
                          Naveed Afraz
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-800 font-medium leading-[26px]">
                          Hyderabad, India
                        </p>
                        <a
                          href="https://naveedafraz.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs sm:text-sm text-neutral-800 underline decoration-neutral-600 underline-offset-2 hover:text-cyan-800 leading-[24px] inline-block font-semibold"
                        >
                          naveedafraz.com
                        </a>

                        {/* Tagline */}
                        <div className="mt-0.5 text-sm sm:text-base text-neutral-900 font-semibold leading-[26px]">
                          <span>I </span>
                          <span className="relative inline-block mx-0.5">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-handwriting text-xs sm:text-sm text-neutral-900 font-bold tracking-tight rotate-[-3deg]">
                              build
                            </span>
                            <span className="line-through decoration-neutral-900 decoration-[1.5px] text-neutral-600">
                              imagine
                            </span>
                          </span>
                          <span
                            className="inline-block px-1 py-0 border border-neutral-900 font-bold"
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

                    {/* Projects Section */}
                    <div className="mb-2">
                      <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-neutral-900 leading-[26px]">
                        <span className="underline decoration-neutral-800 underline-offset-2">
                          Projects
                        </span>
                        <span className="text-neutral-700">──&gt;</span>
                        <span
                          className="px-1.5 py-0 border border-neutral-900 text-xs sm:text-sm font-bold"
                          style={{
                            borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                          }}
                        >
                          Products
                        </span>
                      </div>

                      <div className="space-y-0.5 text-xs sm:text-sm text-neutral-900 font-medium">
                        {/* Project 1: Klipp */}
                        <div className="flex flex-wrap items-baseline gap-x-1.5 leading-[26px]">
                          <a
                            href="https://klipp-web.vercel.app"
                            target="_blank"
                            rel="noreferrer"
                            className="px-1 py-0 border border-neutral-900 font-bold hover:bg-neutral-200/50 transition-colors inline-flex items-center gap-0.5"
                            style={{
                              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                            }}
                          >
                            <span>Klipp</span>
                            <ExternalLink className="w-2 h-2 opacity-50" />
                          </a>
                          <span className="text-neutral-600">─</span>
                          <span>
                            For creators. AI highlight clipping &amp; tools to{" "}
                            <span className="underline decoration-neutral-900">build faster</span>.
                          </span>
                        </div>

                        {/* Project 2: Tech Students */}
                        <div className="flex flex-wrap items-baseline gap-x-1.5 leading-[26px]">
                          <a
                            href="https://techstudents.in"
                            target="_blank"
                            rel="noreferrer"
                            className="px-1 py-0 border border-neutral-900 font-bold hover:bg-neutral-200/50 transition-colors inline-flex items-center gap-0.5"
                            style={{
                              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                            }}
                          >
                            <span>techstudents.in</span>
                            <ExternalLink className="w-2 h-2 opacity-50" />
                          </a>
                          <span className="text-neutral-600">─</span>
                          <span>
                            For engineering students. Community{" "}
                            <span className="underline decoration-neutral-900">deserves</span> its own space.
                          </span>
                        </div>

                        {/* Project 3: MSE Org */}
                        <div className="flex flex-wrap items-baseline gap-x-1.5 leading-[26px]">
                          <a
                            href="https://mseorg.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-1 py-0 border border-neutral-900 font-bold hover:bg-neutral-200/50 transition-colors inline-flex items-center gap-0.5"
                            style={{
                              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                            }}
                          >
                            <span>mseorg.com</span>
                            <ExternalLink className="w-2 h-2 opacity-50" />
                          </a>
                          <span className="text-neutral-600">─</span>
                          <span>
                            For schools &amp; institutes. Smart multi-tenant ERP platform.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Currently Section */}
                    <div className="mb-2">
                      <div className="text-base sm:text-lg font-bold text-neutral-900 leading-[26px]">
                        <span>Currently ──</span>
                      </div>
                      <div className="space-y-0 text-xs sm:text-sm text-neutral-800 font-medium pl-2.5">
                        <div className="leading-[26px]">
                          <span className="text-neutral-600 mr-1.5">─</span>
                          <span>Building products people love ❤️</span>
                        </div>
                        <div className="leading-[26px]">
                          <span className="text-neutral-600 mr-1.5">─</span>
                          <span>Exploring AI, startups &amp; opportunities</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Connect & "Turn Page" interactive dog-ear button */}
                    <div className="flex items-end justify-between pt-1">
                      <div className="text-xs sm:text-sm text-neutral-800 font-medium leading-[24px]">
                        <span className="font-bold">Connect : </span>
                        <a
                          href="mailto:naveedafraz2003@gmail.com"
                          className="hover:underline hover:text-cyan-800"
                        >
                          naveedafraz2003@gmail.com
                        </a>
                      </div>

                      {/* Interactive Page Turn Trigger */}
                      <button
                        type="button"
                        onClick={() => goToPage(1)}
                        className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-neutral-800 text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-200/80 transition-all cursor-pointer shadow-xs active:scale-95"
                        style={{
                          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        }}
                        title="Turn page to see Tech Stack & Notes (or press Right Arrow)"
                      >
                        <span className="font-handwriting text-sm sm:text-base">Turn page</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ===================== PAGE 2: Skills, Mindset & Notes ===================== */
                  <motion.div
                    key="page-2"
                    custom={direction}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative z-10 pl-4 sm:pl-8 pr-7 sm:pr-10 pt-2 pb-3.5 leading-[26px]"
                  >
                    {/* Top Header: Page 2 / Notes */}
                    <div className="flex justify-between items-center h-6 mb-1 pr-1">
                      <span className="text-[11px] sm:text-xs font-handwriting text-neutral-500 font-bold">
                        page 02 / notes &amp; tech
                      </span>
                      <div className="flex items-center gap-1 text-right font-bold text-neutral-800">
                        <span className="font-handwriting text-lg sm:text-xl text-neutral-900">
                          notebook.
                        </span>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-neutral-700 border-b border-neutral-800 px-1 leading-tight">
                            {day}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-neutral-600 leading-tight">
                            {month}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: How I Build / Philosophy */}
                    <div className="mb-2">
                      <div className="text-base sm:text-lg font-bold text-neutral-900 leading-[26px]">
                        <span className="underline decoration-neutral-800 underline-offset-2">
                          Engineering Philosophy
                        </span>
                      </div>
                      <div className="space-y-0 text-xs sm:text-sm text-neutral-800 font-medium pl-2.5">
                        <div className="leading-[26px]">
                          <span className="text-neutral-600 mr-1.5">─</span>
                          <span className="font-bold">Speed &gt; Perfection: </span>
                          Ship working prototypes early, iterate with real users.
                        </div>
                        <div className="leading-[26px]">
                          <span className="text-neutral-600 mr-1.5">─</span>
                          <span className="font-bold">Craft &amp; Aesthetics: </span>
                          Micro-interactions, high performance, and silky UX matter.
                        </div>
                        <div className="leading-[26px]">
                          <span className="text-neutral-600 mr-1.5">─</span>
                          <span className="font-bold">Full Ownership: </span>
                          From idea &amp; Figma sketch to database design &amp; deployment.
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Core Stack & Weapons */}
                    <div className="mb-2">
                      <div className="text-base sm:text-lg font-bold text-neutral-900 leading-[26px]">
                        <span>Stack &amp; Tools ──</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1 text-xs sm:text-sm font-semibold">
                        {[
                          "React.js",
                          "Next.js",
                          "Node.js",
                          "Tailwind CSS",
                          "TypeScript",
                          "MongoDB",
                          "PostgreSQL",
                          "Express.js",
                          "Framer Motion",
                          "Docker",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0 border border-neutral-800 bg-white/60 shadow-2xs inline-block"
                            style={{
                              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Handwritten quote / thought */}
                    <div className="mb-2 pl-3 border-l-2 border-neutral-400 py-0.5 italic text-neutral-800 text-xs sm:text-sm leading-[24px]">
                      &ldquo;The best way to predict the future is to build it into existence.&rdquo;
                    </div>

                    {/* Section 4: Full socials list */}
                    <div className="text-xs sm:text-sm text-neutral-800 font-medium leading-[26px]">
                      <div className="flex flex-wrap gap-x-3">
                        <span>
                          <span className="font-bold">GitHub: </span>
                          <a
                            href="https://github.com/NaveedAfraz"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-cyan-800"
                          >
                            @NaveedAfraz
                          </a>
                        </span>
                        <span>
                          <span className="font-bold">X: </span>
                          <a
                            href="https://twitter.com/NaveedAfrazX"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-cyan-800"
                          >
                            @NaveedAfrazX
                          </a>
                        </span>
                        <span>
                          <span className="font-bold">LinkedIn: </span>
                          <a
                            href="https://www.linkedin.com/in/naveed-afraz-977a46310/"
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:text-cyan-800"
                          >
                            @naveed-afraz
                          </a>
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Back to Page 1 button */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => goToPage(0)}
                        className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-neutral-800 text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-200/80 transition-all cursor-pointer shadow-xs active:scale-95"
                        style={{
                          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                        }}
                        title="Flip back to Page 1 (or press Left Arrow)"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        <span className="font-handwriting text-sm sm:text-base">Flip back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          const elem = document.getElementById("projects");
                          if (elem) elem.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="underline decoration-neutral-800 font-bold text-xs sm:text-sm text-neutral-800 hover:text-cyan-800 cursor-pointer"
                      >
                        View Full Website ➔
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NotebookModal;
