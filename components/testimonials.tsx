'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Anisa Putri',
    rating: 5,
    comment: 'Bouquetnya cantik banget! Mirip asli dan tahan lama. Packaging juga super premium, suka sekali!',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Riska Amalia',
    rating: 5,
    comment: 'Pengirimannya cepat dan aman. Buket bunganya wangi dan sangat rapi pembuatannya. Bakal order lagi!',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Dian Prasetyo',
    rating: 5,
    comment: 'Pelayanan sangat ramah, bisa custom warna sesuai keinginan saya. Hasil akhirnya memuaskan sekali!',
    avatar: '/placeholder-user.jpg',
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const t = testimonials[index]

  return (
    <div id="testimonials" className="flex flex-col gap-6 h-full">
      {/* Title */}
      <div className="text-center lg:text-left">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-hf-rose/80">
          ✦ APA KATA MEREKA ✦
        </span>
        <h2 className="mt-1 font-serif text-2xl lg:text-3xl font-bold text-hf-rose flex items-center justify-center lg:justify-start gap-2">
          Testimoni Pelanggan
          <Image
            src="/icon/icon-love-shine.png"
            alt="Love Shine"
            width={32}
            height={32}
            className="h-7 w-7 lg:h-8 lg:w-8 object-contain"
          />
        </h2>
      </div>

      {/* Card */}
      <div className="flex flex-col justify-between flex-1 rounded-3xl border border-hf-border/30 bg-hf-cream/60 p-6 shadow-sm">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Avatar and Info */}
          <div className="flex flex-col lg:flex-row items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border border-hf-border/50 bg-white">
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-hf-rose">{t.name}</h3>
              {/* Stars */}
              <div className="flex items-center gap-0.5 mt-0.5 justify-center lg:justify-start">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#c9965b] text-[#c9965b]" />
                ))}
              </div>
            </div>
          </div>

          {/* Comment */}
          <p className="mt-5 text-sm leading-relaxed text-hf-text italic">
            &ldquo;{t.comment}&rdquo;
          </p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-hf-border/20 pt-4">
          <button
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hf-border/50 bg-white text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-4 bg-hf-rose' : 'w-1.5 bg-hf-rose/25'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-hf-border/50 bg-white text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
