import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { links } from '@/data/links'

const products = [
  {
    name: 'Pink Romance',
    price: 'Rp 499.000',
    tag: 'Best Seller',
    tagBg: 'bg-[#fbf1dc] text-[#c9965b] border-[#f5e3be]',
    desc: 'Rangkaian pink yang manis dan elegan, cocok untuk berbagai momen spesial.',
    image: '/images/hanfleur-bouquet.png',
  },
  {
    name: 'Blush Serenity',
    price: 'Rp 549.000',
    tag: 'Popular',
    tagBg: 'bg-[#fce4e8] text-hf-rose border-hf-border/50',
    desc: 'Perpaduan blush pink dan white yang lembut dan menenangkan hati.',
    image: '/images/hanfleur-bouquet-transparent.png',
  },
  {
    name: 'Sweet Love',
    price: 'Rp 559.000',
    tag: 'New Arrival',
    tagBg: 'bg-[#fef2e6] text-[#e28b27] border-[#fde2c8]',
    desc: 'Kombinasi bunga pink dan peach yang hangat, penuh cinta dan kebahagiaan.',
    image: '/images/hanfleur-bouquet.png',
  },
]

export function BestSellers() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="text-center lg:text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-hf-rose/80">
          ✦ OUR BEST SELLER ✦
        </span>
        <h2 className="mt-1 font-serif text-2xl lg:text-3xl font-bold text-hf-rose">
          Best Seller Bouquet 💖
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((p) => (
          <div
            key={p.name}
            className="group flex flex-col justify-between rounded-3xl border border-hf-border/30 bg-hf-cream/60 p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white/50 p-2 flex items-center justify-center">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {/* Product Tag */}
                <span className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.tagBg}`}>
                  {p.tag}
                </span>
              </div>

              {/* Product Info */}
              <div className="mt-4 text-left">
                <h3 className="font-serif text-lg font-bold text-hf-rose">{p.name}</h3>
                <span className="text-sm font-extrabold text-hf-gold">{p.price}</span>
                <p className="mt-2 text-xs leading-relaxed text-hf-text/80">{p.desc}</p>
              </div>
            </div>

            {/* Button */}
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-hf-border/50 bg-white/80 py-2.5 text-xs font-bold text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300 active:scale-[0.98]"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Lihat Detail
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
