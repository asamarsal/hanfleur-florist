'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export function GlobalPreloader() {
  const [isMounted, setIsMounted] = useState(true)
  const [progress, setProgress] = useState(0)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const bouquetRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    let currentProgress = 0
    const interval = setInterval(() => {
      // Simulate loading progress
      currentProgress += Math.random() * 12

      if (document.readyState === 'complete') {
        currentProgress += 15 // speed up if window is already loaded
      } else {
        if (currentProgress > 90) currentProgress = 90 // cap at 90% until loaded
      }

      if (currentProgress >= 100) {
        currentProgress = 100
        setProgress(100)
        clearInterval(interval)

        // Wait briefly at 100% then animate out
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
        }, 600)
      } else {
        setProgress(Math.floor(currentProgress))
      }
    }, 150)

    // Fallback
    const fallback = setTimeout(() => {
      if (isMounted && currentProgress < 100) {
        currentProgress = 100
      }
    }, 6000)

    return () => {
      clearInterval(interval)
      clearTimeout(fallback)
    }
  }, [isMounted])

  if (!isMounted) return null

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fcf8f9] overflow-hidden"
    >
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
          className="h-60 w-60 object-contain drop-shadow-2xl"
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

        {/* Loading Bar Section */}
        <div className="flex flex-col items-center mt-2">
          <div className="flex items-center gap-4 text-[#ff3a70]/40 mb-2">
            <svg width="40" height="16" viewBox="0 0 40 16" fill="currentColor" className="scale-x-[-1]">
              <path d="M4 8C12 2 28 14 36 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M12 6C14 4 16 5 14 7C12 9 10 8 12 6Z" />
              <path d="M20 10C22 8 24 9 22 11C20 13 18 12 20 10Z" />
              <path d="M28 6C30 4 32 5 30 7C28 9 26 8 28 6Z" />
            </svg>
            <span className="text-4xl font-serif font-bold text-[#ff3a70] w-20 text-center drop-shadow-sm">{progress}%</span>
            <svg width="40" height="16" viewBox="0 0 40 16" fill="currentColor">
              <path d="M4 8C12 2 28 14 36 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M12 6C14 4 16 5 14 7C12 9 10 8 12 6Z" />
              <path d="M20 10C22 8 24 9 22 11C20 13 18 12 20 10Z" />
              <path d="M28 6C30 4 32 5 30 7C28 9 26 8 28 6Z" />
            </svg>
          </div>

          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#ff3a70] mb-1">Preparing your special surprise...</h2>
          <p className="text-xs sm:text-sm text-[#ff3a70]/70 mb-6 font-medium tracking-wide">Beautiful gift for your special moment<span className="text-[#ff3a70]">♥</span></p>

          {/* Progress Bar */}
          <div className="relative flex items-center justify-between w-[280px] sm:w-[320px] h-8">
            <div className="absolute inset-0 flex items-center justify-between z-0">
              {Array.from({ length: 8 }).map((_, i) => {
                const segmentThreshold = (i + 1) * (100 / 8)
                const isFilled = progress >= segmentThreshold - (100 / 16)
                return (
                  <div
                    key={i}
                    className={`h-2.5 w-7 sm:w-8 rounded-full transition-all duration-300 ${isFilled ? 'bg-[#ff3a70]' : 'border-[1.5px] border-[#ff3a70]/30 bg-transparent'
                      }`}
                  />
                )
              })}
            </div>

            {/* The sliding rose icon */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ease-out"
              style={{ left: `calc(${progress}% - 14px)` }}
            >
              <div className="bg-[#fcf8f9] rounded-full p-[2px] shadow-sm">
                <Image src="/images/hanfleur-logo-transparent.png" alt="Rose" width={32} height={32} className="h-6 w-6 sm:h-7 sm:w-7 object-contain drop-shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
