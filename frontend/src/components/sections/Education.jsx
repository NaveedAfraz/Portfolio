import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GradientText } from "../magicui/gradient-text";
import { educationData } from "../../config/educationData";

export function Education() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const isIntersectingRef = useRef(false);
  const isLockedRef = useRef(false);
  const wheelAccumRef = useRef(0);
  const total = educationData.length;
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    // Dominant horizontal swipe
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX > 0) {
        setActiveIdx((prev) => Math.min(prev + 1, total - 1));
      } else {
        setActiveIdx((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  // ── IntersectionObserver: ONLY observe the cards container ───────────────
  // rootMargin: -50px from top accounts for the 64px fixed navbar
  useEffect(() => {
    const el = cardsContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.65;
      },
      {
        rootMargin: "-50px 0px 0px 0px",
        threshold: [0, 0.35, 0.65, 0.9],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Precise Wheel Interception: ONLY when cards are fully visible ─────────
  useEffect(() => {
    const THRESHOLD = 60; // px delta before advancing

    const isCardsFullyVisible = () => {
      const el = cardsContainerRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      // Top must be below the fixed navbar (>= 50px)
      // Bottom must be comfortably within the viewport (<= innerHeight + 50px)
      return rect.top >= 50 && rect.bottom <= window.innerHeight + 50;
    };

    const onWheel = (e) => {
      // Mobile (< 1024px) or cards not in view: allow native natural scroll with zero delay
      if (window.innerWidth < 1024) return;
      if (!isIntersectingRef.current) return;
      if (!isCardsFullyVisible()) return;

      const down = e.deltaY > 0;

      // At boundary: release to normal page scroll
      if (down && activeIdx >= total - 1) {
        wheelAccumRef.current = 0;
        return;
      }
      if (!down && activeIdx <= 0) {
        wheelAccumRef.current = 0;
        return;
      }

      // Intercept wheel to transition between cards
      e.preventDefault();
      if (isLockedRef.current) return;

      if ((wheelAccumRef.current > 0 && !down) || (wheelAccumRef.current < 0 && down)) {
        wheelAccumRef.current = 0;
      }
      wheelAccumRef.current += e.deltaY;

      if (Math.abs(wheelAccumRef.current) < THRESHOLD) return;

      wheelAccumRef.current = 0;
      isLockedRef.current = true;

      setActiveIdx((prev) => {
        const next = down ? Math.min(prev + 1, total - 1) : Math.max(prev - 1, 0);
        return next;
      });

      // Snappy cooldown matching the Framer Motion animation duration (280ms)
      setTimeout(() => {
        isLockedRef.current = false;
      }, 380);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [activeIdx, total]);

  const edu = educationData[activeIdx];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative bg-transparent py-12 sm:py-16 lg:py-20 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center overflow-hidden scroll-mt-20"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 lg:mb-12 flex-shrink-0 relative z-10"
      >
        <h2 className="text-3xl font-bold tracking-tighter sour-gummy">
          <GradientText
            gradient="from-cyan-600 to-cyan-400 dark:from-cyan-400 dark:to-cyan-200"
            animate
            className="text-4xl font-bold"
          >
            Education
          </GradientText>
          <div className="h-1 w-20 mt-2 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-600 mx-auto rounded-full" />
        </h2>
      </motion.div>

      {/* Main Content Grid: Step Nav + Animated Card */}
      <div
        ref={cardsContainerRef}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-4 lg:gap-12 items-center lg:items-start relative z-10"
      >
        {/* ── Mobile Tab Segment Control (lg:hidden) ── */}
        <div className="lg:hidden w-full flex items-center bg-white/10 dark:bg-neutral-900/80 backdrop-blur-xl p-1.5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 gap-1.5 shadow-sm">
          {educationData.map((item, i) => {
            const shortLabels = ["MCA", "BCA", "School"];
            const isSelected = activeIdx === i;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIdx(i)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-[1.02]"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-foreground hover:bg-white/5"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate">{shortLabels[i]}</span>
              </button>
            );
          })}
        </div>

        {/* ── Desktop Left Column — Step Navigation Buttons (hidden lg:flex) ── */}
        <div className="hidden lg:flex flex-shrink-0 w-68 flex-col gap-3">
          {educationData.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(i)}
              className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 w-full overflow-hidden cursor-pointer ${
                activeIdx === i
                  ? "bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10 scale-[1.02]"
                  : "bg-white/5 dark:bg-neutral-900/40 border-neutral-200/50 dark:border-neutral-800/60 hover:border-cyan-500/30 hover:bg-cyan-500/5"
              }`}
            >
              {/* Active glow strip */}
              {activeIdx === i && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-l-2xl"
                />
              )}
              <div className="flex items-center gap-3 pl-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shrink-0 ${
                    activeIdx === i
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/40"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p
                    className={`font-bold text-sm sour-gummy leading-tight truncate ${
                      activeIdx === i
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-foreground opacity-70"
                    }`}
                  >
                    {item.degree}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.year}</p>
                </div>
              </div>
            </button>
          ))}

          {/* Progress dots & hint */}
          <div className="hidden lg:flex items-center gap-2 mt-3 pl-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Scroll cards ({activeIdx + 1}/{total})</span>
          </div>
        </div>

        {/* Right Column — Animated Card */}
        <div
          className="flex-1 w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl border border-neutral-200/80 dark:border-neutral-700/50 shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400" />

              <div className="p-5 sm:p-7 md:p-9 flex flex-col gap-5 sm:gap-6">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold sour-gummy text-cyan-600 dark:text-cyan-400 leading-tight">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          {edu.field}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 whitespace-nowrap">
                      {edu.year}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs sm:text-sm md:text-base font-semibold text-neutral-600 dark:text-neutral-300">
                    {edu.university}
                  </h4>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {edu.description}
                </p>

                {/* Key Courses */}
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-2.5">
                    Key Courses
                  </h5>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {edu.courses.map((course, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Mobile Navigation Controls (Prev / Dots / Next) ── */}
          <div className="lg:hidden flex items-center justify-between w-full px-1 mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            <button
              onClick={() => setActiveIdx((prev) => Math.max(prev - 1, 0))}
              disabled={activeIdx === 0}
              className={`flex items-center gap-1.5 font-bold py-2 px-3.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800 transition-all ${
                activeIdx === 0
                  ? "opacity-25 cursor-not-allowed border-transparent"
                  : "bg-white/5 dark:bg-neutral-900/60 hover:text-cyan-400 hover:border-cyan-500/30 cursor-pointer active:scale-95 text-foreground"
              }`}
            >
              ← Prev
            </button>
            <div className="flex items-center gap-2">
              {educationData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to card ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIdx === i ? "w-6 bg-cyan-400 shadow-sm shadow-cyan-400/50" : "w-2 bg-neutral-400/40 dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveIdx((prev) => Math.min(prev + 1, total - 1))}
              disabled={activeIdx === total - 1}
              className={`flex items-center gap-1.5 font-bold py-2 px-3.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800 transition-all ${
                activeIdx === total - 1
                  ? "opacity-25 cursor-not-allowed border-transparent"
                  : "bg-white/5 dark:bg-neutral-900/60 hover:text-cyan-400 hover:border-cyan-500/30 cursor-pointer active:scale-95 text-foreground"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Education;
