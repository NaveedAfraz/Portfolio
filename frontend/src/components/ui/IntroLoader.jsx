import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    quote: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    quote: "The beginning is the most important part of the work.",
    author: "Plato",
  },
];

export default function IntroLoader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
    }, 2100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const words = quote.quote.split(" ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="initial-loader"
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#07090e] px-6 select-none transition-colors duration-500"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: "blur(6px)",
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Ambient Glowing Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[280px] w-[280px] rounded-full blur-[90px] bg-cyan-500/25"
          />

          {/* Animated SVG Monogram */}
          <div className="relative mb-8">
            <svg
              width="100"
              height="100"
              viewBox="0 0 200 200"
              fill="none"
              className="relative drop-shadow-[0_0_24px_rgba(6,182,212,0.4)]"
            >
              <motion.path
                d="M100 24 L168 63 L168 137 L100 176 L32 137 L32 63 Z"
                stroke="url(#ldr-grad)"
                strokeWidth="6"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.path
                d="M72 138 L72 62 L128 138 L128 62"
                stroke="#22d3ee"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.65, 0, 0.35, 1] }}
              />
              <defs>
                <linearGradient id="ldr-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Quote with Word Reveal */}
          <div className="relative flex w-full max-w-md flex-col items-center gap-4 text-center">
            <div className="flex min-h-[4rem] flex-col items-center justify-center gap-2 px-2">
              <p className="text-balance text-sm sm:text-base font-medium leading-relaxed text-slate-800 dark:text-neutral-100">
                <span className="text-cyan-400 mr-1 font-serif text-lg">“</span>
                {words.map((word, idx) => (
                  <motion.span
                    key={`${word}-${idx}`}
                    className="inline-block mr-1 text-slate-800 dark:text-white font-medium"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + 0.04 * idx,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
                <span className="text-cyan-400 ml-0.5 font-serif text-lg">”</span>
              </p>

              <motion.span
                className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-400 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + 0.04 * words.length + 0.1, duration: 0.4 }}
              >
                — {quote.author}
              </motion.span>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 relative h-[3px] w-44 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <motion.div
                className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1] }}
              />
            </div>

            <motion.span
              className="text-[10px] font-semibold uppercase tracking-[0.45em] text-neutral-400 dark:text-neutral-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Naveed Afraz
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
