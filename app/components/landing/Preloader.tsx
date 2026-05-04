"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Fake loading progress
      tl.to({ value: 0 }, {
        value: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function() {
          setProgress(Math.round(this.targets()[0].value));
        }
      });

      // Exit animation
      tl.to(counterRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });

      // Prevent scrolling while preloader is active
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 3500);

    },
    { scope: containerRef }
  );

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-black text-white flex flex-col items-center justify-center"
    >
      <div ref={counterRef} className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest mb-4 text-white/20">
          Awaz<span className="text-accent/80">Do</span>
        </h1>
        <div className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter">
          {progress}%
        </div>
      </div>
    </div>
  );
}
