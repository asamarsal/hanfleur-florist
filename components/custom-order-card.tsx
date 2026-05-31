import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { links } from '@/data/links'
import { CustomBouquetDialog } from '@/components/custom-bouquet-dialog'

export function CustomOrderCard() {
  return (
    <div className="js-reveal-card rounded-3xl border border-hf-accent/30 bg-gradient-to-br from-hf-cream/95 to-hf-secondary/60 p-5 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left Side (Image & Text Content) */}
        <div className="flex items-start gap-4 flex-1">
          {/* Mini Bouquet Image - Desktop only to keep mobile layout completely unchanged */}
          <div className="hidden lg:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-hf-rose/10 p-1 border border-hf-accent/20">
            <Image
              src="/images/hanfleur-bouquet-transparent.png"
              alt="Custom Bouquet"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[14px] font-bold uppercase tracking-[0.16em] text-hf-rose">
              <Image
                src="/icon/icon-sparkle-nobg.png"
                alt=""
                width={14}
                height={14}
                className="h-5 w-5 object-contain"
              />
              Custom Bouquet
            </div>

            <h2 className="mt-2 font-serif text-xl font-bold text-hf-rose">
              Punya Request Khusus?
            </h2>

            <p className="mt-2 text-sm leading-6 text-hf-text">
              Pilih warna, tema, dan gaya bouquet yang kamu inginkan. Kami siap
              membantu membuat hadiah yang lebih personal.
            </p>
          </div>
        </div>

        {/* Right Side (Button) */}
        <div className="lg:shrink-0">
          <CustomBouquetDialog>
            <button
              aria-label="Buat custom bouquet"
              className="-mt-2 lg:mt-0 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#ff3a70] px-4 py-3 text-sm font-bold text-hf-cream transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#cf4067] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hf-rose"
            >
              Custom Bouquet Sekarang
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </CustomBouquetDialog>
        </div>

      </div>
    </div>
  )
}
