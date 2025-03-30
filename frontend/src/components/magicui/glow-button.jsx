import React from "react";
import { cn } from "../../lib/utils";

export function GlowButton({
  className,
  children,
  glowColor = "rgba(120, 119, 198, 0.4)",
  gradientColors = ["from-indigo-500", "via-purple-500", "to-pink-500"],
  variant = "default",
  size = "default",
  ...props
}) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "group hover:shadow-[0_0_20px_2px_var(--glow-color)]",
        variant === "default" && cn("bg-gradient-to-r", ...gradientColors, "text-white"),
        variant === "outline" && "border border-primary/50 bg-background hover:bg-primary/10 text-foreground",
        variant === "ghost" && "bg-transparent hover:bg-primary/10 text-foreground",
        size === "default" && "h-10 px-6 py-2 text-sm",
        size === "sm" && "h-8 px-4 py-1 text-xs",
        size === "lg" && "h-12 px-8 py-3 text-base",
        className
      )}
      style={{ "--glow-color": glowColor }}
      {...props}
    >
      {/* Glow effect */}
      <span className="absolute inset-0 overflow-hidden rounded-md">
        <span className="absolute inset-0 z-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      </span>

      {/* Shine effect */}
      <span className="absolute inset-0 z-0 overflow-hidden rounded-md">
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
