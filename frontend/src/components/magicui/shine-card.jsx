import React from "react";
import { cn } from "../../lib/utils";

export function ShineCard({
  className,
  containerClassName,
  shineBorder = true,
  shineGradient = true,
  shineHover = true,
  shimmerColor = "white",
  background = "bg-background/60",
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        containerClassName
      )}
    >
      {/* Shine border */}
      {shineBorder && (
        <div className="absolute inset-0 rounded-xl z-0">
          <div
            className={cn(
              "absolute inset-0 rounded-xl z-0",
              shineHover ? "group-hover:opacity-100 opacity-0" : "opacity-100",
              "transition-opacity duration-500"
            )}
          >
            <div className="absolute inset-[-2px] rounded-xl bg-[conic-gradient(var(--shimmer-color),var(--shimmer-color),var(--shimmer-color),var(--shimmer-color),transparent,var(--shimmer-color),var(--shimmer-color))] opacity-50 animate-[spin_4s_linear_infinite]" 
              style={{ "--shimmer-color": shimmerColor }}
            />
          </div>
        </div>
      )}

      {/* Content container */}
      <div
        className={cn(
          "relative z-10 p-6 rounded-xl border backdrop-blur-md",
          background,
          className
        )}
        {...props}
      >
        {/* Shine gradient */}
        {shineGradient && (
          <div
            className={cn(
              "absolute inset-0 z-0 overflow-hidden rounded-xl",
              shineHover ? "group-hover:opacity-100 opacity-0" : "opacity-100",
              "transition-opacity duration-500"
            )}
          >
            <div
              className="absolute inset-0 z-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full animate-[shine_2s_infinite]"
              style={{ "--shimmer-color": shimmerColor }}
            />
          </div>
        )}

        {/* Actual content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

export const ShineCardHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
);

export const ShineCardTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80", className)}
    {...props}
  />
);

export const ShineCardDescription = ({ className, ...props }) => (
  <p
    className={cn("text-muted-foreground", className)}
    {...props}
  />
);

export const ShineCardContent = ({ className, ...props }) => (
  <div className={cn("pt-0", className)} {...props} />
);

export const ShineCardFooter = ({ className, ...props }) => (
  <div
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
);
