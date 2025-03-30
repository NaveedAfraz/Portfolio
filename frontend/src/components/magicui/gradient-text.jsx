import React from "react";
import { cn } from "../../lib/utils";

export function GradientText({
  className,
  children,
  gradient = "from-primary via-purple-500 to-indigo-500",
  animate = false,
  ...props
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradient,
        animate && "animate-gradient bg-[length:400%_400%]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
