'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const btn = btnRef.current
      if (!btn) return

      const hoverTl = gsap.timeline({ paused: true })

      hoverTl
        .to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        })
        .to(
          btn.querySelector('.icon-container'),
          {
            rotate: 45,
            backgroundColor: '#ffffff',
            color: '#000000',
            duration: 0.3
          },
          0
        )

      btn.addEventListener('mouseenter', () => hoverTl.play())
      btn.addEventListener('mouseleave', () => hoverTl.reverse())

      return () => {
        btn.removeEventListener('mouseenter', () => hoverTl.play())
        btn.removeEventListener('mouseleave', () => hoverTl.reverse())
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 px-4 bg-background border-t border-white/10 flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-12">
        Ready to make <br /> a difference?
      </h2>

      <Link
        href="/report"
        ref={btnRef}
        className="group flex items-center gap-6 bg-white text-black px-8 py-6 md:px-12 md:py-8 text-2xl md:text-4xl font-black uppercase tracking-tighter"
      >
        <span>Report Now</span>
        <span className="icon-container flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-black text-white rounded-full transition-colors">
          <ArrowUpRight size={32} strokeWidth={3} />
        </span>
      </Link>

      <p className="mt-12 text-white/40 uppercase tracking-widest text-sm font-medium">
        Powered by Awaz Do
      </p>
    </section>
  )
}
