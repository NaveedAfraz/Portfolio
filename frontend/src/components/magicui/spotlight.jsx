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
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      containerRef.current.style.setProperty('--x', `${x}px`);
      containerRef.current.style.setProperty('--y', `${y}px`);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
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
