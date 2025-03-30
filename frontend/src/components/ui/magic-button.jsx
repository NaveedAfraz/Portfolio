import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const MagicButton = forwardRef(({ className, variant, size, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all rounded-md group",
        variant === "primary" && "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg",
        variant === "secondary" && "border border-primary/20 bg-background hover:bg-primary/10 text-foreground",
        variant === "outline" && "border border-primary/20 bg-transparent hover:bg-primary/5 text-foreground",
        size === "sm" && "text-sm px-4 py-2",
        size === "lg" && "text-lg px-8 py-4",
        className
      )}
      ref={ref}
      {...props}
    >
      {/* MagicUI-inspired shine effect */}
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_3s_ease-in-out_infinite] pointer-events-none"></span>
      
      {/* MagicUI-inspired hover glow */}
      <span className="absolute inset-0 w-full h-full transition duration-300 group-hover:opacity-100 opacity-0 bg-gradient-to-r from-primary/20 via-primary/0 to-primary/20 blur-xl"></span>
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
});

MagicButton.displayName = "MagicButton";

export { MagicButton };
