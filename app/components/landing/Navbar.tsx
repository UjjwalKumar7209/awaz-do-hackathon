'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useGSAP(
    () => {
      // Animate navbar sliding down after preloader
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 2.5 // delay to wait for preloader
        }
      )
    },
    { scope: navRef }
  )

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-white uppercase"
        >
          Awaz<span className="text-accent">Do</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest text-white uppercase">
          <a
            href="#how-it-works"
            className="hover:text-accent transition-colors"
          >
            How It Works
          </a>
          <a href="#solution" className="hover:text-accent transition-colors">
            Solution
          </a>
        </div>

        {/* Mobile Menu Icon (Visual Only) */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer group">
          <div className="w-6 h-0.5 bg-white transition-all group-hover:bg-accent"></div>
          <div className="w-6 h-0.5 bg-white transition-all group-hover:bg-accent"></div>
        </div>
      </div>
    </nav>
  )
}
