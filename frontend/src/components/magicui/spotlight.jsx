import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export function Spotlight({
  className,
  children,
  spotlightColor = "rgba(255, 0, 0, 0.15)",
  size = 100,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    let rect = null;
    let rafId = null;

    const handleMouseEnter = () => {
      if (containerRef.current) {
        rect = containerRef.current.getBoundingClientRect();
      }
    };

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      if (!rect) {
        rect = containerRef.current.getBoundingClientRect();
      }
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || !rect) return;
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        containerRef.current.style.setProperty('--x', `${x}px`);
        containerRef.current.style.setProperty('--y', `${y}px`);
      });
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rect = null;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ 
        "--spotlight-color": spotlightColor,
        "--spotlight-size": `${size}px`
      }}
      {...props}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(var(--spotlight-size) circle at var(--x, 0px) var(--y, 0px), var(--spotlight-color), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
