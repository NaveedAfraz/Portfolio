import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const rafRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    const onEnter = (e) => {
      if (e.target.closest("a, button, [role='button'], label")) {
        setHovered(true);
      }
      if (e.target.closest("input, textarea, select, [contenteditable]")) {
        setIsInputHovered(true);
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button, [role='button'], label")) {
        setHovered(false);
      }
      if (e.target.closest("input, textarea, select, [contenteditable]")) {
        setIsInputHovered(false);
      }
    };

    const onMouseLeaveWindow = () => setVisible(false);
    const onMouseEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("dragover", onMove, { passive: true });
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
      const targetScale = hovered ? 1.5 : clicked ? 0.75 : 1;
      scaleRef.current += (targetScale - scaleRef.current) * 0.2;

      if (clicked) {
        // Fast snap during drag / text selection
        ring.current.x = pos.current.x;
        ring.current.y = pos.current.y;
      } else {
        ring.current.x += (pos.current.x - ring.current.x) * 0.25;
        ring.current.y += (pos.current.y - ring.current.y) * 0.25;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0) scale(${scaleRef.current})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("dragover", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      document.removeEventListener("mouseenter", onMouseEnterWindow);
      cancelAnimationFrame(rafRef.current);
    };
  }, [clicked, hovered]);

  return (
    <div className="hidden md:block">
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] w-2.5 h-2.5 rounded-full bg-cyan-400 select-none transition-opacity duration-200 ${
          visible && !isInputHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0)",
          boxShadow: clicked ? "0 0 12px 4px rgba(6,182,212,0.8)" : "0 0 8px 1px rgba(6,182,212,0.5)",
        }}
      />
      {/* Ring — lags behind smoothly */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] w-9 h-9 rounded-full border border-cyan-400/60 bg-cyan-500/5 select-none transition-opacity duration-200 ${
          visible && !isInputHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0) scale(1)",
          borderColor: hovered ? "rgba(6, 182, 212, 0.9)" : "rgba(6, 182, 212, 0.4)",
          backgroundColor: hovered ? "rgba(6, 182, 212, 0.12)" : "rgba(6, 182, 212, 0.03)",
        }}
      />
    </div>
  );
};

export default CustomCursor;
