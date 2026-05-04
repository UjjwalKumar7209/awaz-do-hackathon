"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Mail, Zap, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: <Search size={32} />,
    title: "AI Authority Mapping",
    desc: "No more guessing who to contact. We instantly match your issue to the correct municipal department.",
  },
  {
    icon: <Mail size={32} />,
    title: "Auto-Drafted Emails",
    desc: "We generate a formal, structured complaint letter ready to be sent with one click.",
  },
  {
    icon: <Zap size={32} />,
    title: "Frictionless Process",
    desc: "From taking a photo to sending the complaint takes less than 60 seconds.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Verified Channels",
    desc: "Complaints are directed to official, verified government email addresses for guaranteed delivery.",
  },
];

export default function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

      gsap.fromTo(cards,
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-6">
            The <span className="text-accent">Solution</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            We remove the bureaucratic friction so you can focus on making your city better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card bg-[#111] border border-white/5 p-8 md:p-12 hover:border-accent/30 transition-colors duration-500 group"
            >
              <div className="mb-8 text-accent bg-accent/10 w-16 h-16 flex items-center justify-center rounded-xl group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 uppercase">{feature.title}</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
