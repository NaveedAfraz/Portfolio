import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const rafRef = useRef(null);
  const hoveredRef = useRef(false);
  const clickedRef = useRef(false);
  const visibleRef = useRef(false);
  const isInputHoveredRef = useRef(false);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch, { passive: true });
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onDown = () => {
      clickedRef.current = true;
      if (dotRef.current) {
        dotRef.current.style.boxShadow = "0 0 12px 4px rgba(6,182,212,0.8)";
      }
    };

    const onUp = () => {
      clickedRef.current = false;
      if (dotRef.current) {
        dotRef.current.style.boxShadow = "0 0 8px 1px rgba(6,182,212,0.5)";
      }
    };

    const onEnter = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const clickable = target.closest("a, button, [role='button'], label");
      if (clickable && !hoveredRef.current) {
        hoveredRef.current = true;
        if (ringRef.current) {
          ringRef.current.style.borderColor = "rgba(6, 182, 212, 0.9)";
          ringRef.current.style.backgroundColor = "rgba(6, 182, 212, 0.12)";
        }
      }
      const isInput = target.closest("input, textarea, select, [contenteditable]");
      if (isInput && !isInputHoveredRef.current) {
        isInputHoveredRef.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "0";
        if (ringRef.current) ringRef.current.style.opacity = "0";
      }
    };

    const onLeave = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      if (hoveredRef.current && target.closest("a, button, [role='button'], label")) {
        hoveredRef.current = false;
        if (ringRef.current) {
          ringRef.current.style.borderColor = "rgba(6, 182, 212, 0.4)";
          ringRef.current.style.backgroundColor = "rgba(6, 182, 212, 0.03)";
        }
      }
      if (isInputHoveredRef.current && target.closest("input, textarea, select, [contenteditable]")) {
        isInputHoveredRef.current = false;
        if (visibleRef.current) {
          if (dotRef.current) dotRef.current.style.opacity = "1";
          if (ringRef.current) ringRef.current.style.opacity = "1";
        }
      }
    };

    const onMouseLeaveWindow = () => {
      visibleRef.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseEnterWindow = () => {
      visibleRef.current = true;
      if (!isInputHoveredRef.current) {
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseover", onEnter, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);
    document.addEventListener("mouseenter", onMouseEnterWindow);

    const animate = () => {
      // Dot: snaps instantly 1:1
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x - 5}px, ${pos.current.y - 5}px, 0)`;
      }

      // Ring: follow cursor smoothly
      const targetScale = hoveredRef.current ? 1.5 : clickedRef.current ? 0.75 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * 0.25;

      if (clickedRef.current) {
        ring.current.x = pos.current.x;
        ring.current.y = pos.current.y;
      } else {
        ring.current.x += (pos.current.x - ring.current.x) * 0.3;
        ring.current.y += (pos.current.y - ring.current.y) * 0.3;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0) scale(${scaleRef.current})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full bg-cyan-400 select-none opacity-0"
        style={{
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0)",
          boxShadow: "0 0 8px 1px rgba(6,182,212,0.5)",
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Ring — lags behind smoothly */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-9 h-9 rounded-full border border-cyan-400/50 bg-cyan-500/5 select-none opacity-0"
        style={{
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0) scale(1)",
          transition: "opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
        }}
      />
    </div>
  );
};

export default CustomCursor;
