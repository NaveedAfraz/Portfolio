"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const itemRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const divisor = cardLength > 1 ? cardLength - 1 : 1;
    const cardsBreakpoints = content.map((_, index) => index / divisor);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  const handleCardClick = (index) => {
    setActiveCard(index);
    const targetElement = itemRefs.current[index];
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const linearGradients = [
    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
    "linear-gradient(135deg, #14b8a6 0%, #0284c7 100%)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative flex h-[35rem] justify-center space-x-4 md:space-x-6 lg:space-x-10 overflow-y-auto rounded-2xl py-16 md:py-24 w-full bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style]:none [overflow-y-style]:none"
      ref={ref}>
      <div className="relative sour-gummy flex items-start px-4 md:px-0 lg:px-20 flex-1">
        <div className="max-w-3xl w-full">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => handleCardClick(index)}
              className={`my-12 md:my-20 p-5 rounded-xl transition-all duration-300 cursor-pointer ${
                activeCard === index
                  ? "bg-cyan-500/10 border-l-4 border-cyan-500 shadow-lg shadow-cyan-500/5"
                  : "hover:bg-neutral-800/40 opacity-60 hover:opacity-100 border-l-4 border-transparent"
              }`}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.6,
                  x: activeCard === index ? 0 : -5,
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-4xl font-bold text-foreground">
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.6,
                  x: activeCard === index ? 0 : -5,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="text-sm md:text-lg mt-3 md:mt-6 max-w-sm text-muted-foreground leading-relaxed font-light">
                {item.description}
              </motion.p>
              <div className="mt-4 lg:hidden">
                {activeCard === index && item.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className={cn(
          "sticky top-10 mr-10 hidden h-auto min-h-[22rem] lg:min-h-[25rem] w-80 md:w-96 lg:w-[28rem] overflow-hidden rounded-2xl bg-neutral-900/90 dark:bg-[#0c1017]/90 lg:block border border-neutral-800 backdrop-blur-xl shadow-xl",
          contentClassName
        )}>
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="h-full w-full">
          {content[activeCard]?.content ?? null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};