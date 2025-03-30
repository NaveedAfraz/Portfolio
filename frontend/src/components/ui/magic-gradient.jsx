import { cn } from "../../lib/utils";

export function MagicGradient({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full transition-all duration-500",
        variant === "default" && "light:bg-white light:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:bg-black dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]",
        variant === "purple" && "light:bg-white light:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#a855f7_100%)] dark:bg-black dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#a855f7_100%)]",
        variant === "blue" && "light:bg-white light:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#3b82f6_100%)] dark:bg-black dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#3b82f6_100%)]",
        variant === "pink" && "light:bg-white light:[background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ec4899_100%)] dark:bg-black dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#ec4899_100%)]",
        className
      )}
      {...props}
    />
  );
}

export function MagicSpotlight({ className, ...props }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        "light:[background:radial-gradient(600px_circle_at_var(--x,_0px)_var(--y,_0px),rgba(120,_119,_198,_0.15),transparent_40%)]",
        "dark:[background:radial-gradient(600px_circle_at_var(--x,_0px)_var(--y,_0px),rgba(120,_119,_198,_0.25),transparent_40%)]",
        className
      )}
      {...props}
    />
  );
}
