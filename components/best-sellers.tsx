'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductModal, type Product } from './product-modal'

const products: Product[] = [
  {
    name: 'Pink Romance',
    price: 'Rp 150.000',
    tag: 'Best Seller',
    tagBg: 'bg-[#fbf1dc] text-[#c9965b] border-[#f5e3be]',
    desc: 'Rangkaian pink yang manis dan elegan, cocok untuk berbagai momen spesial. Memberikan kesan romantis dan berkesan untuk orang tersayang.',
    image: '/gallery/flower-1.png',
    images: ['/gallery/flower-1.png', '/gallery/flower-2.png', '/gallery/flower-3.png', '/gallery/flower-4.png', '/gallery/flower-5.png'],
    details: [
      'Artificial flower premium',
      'Gold heart balloon',
      'Bisa request kartu ucapan',
    ],
    suitableFor: [
      { label: 'Anniversary', icon: 'heart' },
      { label: 'Ulang Tahun', icon: 'cake' },
      { label: 'Hadiah Pasangan', icon: 'gift' },
    ],
  },
  {
    name: 'Blush Serenity',
    price: 'Rp 150.000',
    tag: 'Popular',
    tagBg: 'bg-[#fce4e8] text-hf-rose border-hf-border/50',
    desc: 'Perpaduan blush pink dan white yang lembut dan menenangkan hati.',
    image: '/gallery/flower-2.png',
    images: ['/gallery/flower-2.png', '/gallery/flower-3.png', '/gallery/flower-4.png', '/gallery/flower-5.png', '/gallery/flower-1.png'],
    details: [
      'Artificial flower premium',
      'Classic blush arrangement',
      'Premium wrapping paper',
    ],
    suitableFor: [
      { label: 'Wisuda', icon: 'gift' },
      { label: 'Ulang Tahun', icon: 'cake' },
      { label: 'Hari Ibu', icon: 'heart' },
    ],
  },
  {
    name: 'Sweet Love',
    price: 'Rp 150.000',
    tag: 'New Arrival',
    tagBg: 'bg-[#fef2e6] text-[#e28b27] border-[#fde2c8]',
    desc: 'Kombinasi bunga pink dan peach yang hangat, penuh cinta dan kebahagiaan.',
    image: '/gallery/flower-3.png',
    images: ['/gallery/flower-3.png', '/gallery/flower-4.png', '/gallery/flower-5.png', '/gallery/flower-1.png', '/gallery/flower-2.png'],
    details: [
      'Peach & Pink Rose mix',
      'Minimalist packaging',
      'Long-lasting quality',
    ],
    suitableFor: [
      { label: 'Anniversary', icon: 'heart' },
      { label: 'Valentine', icon: 'heart' },
      { label: 'Kejutan', icon: 'gift' },
    ],
  },
  {
    name: 'Rose Elegance',
    price: 'Rp 150.000',
    tag: 'Premium',
    tagBg: 'bg-[#eef2ff] text-[#4f46e5] border-[#c7d2fe]',
    desc: 'Buket mawar eksklusif yang memancarkan keanggunan untuk orang tersayang.',
    image: '/gallery/flower-4.png',
    images: ['/gallery/flower-4.png', '/gallery/flower-5.png', '/gallery/flower-1.png', '/gallery/flower-2.png', '/gallery/flower-3.png'],
    details: [
      'Red Rose premium grade',
      'Elegant black wrapping',
      'Gold ribbon tie',
    ],
    suitableFor: [
      { label: 'Anniversary', icon: 'heart' },
      { label: 'Lamaran', icon: 'heart' },
      { label: 'Hadiah Spesial', icon: 'gift' },
    ],
  },
  {
    name: 'Sunshine Bloom',
    price: 'Rp 150.000',
    tag: 'Promo',
    tagBg: 'bg-[#ecfdf5] text-[#059669] border-[#a7f3d0]',
    desc: 'Rangkaian bunga bernuansa cerah yang membawa keceriaan sepanjang hari.',
    image: '/gallery/flower-5.png',
    images: ['/gallery/flower-5.png', '/gallery/flower-1.png', '/gallery/flower-2.png', '/gallery/flower-3.png', '/gallery/flower-4.png'],
    details: [
      'Yellow & White flower mix',
      'Fresh visual appeal',
      'Rustic paper wrapping',
    ],
    suitableFor: [
      { label: 'Graduation', icon: 'cake' },
      { label: 'Get Well Soon', icon: 'heart' },
      { label: 'Pertemanan', icon: 'gift' },
    ],
  },
  {
    name: 'Violet Dream',
    price: 'Rp 150.000',
    tag: 'Favorite',
    tagBg: 'bg-[#f3e8ff] text-[#9333ea] border-[#d8b4fe]',
    desc: 'Kombinasi warna ungu dan biru yang memberikan kesan mewah dan menenangkan.',
    image: '/gallery/flower-6.png',
    images: ['/gallery/flower-6.png', '/gallery/flower-7.png', '/gallery/flower-1.png', '/gallery/flower-2.png', '/gallery/flower-3.png'],
    details: [
      'Purple & Blue theme',
      'Exclusive satin ribbon',
      'Premium wrapping',
    ],
    suitableFor: [
      { label: 'Ulang Tahun', icon: 'cake' },
      { label: 'Anniversary', icon: 'heart' },
      { label: 'Kelulusan', icon: 'gift' },
    ],
  },
  {
    name: 'Classic White',
    price: 'Rp 150.000',
    tag: 'Elegant',
    tagBg: 'bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]',
    desc: 'Kesederhanaan yang indah dalam balutan putih murni, melambangkan ketulusan.',
    image: '/gallery/flower-7.png',
    images: ['/gallery/flower-7.png', '/gallery/flower-1.png', '/gallery/flower-2.png', '/gallery/flower-3.png', '/gallery/flower-4.png'],
    details: [
      'Pure White roses',
      'Minimalist design',
      'Eco-friendly wrapper',
    ],
    suitableFor: [
      { label: 'Pernikahan', icon: 'heart' },
      { label: 'Simpati', icon: 'heart' },
      { label: 'Terima Kasih', icon: 'gift' },
    ],
  },
]

export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
    }
  }

  return (
    <div id="katalog" className="flex flex-col gap-6 w-full scroll-mt-24">
      {/* Title & Controls */}
      <div className="flex items-end justify-between">
        <div className="text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-hf-rose/80">
            ✦ OUR BEST SELLER ✦
          </span>
          <h2 className="mt-1 font-serif text-2xl lg:text-3xl font-bold text-hf-rose">
            Best Seller Bouquet 💖
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hf-border/50 bg-white text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300 active:scale-95"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hf-border/50 bg-white text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300 active:scale-95"
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slider Window */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto md:overflow-x-hidden scroll-smooth snap-x snap-mandatory -mx-3 pb-2 no-scrollbar"
        >
          {products.map((p) => (
            <div
              key={p.name}
              className="w-full md:w-1/3 shrink-0 snap-start px-3"
            >
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-hf-border/30 bg-hf-cream/60 p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
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
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-hf-border/50 bg-white/80 py-2.5 text-xs font-bold text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300 active:scale-[0.98]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
