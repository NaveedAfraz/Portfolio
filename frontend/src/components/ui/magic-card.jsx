import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const MagicCard = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden bg-background/80 backdrop-blur-sm border border-primary/10",
        "transition-all duration-300 hover:shadow-[0_0_30px_4px_rgba(var(--primary)_/_0.1)]",
        "dark:bg-background/30 dark:hover:shadow-[0_0_30px_4px_rgba(var(--primary)_/_0.2)]",
        className
      )}
      ref={ref}
      {...props}
    >
      {/* MagicUI-inspired gradient border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 blur-sm"></div>
      </div>
      
      {/* MagicUI-inspired shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

MagicCard.displayName = "MagicCard";

const MagicCardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 flex flex-col space-y-1.5", className)}
    {...props}
  />
));
MagicCardHeader.displayName = "MagicCardHeader";

const MagicCardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
MagicCardTitle.displayName = "MagicCardTitle";

const MagicCardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
MagicCardDescription.displayName = "MagicCardDescription";

const MagicCardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
MagicCardContent.displayName = "MagicCardContent";

const MagicCardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
MagicCardFooter.displayName = "MagicCardFooter";

export { MagicCard, MagicCardHeader, MagicCardTitle, MagicCardDescription, MagicCardContent, MagicCardFooter };
