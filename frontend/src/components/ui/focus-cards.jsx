// src/components/ui/focus-cards.jsx
import React, { useState } from "react";

// A utility function similar to cn from @/lib/utils
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const FocusedCard = React.memo(({
  children,
  index,
  hovered,
  setHovered,
  className,
}) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-lg relative overflow-hidden transition-all duration-300 ease-out",
      hovered !== null 
        && hovered !== index 
        && "blur-sm scale-[0.98]",
      className
    )}
  >
    {children}
  </div>
));

FocusedCard.displayName = "FocusedCard";

export function FocusedCardContainer({
  children,
  className
}) {
  const [hovered, setHovered] = useState(null);
  
  // Clone children and add props
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        index,
        hovered,
        setHovered
      });
    }
    return child;
  });

  return (
    <div className={className}>
      {childrenWithProps}
    </div>
  );
}