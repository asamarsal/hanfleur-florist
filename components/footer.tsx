import { Heart } from 'lucide-react'
import Image from 'next/image'
import { links } from '@/data/links'

export function Footer() {
  return (
    <footer className="mt-6 pt-2 flex flex-col gap-2 md:gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Left side: Logo & Description */}
        <div className="flex flex-col justify-end gap-2">
          <div className="flex items-center gap-4">
            <div className="hidden md:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-hf-rose/5 p-1 border border-hf-accent/20">
              <Image
                src="/images/hanfleur-bouquet-transparent.png"
                alt="Hanfleur Bouquet"
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
            <Image
              src="/images/hanfleur-logo-startallign-transparent.png"
              alt="Logo Hanfleur Florist"
              width={160}
              height={160}
              className="h-auto w-full max-w-[140px] sm:max-w-[160px]"
            />
          </div>
          <p className="text-sm text-[#c74769] leading-relaxed max-w-m">
            Hanfleur Florist adalah toko spesialis artificial flower bouquet premium. Kami menyediakan buket bunga yang cantik, elegan, dan dirangkai dengan detail penuh cinta untuk menyempurnakan setiap momen spesial Anda.
          </p>
        </div>

        {/* Right side: Payment & Socials */}
        <div className="flex flex-col justify-end gap-4 md:items-end md:text-right">
          {/* Social Links */}
          <div>
            <h3 className="text-xs font-bold text-[#c74769] mb-3 uppercase tracking-[0.2em]">Temukan Kami</h3>
            <div className="flex items-center md:justify-end gap-3">
              <a href={links.instagram} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center bg-transparent hover:-translate-y-1 transition-transform">
                <Image src="/icon/icon-instagram.png" alt="Instagram" width={24} height={24} className="h-10 w-10 object-contain" />
              </a>
              <a href={links.tiktok} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center bg-transparent hover:-translate-y-1 transition-transform">
                <Image src="/icon/icon-tiktok.png" alt="TikTok" width={24} height={24} className="h-10 w-10 object-contain" />
              </a>
              <a href={links.whatsapp} className="flex h-10 w-10 items-center justify-center bg-transparent hover:-translate-y-1 transition-transform">
                <Image src="/icon/icon-whatsapp.png" alt="Whatsapp" width={24} height={24} className="h-10 w-10 object-contain" />
              </a>
              <a href={links.email} className="flex h-10 w-10 items-center justify-center bg-transparent hover:-translate-y-1 transition-transform">
                <Image src="/icon/icon-email.png" alt="Email" width={24} height={24} className="h-10 w-10 object-contain" />
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-sm text-hf-text/80 leading-relaxed">
              Mendukung berbagai metode pembayaran :<br />
              <span className="font-semibold text-hf-rose">QRIS, Bank Transfer, Cryptocurrency, & All Payments</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-hf-rose/25 mt-1 md:mt-4" />

      {/* Copyright */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-semibold text-hf-text/60">
        <p>&copy; 2026 Hanfleur Florist. All rights reserved.</p>
        <p className="hidden md:flex items-center gap-1.5">
          Made with love by Hanfleur Florist <Heart className="h-3 w-3 fill-hf-accent text-hf-accent" />
        </p>
      </div>
    </footer>
  )
}
