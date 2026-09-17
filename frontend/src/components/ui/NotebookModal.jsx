import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";

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

  // Listen for Escape key and lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Refresh visits
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

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
          {/* Dark backdrop overlay with vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
          />

          {/* Top-right Status Pill & Web Icon Button */}
          <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[1010] flex items-center gap-2 sm:gap-3">
            {/* Live Visitors Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-neutral-700/80 text-[11px] sm:text-xs font-mono text-neutral-200 shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold">1</span>
              <span className="text-neutral-500">|</span>
              <span className="flex items-center gap-1">
                <span>👥</span>
                <span className="font-semibold">{visits.toLocaleString()}</span>
              </span>
            </div>

            {/* Web Icon Button to switch to real website */}
            <button
              onClick={onClose}
              type="button"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 border border-neutral-700/80 text-neutral-200 hover:text-white hover:border-cyan-500/50 hover:bg-neutral-900 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              title="Open Real Website"
            >
              <Globe className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-xs font-sans font-medium text-neutral-200 group-hover:text-cyan-300">
                Web
              </span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              title="Close Notebook (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Real Generated Notebook Image with Clickable Hotspots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto h-[min(94vh,880px)] aspect-[682/1024] shadow-[0_30px_90px_rgba(0,0,0,0.95)] rounded-xl sm:rounded-2xl overflow-hidden z-10"
          >
            {/* Real Notebook Image */}
            <img
              src="/images/naveed-notebook-note.jpg"
              alt="Naveed Afraz Handwritten Notebook"
              className="w-full h-full object-cover select-none pointer-events-none"
            />

            {/*
              ========================================================================
              INTERACTIVE CLICKABLE HOTSPOTS (Mapped with sub-millimeter precision)
              ========================================================================
            */}
            <div className="absolute inset-0 z-20">
              {/* 1. Header: [ Products ] (Closes modal & scrolls to projects) */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const tryScroll = (attempts = 0) => {
                    const elem = document.getElementById("projects");
                    if (elem) {
                      elem.scrollIntoView({ behavior: "smooth" });
                    } else if (attempts < 15) {
                      setTimeout(() => tryScroll(attempts + 1), 60);
                    }
                  };
                  setTimeout(() => tryScroll(), 80);
                }}
                title="View Products on Website"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "41.5%",
                  top: "31.8%",
                  width: "18.5%",
                  height: "3.8%",
                }}
              />

              {/* 2. [ Klipp ] */}
              <a
                href="https://fx.klipp.in"
                target="_blank"
                rel="noreferrer"
                title="Open Klipp (fx.klipp.in)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "17.5%",
                  top: "35.5%",
                  width: "16.5%",
                  height: "4.4%",
                }}
              />

              {/* 3. edit faster. (Klipp plugin link) */}
              <a
                href="https://fx.klipp.in"
                target="_blank"
                rel="noreferrer"
                title="Klipp - edit faster (fx.klipp.in)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "74.8%",
                  top: "38.6%",
                  width: "17.2%",
                  height: "3.2%",
                }}
              />

              {/* 4. [ techstudents.in ] */}
              <a
                href="https://techstudents.in"
                target="_blank"
                rel="noreferrer"
                title="Open techstudents.in"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "18.0%",
                  top: "43.0%",
                  width: "22.5%",
                  height: "4.3%",
                }}
              />

              {/* 5. [ alprophysioclinic.com ] */}
              <a
                href="https://alprophysioclinic.com"
                target="_blank"
                rel="noreferrer"
                title="Open alprophysioclinic.com"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "18.2%",
                  top: "49.9%",
                  width: "29.3%",
                  height: "4.4%",
                }}
              />

              {/* 6. Web version (Scrolls to Projects and closes modal) */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const tryScroll = (attempts = 0) => {
                    const elem = document.getElementById("projects");
                    if (elem) {
                      elem.scrollIntoView({ behavior: "smooth" });
                    } else if (attempts < 15) {
                      setTimeout(() => tryScroll(attempts + 1), 60);
                    }
                  };
                  setTimeout(() => tryScroll(), 80);
                }}
                title="Go to full website projects section"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95 text-left"
                style={{
                  left: "65.0%",
                  top: "57.5%",
                  width: "22.0%",
                  height: "3.8%",
                }}
              />

              {/* 7. Email: naveedafraz2003@gmail.com */}
              <a
                href="mailto:naveedafraz2003@gmail.com"
                title="Send Email (naveedafraz2003@gmail.com)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "34.5%",
                  top: "80.4%",
                  width: "38.5%",
                  height: "2.9%",
                }}
              />

              {/* 8. X: @NaveedAfrazX */}
              <a
                href="https://twitter.com/NaveedAfrazX"
                target="_blank"
                rel="noreferrer"
                title="Visit Twitter / X (@NaveedAfrazX)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "36.5%",
                  top: "83.3%",
                  width: "26.0%",
                  height: "2.9%",
                }}
              />

              {/* 9. Github: @NaveedAfraz */}
              <a
                href="https://github.com/NaveedAfraz"
                target="_blank"
                rel="noreferrer"
                title="Visit GitHub (@NaveedAfraz)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "37.5%",
                  top: "86.2%",
                  width: "22.5%",
                  height: "2.9%",
                }}
              />

              {/* 10. LinkedIn: @naveed-afraz */}
              <a
                href="https://www.linkedin.com/in/naveed-afraz-977a46310/"
                target="_blank"
                rel="noreferrer"
                title="Visit LinkedIn (@naveed-afraz)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "40.0%",
                  top: "89.1%",
                  width: "24.5%",
                  height: "3.1%",
                }}
              />

              {/* 11. WhatsApp: +91 6300 375 450 */}
              <a
                href="https://wa.me/916300375450"
                target="_blank"
                rel="noreferrer"
                title="Chat on WhatsApp (+91 6300375450)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-blue-600/15 hover:ring-1 hover:ring-blue-500/40 active:scale-95"
                style={{
                  left: "40.0%",
                  top: "92.2%",
                  width: "27.5%",
                  height: "3.2%",
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NotebookModal;
