"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    // quickTo is optimized for performance, creating a reusable function that updates a property
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.2,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.2,
      ease: "power3",
    });
    
    const xDotTo = gsap.quickTo(cursorDotRef.current, "x", {
      duration: 0.05,
      ease: "power3",
    });
    const yDotTo = gsap.quickTo(cursorDotRef.current, "y", {
      duration: 0.05,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover effect on interactable elements
    const interactables = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
    
    const onHover = () => {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        backgroundColor: "rgba(239, 68, 68, 0.1)", // subtle red tint
        borderColor: "rgba(239, 68, 68, 0.5)",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        scale: 0,
        duration: 0.2,
      });
    };

    const onLeave = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        scale: 1,
        duration: 0.2,
      });
    };

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onHover);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  });

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
    </>
  );
}
