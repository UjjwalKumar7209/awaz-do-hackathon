"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Simple parallax on the background and text reveal
      gsap.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-40 px-4 bg-accent relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 text-center" ref={textRef}>
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9]">
          Your City. <br />
          Your Responsibility.
        </h2>
        <p className="mt-12 text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
          Every pothole fixed, every streetlight repaired, starts with someone deciding not to look the other way. Be that someone.
        </p>
      </div>
    </section>
  );
}
