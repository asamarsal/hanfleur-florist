'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, ChevronRight, ChevronLeft, Printer, Sparkles, Gift, Heart } from 'lucide-react'

const photoboxDesigns = [
  { id: 1, file: 'example1-pb.png', name: 'Romantic Love' },
  { id: 2, file: 'example2-pb.png', name: 'Sweet Couple' },
  { id: 3, file: 'example3-pb.png', name: 'Best Friends' },
  { id: 4, file: 'example4-pb.png', name: 'Blush Flowers' },
  { id: 5, file: 'example5-pb.png', name: 'Pink Dream' },
  { id: 6, file: 'example6-pb.png', name: 'Golden Love' },
  { id: 7, file: 'example7-pb.png', name: 'Floral Magic' },
  { id: 8, file: 'example8-pb.png', name: 'Cute Pastel' },
  { id: 9, file: 'example9-pb.png', name: 'Spring Garden' },
  { id: 10, file: 'example10-pb.png', name: 'Rose Romance' },
  { id: 11, file: 'example11-pb.png', name: 'Happy Moments' },
]

const features = [
  {
    icon: Printer,
    title: 'Cetak Berkualitas',
    desc: 'Hasil cetak tajam dengan warna memukau.',
  },
  {
    icon: Sparkles,
    title: 'Desain Lucu',
    desc: 'Tema romantis dan floral yang unik & menggemaskan.',
  },
  {
    icon: Gift,
    title: 'Hadiah Spesial',
    desc: 'Sempurna untuk orang tersayang di momen spesialmu.',
  },
]

export function PhotoboxSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="photobox" className="mt-12 scroll-mt-24">
      {/* Outer Big Card */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#fff0f4] via-[#fce4ec] to-[#ffd6e4] border border-hf-rose/15 shadow-sm">

        {/* === HERO AREA (top half) === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center gap-5 px-8 pt-8 pb-8 lg:py-12 lg:pl-12 z-10 relative">
            {/* Label */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-hf-rose/70">
              <span>✦</span>
              <span>Abadikan Momen Spesial Anda</span>
              <span>✦</span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-hf-rose leading-tight">
                Photobox yang Manis, Kenangan yang Abadi
                <span className="hidden lg:inline-flex items-center ml-2 align-middle">
                  <Image
                    src="/icon/icon-love-shine.png"
                    alt="Love"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </span>
              </h2>
              <p className="mt-3 text-sm text-hf-text/70 leading-relaxed max-w-sm">
                Cetak momen terbaikmu dalam strip photobox cantik. Sempurna untuk hadiah, dekorasi, atau kenangan berharga.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/photobox"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff3a70] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#cf4067] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Buka Photobox
                <Camera className="h-4 w-4" />
              </Link>
            </div>

            {/* Micro badges */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-hf-text/60 font-medium">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3 fill-hf-rose text-hf-rose" /> Desain eksklusif
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#c9965b]" /> Cetak berkualitas tinggi
              </span>
              <span className="flex items-center gap-1">
                <Gift className="h-3 w-3 text-hf-rose" /> Siap jadi hadiah spesial
              </span>
            </div>
          </div>

          {/* Right: Hero Image (layered) */}
          <div className="relative flex items-end justify-center lg:justify-end min-h-[220px] lg:min-h-[480px] lg:-mt-0 lg:-mr-12 lg:-mb-6 lg:-translate-x-20 z-20">
            {/* Base hero image */}
            <Image
              src="/photobox/main-hero-pb.png"
              alt="Photobox Hanfleur"
              fill
              className="object-contain object-bottom lg:object-right-bottom pointer-events-none select-none drop-shadow-xl scale-[1.15] origin-bottom"
              sizes="(max-width: 1350px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* === INNER SECTION (bottom half, inside big card) === */}
        <div className="px-6 pb-8 lg:px-10 lg:pb-10 flex flex-col gap-5">

          {/* Feature Pills Card */}
          <div className="relative z-10 -mt-6 lg:-mt-12 rounded-2xl bg-white/60 backdrop-blur-sm border border-hf-rose/10 shadow-sm px-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-hf-rose/10 text-hf-rose">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-hf-rose flex items-center gap-1">
                      {f.title}
                    </p>
                    <p className="text-xs text-hf-text/60 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Picker Card */}
          <div className="relative rounded-2xl bg-white/60 backdrop-blur-sm border border-hf-rose/10 shadow-sm px-5 py-5">
            {/* Title Row & Navigation */}
            <div className="flex flex-col mb-4 pr-0 sm:pr-28">
              <div>
                <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-hf-rose flex items-center gap-2">
                  Pilih Desain Photobox Favoritmu
                  <Image
                    src="/icon/icon-love-shine.png"
                    alt="Love"
                    width={24}
                    height={24}
                    className="hidden sm:inline-block h-5 w-5 object-contain"
                  />
                </h3>
                <p className="text-xs text-hf-text/60 mt-0.5">Berbagai tema manis untuk setiap momen berharga.</p>
              </div>
              <Link
                href="/photobox"
                className="mt-2 sm:mt-0 sm:absolute sm:top-5 sm:right-5 flex items-center gap-1 text-xs font-semibold text-hf-rose hover:underline underline-offset-2 transition-all shrink-0 z-10 self-start"
              >
                Lihat Semua Desain
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Carousel with left/right buttons absolute over its edges */}
            <div className="relative px-2">
              {/* Left Arrow Button */}
              <button
                onClick={() => scroll('left')}
                className="absolute -left-2 sm:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#db3563]/30 bg-white/30 backdrop-blur-md shadow-sm text-[#db3563] transition-transform active:scale-90 z-30"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>

              {/* Design Cards Scroll Row */}
              <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto pb-1 px-1 scrollbar-none snap-x snap-mandatory"
              >
                {photoboxDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="group flex flex-col gap-2 shrink-0 snap-start cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-hf-rose/15 bg-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 w-[120px] sm:w-[140px]">
                      <img
                        src={`/photobox/photobox-example/${design.file}`}
                        alt={design.name}
                        className="w-full h-auto object-contain block"
                      />
                    </div>
                    <p className="text-center text-[11px] font-semibold text-hf-rose flex items-center justify-center gap-1">
                      {design.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => scroll('right')}
                className="absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#db3563]/30 bg-white/30 backdrop-blur-md shadow-sm text-[#db3563] transition-transform active:scale-90 z-30"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
