'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { BouquetHero } from '@/components/bouquet-hero'
import { PrimaryCta } from '@/components/primary-cta'
import { SocialLinkButton } from '@/components/social-link-button'
import { HighlightCard } from '@/components/highlight-card'
import { CustomOrderCard } from '@/components/custom-order-card'
import { socialLinks } from '@/data/links'

gsap.registerPlugin(ScrollTrigger)

export function HanfleurProfileCard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = 3

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalSlides)
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides)
    }, 8000)
    return () => clearInterval(timer)
  }, [activeIndex])

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduceMotion) return

    const ctx = gsap.context(() => {
      // Set explicit starting states (immune to Strict Mode revert ordering)
      gsap.set('.js-logo', { y: -18, opacity: 0 })
      gsap.set('.js-bouquet', { scale: 0.92, opacity: 0 })
      gsap.set('.js-badge', { y: 12, opacity: 0 })
      gsap.set('.js-hero-copy', { y: 20, opacity: 0 })
      gsap.set('.js-link-button', { y: 14, opacity: 0 })

      // Initial load timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to('.js-logo', { y: 0, opacity: 1, duration: 0.7 })
        .to('.js-bouquet', { scale: 1, opacity: 1, duration: 0.9 }, '-=0.35')
        .to('.js-badge', { y: 0, opacity: 1, duration: 0.5 }, '-=0.5')
        .to('.js-hero-copy', { y: 0, opacity: 1, duration: 0.65 }, '-=0.35')
        .to(
          '.js-link-button',
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
          '-=0.3'
        )

      // Gentle floating bouquet
      gsap.to('.js-bouquet', {
        y: -8,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })

      // Sparkle twinkle
      gsap.to('.js-sparkle', {
        scale: 1.2,
        opacity: 0.45,
        duration: 1.8,
        stagger: 0.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Reveal cards on scroll
      gsap.set('.js-reveal-card', { y: 20, opacity: 0 })
      gsap.to('.js-reveal-card', {
        scrollTrigger: {
          trigger: '.js-info-sections',
          start: 'top 90%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Hanfleur Florist link in bio"
      className="relative overflow-hidden rounded-[32px] border border-white/50 bg-white/35 pt-4 pb-4 px-4 shadow-[0_20px_60px_rgba(185,78,104,0.12)] backdrop-blur-xl sm:pt-6 sm:pb-6 sm:px-6 lg:pt-6 lg:pb-8 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-10">
        {/* Left column: logo + bouquet */}
        <div className="flex flex-col items-center">
          <BouquetHero activeIndex={activeIndex} nextSlide={nextSlide} prevSlide={prevSlide} />

          {/* Desktop Slider Dots (Under Image) */}
          <div className="hidden lg:flex items-center justify-center gap-1.5 mt-4">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 ${activeIndex === idx
                  ? 'w-4 h-1.5 bg-[#db3563] ring-[1px] ring-white shadow-sm'
                  : 'w-1.5 h-1.5 bg-[#db3563]/30 hover:bg-[#db3563]/50'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right column: content */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
            <div className="js-badge inline-flex items-center gap-2 rounded-full border border-hf-accent/40 bg-hf-cream/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-hf-rose shadow-sm -mt-2">
              Artificial Flower Bouquet
            </div>

            {/* Pesan Sekarang Button with Glassmorphism & Shine Effect */}
            <button
              onClick={() => {
                const element = document.getElementById('order-section')
                if (element) {
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY
                  const navbarOffset = 82 // 58px navbar mobile height + 14px padding offset
                  window.scrollTo({
                    top: elementPosition - navbarOffset,
                    behavior: 'smooth'
                  })
                }
              }}
              className="js-badge glass-shine-btn group relative flex lg:hidden cursor-pointer items-center justify-center gap-2 rounded-full bg-[#ff3a70] px-8 py-3 text-sm font-bold text-white shadow-[0_5px_0_#cf4067,0_10px_20px_rgba(255,58,112,0.3)] transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_0_#cf4067,0_12px_24px_rgba(255,58,112,0.4)] active:translate-y-[5px] active:shadow-[0_0px_0_#cf4067,0_5px_10px_rgba(255,58,112,0.2)] outline-none overflow-hidden"
            >
              <span className="shine-overlay" />
              <span className="relative z-10 flex items-center gap-2 tracking-wide">
                Pesan Sekarang
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </button>

            {/* Mobile Slider Dots (Under Button) */}
            <div className="flex lg:hidden items-center gap-1.5 mt-2 mb-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`rounded-full transition-all duration-300 ${activeIndex === idx
                    ? 'w-4 h-1.5 bg-[#db3563] ring-[1px] ring-white shadow-sm'
                    : 'w-1.5 h-1.5 bg-[#db3563]/30 hover:bg-[#db3563]/50'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="js-hero-copy flex flex-col gap-3 mb-6 mt-4 lg:mt-2">
              <h1 className="text-balance font-serif text-3xl font-bold leading-tight tracking-tight text-hf-rose sm:text-4xl lg:text-[2.75rem]">
                Buket Cantik untuk Momen Spesialmu
              </h1>
              <p className="text-pretty font-sans text-sm leading-6 text-hf-text sm:text-base">
                Hanfleur Florist menjual artificial flower bouquet yang
                cantik, tahan lama, dan dibuat dengan penuh detail. Cocok untuk
                hadiah ulang tahun, wisuda, anniversary, dan berbagai momen
                spesial lainnya.
              </p>
            </div>
          </div>

          <div id="order-section" className="flex flex-col gap-3 scroll-mt-6">
            <PrimaryCta />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <SocialLinkButton
                  key={link.label}
                  link={link}
                  className={link.label === 'Lokasi & Informasi Pemesanan' ? 'lg:col-span-2' : ''}
                />
              ))}
            </div>
          </div>

          <div className="js-info-sections flex flex-col gap-4">
            <HighlightCard />
          </div>
        </div>
      </div>

      {/* Custom Order Card (full width below columns on desktop) */}
      <div id="custom-bouquet" className="mt-6 lg:mt-8 scroll-mt-24">
        <CustomOrderCard />
      </div>
    </section>
  )
}
