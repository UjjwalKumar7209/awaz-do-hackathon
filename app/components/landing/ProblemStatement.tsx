"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Pinning the section and scaling the text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      tl.to(textRef.current, {
        scale: 1.2,
        opacity: 1,
        ease: "none",
      })
      .to(textRef.current, {
        color: "#ef4444", // accent color
        duration: 0.5,
      }, "<0.5");
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center justify-center bg-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 text-center z-10">
        <h2 
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white/40 leading-tight"
        >
          Silence changes <br />
          <span className="block mt-4">nothing.</span>
        </h2>
      </div>
    </section>
  );
}
