"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll } from "motion/react";
import React from "react";

export const ScrollProgress = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 w-[92%] left-7 top-20 z-50 h-px origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}  
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      ></motion.div>
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";

export default ScrollProgress;
