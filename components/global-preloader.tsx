'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export function GlobalPreloader() {
  const [isMounted, setIsMounted] = useState(true)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const bouquetRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const finishLoading = () => {
      // Tunggu setidaknya 800ms agar animasi awal terlihat premium
      setTimeout(() => {
        if (preloaderRef.current && logoRef.current && bouquetRef.current) {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsMounted(false)
              document.body.style.overflow = ''
              window.dispatchEvent(new Event('preloader-complete'))
            }
          })

          tl.to(logoRef.current, {
            scale: 1.15,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          })
            .to(preloaderRef.current, {
              yPercent: -100,
              duration: 0.8,
              ease: "expo.inOut"
            }, "-=0.3")
        } else {
          setIsMounted(false)
          document.body.style.overflow = ''
        }
      }, 800)
    }

    if (document.readyState === 'complete') {
      finishLoading()
    } else {
      window.addEventListener('load', finishLoading)
      return () => window.removeEventListener('load', finishLoading)
    }

    // Fallback
    const fallback = setTimeout(() => {
      if (isMounted) finishLoading()
    }, 6000)

    return () => clearTimeout(fallback)
  }, [isMounted])

  if (!isMounted) return null

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fcf8f9] overflow-hidden"
    >
      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-gentle-float {
          animation: gentle-float 3.5s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-[#ff3a70]/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative flex flex-col items-center gap-2">
        <Image
          ref={bouquetRef}
          src="/images/hanfleur-bouquet-transparent.png"
          alt="Hanfleur Bouquet"
          width={240}
          height={240}
          className="h-60 w-60 object-contain drop-shadow-2xl animate-gentle-float"
          priority
        />
        <Image
          ref={logoRef}
          src="/images/hanfleur-logo-transparent.png"
          alt="Hanfleur Florist"
          width={180}
          height={180}
          className="h-36 w-36 object-contain drop-shadow-md"
          priority
        />

        {/* Text Section */}
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#ff3a70] mb-4">Preparing your special surprise...</h2>
          <p className="text-xs sm:text-sm text-[#ff3a70]/70 mb-6 font-medium tracking-wide">Beautiful gift for your special moment<span className="text-[#ff3a70]">♥</span></p>
        </div>
      </div>
    </div>
  )
}
