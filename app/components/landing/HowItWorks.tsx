"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Describe the Issue",
    desc: "Spotted a pothole, broken streetlight, or garbage dump? Write a brief description of the problem.",
  },
  {
    num: "02",
    title: "Upload Evidence",
    desc: "Attach a clear photo of the issue. Visual proof accelerates the resolution process.",
  },
  {
    num: "03",
    title: "AI Analysis",
    desc: "Our system instantly identifies the correct civic authority and provides the exact steps to take.",
  },
  {
    num: "04",
    title: "Generate Complaint",
    desc: "One click generates a formal, professional email ready to be sent to the officials.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".step-item");
      
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { 
            y: 100, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate the line connecting steps
        const line = item.querySelector(".step-line");
        if (line) {
          gsap.fromTo(line,
            { height: 0 },
            {
              height: "100%",
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 60%",
                end: "bottom 40%",
                scrub: true,
              }
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 px-4 bg-background relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-24 md:mb-32">
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
            How It <span className="text-accent">Works</span>
          </h2>
          <p className="mt-6 text-xl text-white/60 max-w-xl font-medium">
            Four simple steps to transform your complaint into actionable civic progress.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {STEPS.map((step, idx) => (
            <div key={idx} className="step-item relative flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              {/* Number Column */}
              <div className="relative z-10 flex-shrink-0">
                <span className="text-6xl md:text-8xl font-bold text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                  {step.num}
                </span>
              </div>

              {/* Connecting Line (Desktop) */}
              {idx !== STEPS.length - 1 && (
                <div className="absolute left-[3.5rem] top-24 bottom-[-6rem] w-[2px] bg-white/5 hidden md:block z-0">
                  <div className="step-line w-full bg-accent origin-top"></div>
                </div>
              )}

              {/* Content Column */}
              <div className="pt-2 md:pt-6 flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase">{step.title}</h3>
                <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
