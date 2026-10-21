import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe } from "lucide-react";
import { useOnlinePresence } from "../../hooks/useOnlinePresence";

export const NotebookModal = ({ isOpen, onClose }) => {
  const { onlineCount, visits } = useOnlinePresence();
  const [progress, setProgress] = useState(100);

  // 10-second countdown timer to auto-show home page
  useEffect(() => {
    if (!isOpen) return;

    setProgress(100);
    const duration = 10000; // 10 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingPercent = Math.max(0, (1 - elapsed / duration) * 100);
      setProgress(remainingPercent);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  // Listen for Escape key and manage background scroll locking
  useEffect(() => {
    const restoreScroll = () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.overflowY = "auto";
        document.documentElement.style.overflow = "";
        document.documentElement.style.overflowY = "auto";
      }
    };

    if (isOpen) {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }
    } else {
      restoreScroll();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      restoreScroll();
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
          {/* Top 10-Second Progress Line (Smooth gradient, no timer pill in UI) */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-black/40 z-[1020] overflow-hidden pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-75 ease-linear"
              style={{
                width: `${Math.max(0, Math.min(100, progress))}%`,
              }}
            />
          </div>

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
            <div className="flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/90 border border-neutral-700/80 text-[10px] sm:text-xs font-mono text-neutral-200 shadow-2xl backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-semibold text-emerald-400">{onlineCount}</span>
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
              className="group flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/90 border border-neutral-700/80 text-neutral-200 hover:text-white hover:border-cyan-500/50 hover:bg-neutral-900 transition-all shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
              title="Open Real Website"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-[11px] sm:text-xs font-sans font-medium text-neutral-200 group-hover:text-cyan-300">
                Web
              </span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95"
              title="Close Notebook (Esc)"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Real Generated Notebook Image with Clickable Hotspots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto shadow-[0_30px_90px_rgba(0,0,0,0.95)] rounded-xl sm:rounded-2xl overflow-hidden z-10 mt-12 sm:mt-0 max-w-full"
            style={{
              width: "min(calc(100vw - 1.5rem), calc((100dvh - 4.5rem) * (682 / 1024)), 580px)",
              height: "auto",
              aspectRatio: "682 / 1024",
            }}
          >
            {/* Real Notebook Image */}
            <img
              src="/images/naveed-notebook-note.jpg"
              alt="Naveed Afraz Handwritten Notebook"
              className="w-full h-full object-contain select-none pointer-events-none"
            />

            {/*
              ========================================================================
              INTERACTIVE CLICKABLE HOTSPOTS (Mapped with high precision & generous hitboxes)
              ========================================================================
            */}
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {/* 1a. Intro Tag: "build [ products ] into existence" */}
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
                title="View Projects on Website"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "45.0%",
                  top: "23.2%",
                  width: "17.0%",
                  height: "3.8%",
                }}
              />

              {/* 1b. Header: Projects -> [ Products ] (Closes modal & scrolls to projects) */}
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
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "41.0%",
                  top: "30.8%",
                  width: "19.0%",
                  height: "3.8%",
                }}
              />

              {/* 2. [ Klipp ] */}
              <a
                href="https://fx.klipp.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open Klipp (fx.klipp.in)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "17.0%",
                  top: "35.2%",
                  width: "17.0%",
                  height: "4.4%",
                }}
              />

              {/* 3. edit faster. (Klipp plugin link) */}
              <a
                href="https://fx.klipp.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Klipp - edit faster (fx.klipp.in)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "74.5%",
                  top: "38.4%",
                  width: "18.0%",
                  height: "3.4%",
                }}
              />

              {/* 4. [ techstudents.in ] */}
              <a
                href="https://techstudents.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open techstudents.in"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "17.5%",
                  top: "42.8%",
                  width: "23.5%",
                  height: "4.4%",
                }}
              />

              {/* 5. [ alprophysioclinic.com ] */}
              <a
                href="https://alprophysioclinic.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open alprophysioclinic.com"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "17.8%",
                  top: "49.8%",
                  width: "30.0%",
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
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95 text-left"
                style={{
                  left: "67.0%",
                  top: "57.3%",
                  width: "20.0%",
                  height: "3.8%",
                }}
              />

              {/* 7. Email: naveedafraz2003@gmail.com (Generous hitbox covering full row) */}
              <a
                href="mailto:naveedafraz2003@gmail.com"
                onClick={(e) => e.stopPropagation()}
                title="Send Email (naveedafraz2003@gmail.com)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "21.0%",
                  top: "80.4%",
                  width: "53.0%",
                  height: "3.1%",
                }}
              />

              {/* 8. Twitter / X: @NaveedAfrazX (Generous hitbox covering full row) */}
              <a
                href="https://x.com/NaveedAfrazX"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Visit Twitter / X (@NaveedAfrazX)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "21.0%",
                  top: "83.3%",
                  width: "44.0%",
                  height: "3.2%",
                }}
              />

              {/* 9. Github: @NaveedAfraz (Generous hitbox covering full row) */}
              <a
                href="https://github.com/NaveedAfraz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Visit GitHub (@NaveedAfraz)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "21.0%",
                  top: "86.1%",
                  width: "41.0%",
                  height: "3.2%",
                }}
              />

              {/* 10. LinkedIn: @naveed-afraz (Generous hitbox covering full row) */}
              <a
                href="https://www.linkedin.com/in/naveed-afraz-977a46310/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Visit LinkedIn (@naveed-afraz)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "21.0%",
                  top: "89.0%",
                  width: "45.0%",
                  height: "3.2%",
                }}
              />

              {/* 11. WhatsApp: +91 6300 375 450 (Generous hitbox covering full row) */}
              <a
                href="https://wa.me/916300375450"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Chat on WhatsApp (+91 6300375450)"
                className="absolute rounded-sm transition-all duration-150 cursor-pointer hover:bg-cyan-500/15 hover:ring-1 hover:ring-cyan-500/50 active:scale-95"
                style={{
                  left: "21.0%",
                  top: "91.9%",
                  width: "48.0%",
                  height: "3.3%",
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
