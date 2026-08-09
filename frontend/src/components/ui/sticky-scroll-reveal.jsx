"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  sectionTitle,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef(null);    // the whole section element
  const containerRef = useRef(null);  // the inner scrollable box
  const itemRefs = useRef([]);
  const isActiveRef = useRef(false);  // is section in view?

  const cardLength = content.length;

  // ── Intersection observer: lock/unlock based on section visibility ────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.4;
      },
      { threshold: [0, 0.4, 1] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ── Global wheel handler: intercept ALL scroll while section is active ─────
  useEffect(() => {
    const inner = containerRef.current;
    if (!inner) return;

    const onWheel = (e) => {
      if (!isActiveRef.current) return;

      const scrollingDown = e.deltaY > 0;
      const atTop    = inner.scrollTop <= 1;
      const atBottom = inner.scrollTop >= inner.scrollHeight - inner.clientHeight - 1;

      // At boundary in scroll direction → let page scroll naturally
      if ((scrollingDown && atBottom) || (!scrollingDown && atTop)) return;

      // Otherwise: consume the event, forward delta to inner box
      e.preventDefault();
      inner.scrollBy({ top: e.deltaY * 1.2, behavior: "auto" });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // ── Touch handler: same logic for mobile ──────────────────────────────────
  const touchStartY = useRef(null);

  useEffect(() => {
    const inner = containerRef.current;
    if (!inner) return;

    const onTouchStart = (e) => {
      if (!isActiveRef.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isActiveRef.current || touchStartY.current === null) return;

      const delta = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;

      const scrollingDown = delta > 0;
      const atTop    = inner.scrollTop <= 1;
      const atBottom = inner.scrollTop >= inner.scrollHeight - inner.clientHeight - 1;

      if ((scrollingDown && atBottom) || (!scrollingDown && atTop)) return;

      e.preventDefault();
      inner.scrollBy({ top: delta, behavior: "auto" });
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, []);

  // ── IntersectionObserver: highlight active card ───────────────────────────
  useEffect(() => {
    const observers = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveCard(index);
          }
        },
        {
          root: containerRef.current,
          threshold: [0.4],
          rootMargin: "-5% 0px -5% 0px",
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [cardLength]);

  // ── Click to jump to card ─────────────────────────────────────────────────
  const handleCardClick = (index) => {
    setActiveCard(index);
    const el = itemRefs.current[index];
    const box = containerRef.current;
    if (!el || !box) return;
    const top = el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2;
    box.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="w-full">
      {/* Section title */}
      {sectionTitle && (
        <div className="w-full px-4 sm:px-6 mb-6">
          {sectionTitle}
        </div>
      )}

      <div className="flex justify-center space-x-4 md:space-x-6 lg:space-x-10 w-full px-4 sm:px-6">
        {/* Inner scrollable card list — CSS scroll hidden */}
        <div
          ref={containerRef}
          className="relative sour-gummy flex-1 max-w-3xl"
          style={{
            height: "70vh",
            overflowY: "auto",
            overscrollBehavior: "none",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Top spacer so first card starts centred */}
          <div style={{ height: "25vh" }} />

          {content.map((item, index) => (
            <div
              key={item.title + index}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => handleCardClick(index)}
              className={`my-10 p-5 rounded-xl transition-all duration-300 cursor-pointer ${
                activeCard === index
                  ? "bg-cyan-500/10 border-l-4 border-cyan-500 shadow-lg shadow-cyan-500/5"
                  : "hover:bg-black/5 dark:hover:bg-neutral-800/40 opacity-60 hover:opacity-100 border-l-4 border-transparent"
              }`}
            >
              <motion.h2
                animate={{
                  opacity: activeCard === index ? 1 : 0.5,
                  x: activeCard === index ? 0 : -8,
                }}
                transition={{ duration: 0.35 }}
                className="text-2xl md:text-4xl font-bold text-foreground"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{
                  opacity: activeCard === index ? 1 : 0.5,
                  x: activeCard === index ? 0 : -8,
                }}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="text-sm md:text-lg mt-3 md:mt-6 max-w-sm text-muted-foreground leading-relaxed font-light"
              >
                {item.description}
              </motion.p>
              {/* Mobile: inline card content */}
              <div className="mt-4 lg:hidden">{item.content}</div>
            </div>
          ))}

          {/* Bottom spacer so last card can be centred */}
          <div style={{ height: "25vh" }} />
        </div>

        {/* Desktop: sticky preview card on the right */}
        <div className="hidden lg:block sticky top-10 self-start flex-shrink-0 w-80 md:w-96 lg:w-[28rem] mr-10">
          <motion.div
            className={cn(
              "h-auto min-h-[22rem] lg:min-h-[25rem] overflow-hidden rounded-2xl bg-neutral-900/90 dark:bg-[#0c1017]/90 border border-neutral-800 backdrop-blur-xl shadow-xl",
              contentClassName
            )}
          >
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full"
            >
              {content[activeCard]?.content ?? null}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};