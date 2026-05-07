'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Animate mobile menu
  useGSAP(
    () => {
      if (!mobileMenuRef.current) return

      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        })
      }
    },
    { dependencies: [isMobileMenuOpen] }
  )

  const handleMobileMenuItemClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 bg-black/40 backdrop-blur-md border-b border-white/10 md:bg-transparent md:border-transparent md:py-6 ${
        isScrolled
          ? 'md:bg-black/40 md:backdrop-blur-md md:border-b md:border-white/10 md:py-4 md:shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : ''
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer group"
          aria-label="Toggle mobile menu"
        >
          <div
            className={`w-6 h-0.5 bg-white transition-all ${
              isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-all ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pt-4 pb-4 space-y-4 border-t border-white/10">
          <a
            href="#how-it-works"
            onClick={handleMobileMenuItemClick}
            className="block px-4 py-2 text-sm font-bold tracking-widest text-white uppercase hover:text-accent transition-colors"
          >
            How It Works
          </a>
          <a
            href="#solution"
            onClick={handleMobileMenuItemClick}
            className="block px-4 py-2 text-sm font-bold tracking-widest text-white uppercase hover:text-accent transition-colors"
          >
            Solution
          </a>
        </div>
      </div>
    </nav>
  )
}
