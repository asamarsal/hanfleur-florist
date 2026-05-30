import Image from 'next/image'
import { Sparkle } from '@/components/sparkle'

export function BouquetHero() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="js-logo">
        <Image
          src="/images/hanfleur-logo-transparent.png"
          alt="Logo Hanfleur Florist"
          width={420}
          height={420}
          className="h-auto w-full max-w-[220px] sm:max-w-[260px]"
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

        <div className="js-bouquet">
          <Image
            src="/images/hanfleur-bouquet-transparent.png"
            alt="Artificial flower bouquet berwarna pink dari Hanfleur Florist"
            width={720}
            height={720}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
