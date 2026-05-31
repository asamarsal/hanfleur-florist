'use client'

import Image from 'next/image'

const runningTextItems = [
  { text: "Premium Artificial Flower Bouquet", icon: "/runningtext/icon-flower-rt.png" },
  { text: "Custom Design Available", icon: "/runningtext/icon-glitter-rt.png" },
  { text: "Handmade with Love & Care", icon: "/runningtext/icon-heart-rt.png" },
  { text: "Bisa Request Kartu Ucapan", icon: "/runningtext/icon-ribbon-rt.png" },
  { text: "Pengiriman ke Seluruh Indonesia", icon: "/runningtext/icon-butterfly-rt.png" },
]

// Double the items to ensure it fills widescreen monitors for seamless marquee loop
const marqueeItems = [...runningTextItems, ...runningTextItems]

export function RunningText() {
  return (
    <section className="hidden lg:flex w-full bg-[#cf4067] py-2 overflow-hidden select-none border-b border-hf-border/10 mt-2">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 80s linear infinite;
        }
      `}</style>

      {/* Track 1 */}
      <div className="flex shrink-0 gap-16 pr-8 items-center animate-marquee">
        {marqueeItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-white uppercase tracking-[0.15em]">
            <Image
              src={item.icon}
              alt=""
              width={18}
              height={18}
              className="h-5 w-5"
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Track 2 (Duplicate for Seamless Infinite Scrolling) */}
      <div className="flex shrink-0 gap-16 pr-16 items-center animate-marquee" aria-hidden="true">
        {marqueeItems.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center gap-2.5 text-[11px] font-bold text-white uppercase tracking-[0.15em]">
            <Image
              src={item.icon}
              alt=""
              width={18}
              height={18}
              className="h-4.5 w-4.5 object-contain filter brightness-0 invert"
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
