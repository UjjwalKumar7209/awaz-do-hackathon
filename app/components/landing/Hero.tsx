'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()

      // Setup initial states
      gsap.set(
        [headingRef.current, textRef.current, btnRef.current, pillRef.current],
        {
          y: 100,
          opacity: 0
        }
      )

      tl.to(pillRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        delay: 2.5 // Added delay for Preloader
      })
        .to(
          headingRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out'
          },
          '-=0.6'
        )
        .to(
          textRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out'
          },
          '-=0.8'
        )
        .to(
          btnRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out'
          },
          '-=0.8'
        )

      // Magnetic button effect
      const btn = btnRef.current
      if (btn) {
        const hoverTl = gsap.timeline({ paused: true })
        hoverTl.to(btn.querySelector('.icon-arrow'), {
          x: 5,
          duration: 0.3,
          ease: 'power2.out'
        })

        btn.addEventListener('mouseenter', () => hoverTl.play())
        btn.addEventListener('mouseleave', () => hoverTl.reverse())
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background noise texture - optional for premium feel without gradients */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div
          ref={pillRef}
          className="px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wide text-white/70 uppercase"
        >
          Democratizing Civic Action
        </div>

        <h1
          ref={headingRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] text-balance mb-8 text-white uppercase"
        >
          Raise
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: '2px white' }}
          >
            Your Voice.
          </span>
          <br />
          Get Heard.
        </h1>

        <p
          ref={textRef}
          className="max-w-2xl text-lg sm:text-xl text-white/60 mb-12 font-medium"
        >
          Report civic issues. Get the exact authority to complain to. Generate
          formal emails instantly. Stop waiting, start resolving.
        </p>

        <Link
          href="/report"
          ref={btnRef}
          className="group relative flex items-center gap-4 bg-accent hover:bg-accent-hover text-white px-8 py-5 text-lg font-bold uppercase tracking-wider transition-colors duration-300 inline-flex"
        >
          <span>Report an Issue</span>
          <span className="icon-arrow bg-white text-accent rounded-full p-1.5">
            <ArrowRight size={20} strokeWidth={3} />
          </span>
        </Link>
      </div>
    </section>
  )
}
