'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function StoreLocation() {
  const [copied, setCopied] = useState(false)
  const storeAddress = 'Jl. Taman Wisma Asri II, RT.006/RW.028, Tlk. Pucung, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17121'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy store address: ', err)
    }
  }

  return (
    <section id="about" className="relative mt-8 sm:mt-12 rounded-[32px] border border-white/40 bg-white/50 p-6 sm:p-8 backdrop-blur-sm shadow-[0_8px_30px_rgba(185,78,104,0.06)] scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="text-left">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-hf-rose/80">
            ✦ KUNJUNGI KAMI ✦
          </span>
          <h2 className="mt-1 font-serif text-2xl lg:text-3xl font-bold text-hf-rose">
            Lokasi Toko Bouquet 📍
          </h2>
          <p className="mt-2 text-sm text-hf-text/80">
            Jl. Taman Wisma Asri II, RT.006/RW.028, Tlk. Pucung, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17121
          </p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-hf-border/30 bg-white/80 px-4 py-2.5 text-xs font-bold text-hf-rose shadow-sm hover:bg-hf-rose hover:text-white transition-all duration-300 active:scale-[0.98] w-full sm:w-auto"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              Alamat Tersalin!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Salin Alamat Toko
            </>
          )}
        </button>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-hf-border/20 shadow-inner h-[280px] sm:h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.90314958420907!2d107.02684588730337!3d-6.204165289370607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6989fdfc36d2cd%3A0xc5927f020a0beafc!2sTaman%20wisma%20asri%202!5e0!3m2!1sid!2sid!4v1780225414276!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </section>
  )
}
