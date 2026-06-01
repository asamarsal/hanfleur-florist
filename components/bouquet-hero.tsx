import Image from 'next/image'
import { Sparkle } from '@/components/sparkle'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface BouquetHeroProps {
  activeIndex?: number
  nextSlide?: () => void
  prevSlide?: () => void
}

export function BouquetHero({ activeIndex = 0, nextSlide, prevSlide }: BouquetHeroProps) {
  const covers = ['/cover/cover-1.png', '/cover/cover-2.png', '/cover/cover-3.png']
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEndAction = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && nextSlide) {
      nextSlide()
    }
    if (isRightSwipe && prevSlide) {
      prevSlide()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="js-logo">
        <Image
          src="/images/hanfleur-logo-transparent.png"
          alt="Logo Hanfleur Florist"
          width={320}
          height={320}
          className="h-auto w-full max-w-[180px] sm:max-w-[220px]"
          priority
        />
      </div>

      <div className="js-bouquet-wrapper relative mx-auto w-full max-w-[420px]">
        <div className="absolute -inset-2 rounded-[36px] bg-hf-accent/20 blur-2xl" />

        {/* Sparkles around the bouquet */}
        <Sparkle className="absolute -left-1 top-8 z-20" size={20} />
        <Sparkle className="absolute -right-1 top-16 z-20" size={14} />
        <Sparkle className="absolute left-4 bottom-10 z-20" size={16} />
        <Sparkle className="absolute right-3 bottom-20 z-20" size={22} />
        <Sparkle className="absolute right-16 -top-1 z-20" size={12} />

        <div
          className="js-bouquet relative w-full max-w-[420px] group touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndAction}
        >
          <div className="w-full overflow-hidden">
            <div
              className="flex w-full transition-transform duration-800 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {covers.map((src, i) => (
                <div key={i} className="relative min-w-full flex justify-center select-none">
                  <Image
                    src={src}
                    alt={`Hanfleur cover ${i + 1}`}
                    width={420}
                    height={420}
                    className="object-contain pointer-events-none"
                    priority
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>

          {prevSlide && (
            <button
              onClick={prevSlide}
              className="absolute left-2 lg:-left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#db3563]/30 bg-white/30 backdrop-blur-md shadow-sm text-[#db3563] transition-transform active:scale-90 z-30"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          )}

          {nextSlide && (
            <button
              onClick={nextSlide}
              className="absolute right-2 lg:-right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#db3563]/30 bg-white/30 backdrop-blur-md shadow-sm text-[#db3563] transition-transform active:scale-90 z-30"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
