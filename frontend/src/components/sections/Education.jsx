import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GradientText } from "../magicui/gradient-text";
import { educationData } from "../../config/educationData";

export function Education() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const activeIdxRef = useRef(0);
  const isLockedRef = useRef(false);
  const wheelAccum = useRef(0);

  const total = educationData.length;

  // Sync ref with state
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // ── Global wheel handler ──────────────────────────────────────────────────
  useEffect(() => {
    const THRESHOLD = 120; // px of accumulated delta before advancing a card

    const isSectionActive = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const { top, bottom } = el.getBoundingClientRect();
      // Active once section top scrolls into upper half, until bottom leaves lower half
      return top <= window.innerHeight * 0.5 && bottom >= window.innerHeight * 0.5;
    };

    const onWheel = (e) => {
      if (window.innerWidth < 1024) return; // mobile: don't lock
      if (!isSectionActive()) return;

      const down = e.deltaY > 0;
      const idx  = activeIdxRef.current;

      // At boundary → release page scroll
      if (down && idx >= total - 1) { wheelAccum.current = 0; return; }
      if (!down && idx <= 0)        { wheelAccum.current = 0; return; }

      // Intercept this event
      e.preventDefault();
      if (isLockedRef.current) return;

      // Reset accumulator if scroll direction flipped
      if ((wheelAccum.current > 0 && !down) || (wheelAccum.current < 0 && down)) {
        wheelAccum.current = 0;
      }
      wheelAccum.current += e.deltaY;

      // Only advance once enough delta is collected
      if (Math.abs(wheelAccum.current) < THRESHOLD) return;

      wheelAccum.current = 0;
      isLockedRef.current = true;

      setActiveIdx((prev) => {
        const next = down ? Math.min(prev + 1, total - 1) : Math.max(prev - 1, 0);
        activeIdxRef.current = next;
        return next;
      });

      // 800ms lock so user can read before next card appears
      setTimeout(() => { isLockedRef.current = false; }, 800);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [total]);

  // ── Touch handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    const touchY = { start: 0 };

    const onStart = (e) => { touchY.start = e.touches[0].clientY; };
    const onMove  = (e) => {
      if (window.innerWidth < 1024) return; // mobile: let page scroll naturally
      const el = sectionRef.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      const active = top <= window.innerHeight * 0.5 && bottom >= window.innerHeight * 0.5;
      if (!active) return;
      const delta = touchY.start - e.touches[0].clientY;
      if (Math.abs(delta) < 40) return;

      const down = delta > 0;
      const idx  = activeIdxRef.current;
      if (down && idx >= total - 1) return;
      if (!down && idx <= 0)        return;

      e.preventDefault();
      touchY.start = e.touches[0].clientY;
      if (isLockedRef.current) return;
      isLockedRef.current = true;

      setActiveIdx((prev) => {
        const next = down ? Math.min(prev + 1, total - 1) : Math.max(prev - 1, 0);
        activeIdxRef.current = next;
        return next;
      });
      setTimeout(() => { isLockedRef.current = false; }, 700);
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchmove",  onMove,  { passive: false });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove",  onMove);
    };
  }, [total]);

  const edu = educationData[activeIdx];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative bg-transparent py-16 lg:min-h-screen lg:flex lg:flex-col lg:items-center lg:justify-center lg:py-20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 flex-shrink-0 relative z-10"
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

      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative z-10">

        {/* Left — vertical step nav */}
        <div className="flex-shrink-0 w-full lg:w-64 flex flex-row lg:flex-col gap-3">
          {educationData.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActiveIdx(i)}
              className={`group relative text-left p-4 rounded-2xl border transition-all duration-400 w-full overflow-hidden ${
                activeIdx === i
                  ? "bg-gradient-to-br from-cyan-500/15 to-blue-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
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
              <div className="flex items-center gap-3 pl-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  activeIdx === i
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/40"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                }`}>
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className={`font-bold text-sm sour-gummy leading-tight truncate ${
                    activeIdx === i ? "text-cyan-600 dark:text-cyan-400" : "text-foreground opacity-70"
                  }`}>
                    {item.degree}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.year}</p>
                </div>
              </div>
            </button>
          ))}

          {/* Progress dots */}
          <div className="hidden lg:flex flex-row lg:flex-col items-center gap-2 mt-4 pl-6">
            {educationData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIdx === i
                    ? "w-6 h-2 bg-cyan-500 shadow-sm shadow-cyan-500/50"
                    : "w-2 h-2 bg-neutral-400/40 hover:bg-cyan-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right — animated card */}
        <div className="flex-1 w-full min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 30, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl border border-neutral-200/80 dark:border-neutral-700/40 shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400" />

              <div className="p-7 md:p-9 flex flex-col gap-6">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold sour-gummy text-cyan-600 dark:text-cyan-400 leading-tight">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                          {edu.field}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 whitespace-nowrap">
                      {edu.year}
                    </span>
                  </div>
                  <h4 className="mt-2 text-sm md:text-base font-semibold text-neutral-600 dark:text-neutral-300">
                    {edu.university}
                  </h4>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent" />

                {/* Description */}
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {edu.description}
                </p>

                {/* Key Courses */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
                    Key Courses
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default"
                      >
                        {course}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
