'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Plus, Minus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqData = [
  {
    question: "Apakah bouquet bisa dicustom?",
    answer: "Bisa. Kamu dapat request warna, tema, ukuran, jenis wrapping, kartu ucapan, dan dekorasi tambahan sesuai kebutuhan. Ketersediaan bahan akan dikonfirmasi terlebih dahulu melalui WhatsApp."
  },
  {
    question: "Apakah Hanfleur Florist menjual bunga asli?",
    answer: "Tidak. Hanfleur Florist khusus menjual artificial flower bouquet yang cantik, tahan lama, dan cocok dijadikan hadiah untuk berbagai momen spesial."
  },
  {
    question: "Berapa harga bouquet di Hanfleur Florist?",
    answer: "Harga bouquet berbeda-beda tergantung ukuran, jenis bunga, wrapping, dan dekorasi tambahan. Kamu dapat melihat harga awal pada katalog atau menghubungi kami untuk konsultasi custom bouquet."
  },
  {
    question: "Bagaimana cara melakukan pemesanan?",
    answer: "Pilih bouquet dari katalog atau kirimkan referensi bouquet yang kamu inginkan. Setelah itu, hubungi kami melalui WhatsApp untuk konfirmasi harga, detail pesanan, dan pengiriman."
  },
  {
    question: "Berapa lama proses pembuatan bouquet?",
    answer: "Estimasi pengerjaan menyesuaikan jenis bouquet dan jumlah pesanan. Sebaiknya lakukan pemesanan beberapa hari sebelum tanggal yang dibutuhkan agar hasilnya lebih maksimal.\n\nEstimasi pengerjaan: 1–3 hari."
  },
  {
    question: "Apakah bisa memesan bouquet untuk hari yang sama?",
    answer: "Same-day order dapat tersedia untuk beberapa pilihan bouquet dan area tertentu, tergantung stok serta antrean pesanan. Silakan konfirmasi terlebih dahulu melalui WhatsApp."
  },
  {
    question: "Apakah tersedia pengiriman?",
    answer: "Ya. Kami menyediakan opsi pengiriman sesuai area tujuan. Biaya pengiriman akan disesuaikan dengan lokasi penerima dan metode pengiriman yang dipilih."
  },
  {
    question: "Apakah bisa menambahkan kartu ucapan?",
    answer: "Bisa. Kamu dapat menambahkan pesan singkat untuk penerima. Tuliskan isi kartu ucapan saat melakukan pemesanan melalui WhatsApp."
  },
  {
    question: "Apakah bisa request warna tertentu?",
    answer: "Bisa. Kami akan membantu menyesuaikan warna bouquet dengan tema hadiah atau warna favorit penerima, selama bahan yang dibutuhkan masih tersedia."
  },
  {
    question: "Bagaimana metode pembayarannya?",
    answer: "Detail pembayaran akan diberikan setelah pesanan dikonfirmasi melalui WhatsApp. Pesanan akan mulai diproses setelah pembayaran diterima.\n\nPembayaran tersedia melalui transfer bank dan e-wallet."
  },
  {
    question: "Apakah pesanan dapat dibatalkan?",
    answer: "Pesanan yang sudah masuk proses pengerjaan tidak dapat dibatalkan. Pastikan seluruh detail pesanan sudah sesuai sebelum melakukan pembayaran."
  },
  {
    question: "Apakah hasil bouquet akan sama persis dengan foto?",
    answer: "Kami akan membuat bouquet semirip mungkin dengan foto katalog atau referensi yang dipilih. Namun, detail kecil dapat menyesuaikan ketersediaan bahan tanpa mengurangi tampilan dan kualitas bouquet."
  }
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reduceMotion) return

    const cards = sectionRef.current?.querySelectorAll('.faq-card')
    if (!cards) return

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0

        // Set initial state
        gsap.set(card, {
          x: fromLeft ? -60 : 60,
          opacity: 0,
        })

        // Animating on scroll
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
          x: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative my-10 sm:my-16 rounded-[32px] bg-gradient-to-bl from-[#f46d95] to-[#f9a2bf] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(185,78,104,0.15)] border border-white/40 overflow-hidden"
    >
      <style>{`
        @keyframes float-butterfly {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float-butterfly 4s ease-in-out infinite;
        }
      `}</style>

      {/* Decorative Elements */}
      <Image
        src="/faq/flower-lefttop-faq.png"
        alt=""
        width={300}
        height={300}
        className="absolute -top-10 sm:-top-16 -left-4 sm:-left-6 w-28 sm:w-48 lg:w-72 opacity-95 rotate-[-10deg] pointer-events-none select-none"
      />
      <Image
        src="/faq/butterfly-right-faq.png"
        alt=""
        width={200}
        height={200}
        className="hidden sm:block absolute top-6 right-6 w-24 sm:w-32 lg:w-40 opacity-85 pointer-events-none select-none drop-shadow-sm animate-float"
      />
      <Image
        src="/faq/butterfly-left-faq.png"
        alt=""
        width={200}
        height={200}
        className="hidden sm:block absolute top-[48%] lg:top-[52%] left-6 sm:left-4 lg:left-8 w-24 sm:w-32 lg:w-40 opacity-95 pointer-events-none select-none drop-shadow-lg z-20 animate-float"
      />
      <Image
        src="/faq/flower-rightdown-faq.png"
        alt=""
        width={300}
        height={300}
        className="absolute -bottom-10 sm:-bottom-20 -right-8 sm:-right-12 w-28 sm:w-48 lg:w-72 opacity-100 pointer-events-none select-none drop-shadow-xl z-20"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center mb-8 sm:mb-10">
        <div className="flex items-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-4">
          <span>✦</span>
          <span>FAQ Hanfleur</span>
          <span>✦</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight">
          Pertanyaan yang<br />Sering Diajukan 💖
        </h2>
      </div>

      {/* Accordion List */}
      <div className="relative z-10 flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto backdrop-blur-sm">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className={`faq-card flex flex-col rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-white/95 border-hf-rose/20 shadow-[0_8px_30px_rgba(185,78,104,0.06)]' : 'bg-white/50 border-white/60 hover:bg-white/80'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex items-center w-full py-4 px-4 sm:py-4 sm:px-5 lg:px-6 text-left gap-4 sm:gap-5"
              >
                {/* Number Badge */}
                <Image
                  src={`/faq/number/icon-no-${index + 1}.png`}
                  alt={`Nomor ${index + 1}`}
                  width={44}
                  height={44}
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain shrink-0"
                />

                {/* Question */}
                <h3 className="flex-1 font-serif text-[15px] sm:text-[17px] font-bold text-hf-rose leading-snug">
                  {item.question}
                </h3>

                {/* Toggle Icon */}
                <div className="flex shrink-0 items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-hf-rose/15 text-hf-rose shadow-sm transition-transform duration-300">
                  {isOpen ? <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-0 pl-[4.25rem] sm:pl-[5.25rem] lg:pl-[5.5rem] pr-6 text-sm sm:text-[15px] text-hf-text/75 leading-relaxed whitespace-pre-wrap -mt-1">
                  {item.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
