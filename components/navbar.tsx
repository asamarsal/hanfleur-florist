import Image from 'next/image'
import { links } from '@/data/links'

export function Navbar() {
  return (
    <header className="hidden lg:block w-full border-b border-hf-border/10 bg-white/25 backdrop-blur-md sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="flex w-full items-center justify-between py-4 px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex flex-col text-left">
          <span className="font-serif text-2xl font-bold text-hf-rose leading-none tracking-tight">
            Hanfleur
          </span>
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-hf-accent mt-1">
            Florist
          </span>
        </a>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-8">
          <a
            href="#"
            className="relative text-sm font-bold text-hf-rose transition-colors duration-200"
          >
            Beranda
            <span className="absolute bottom-[-20px] left-0 h-[3px] w-full rounded-full bg-hf-rose" />
          </a>
          <a
            href="#order-section"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Katalog
          </a>
          <a
            href="#order-section"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Custom Bouquet
          </a>
          <a
            href="#testimonials"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Testimoni
          </a>
          <a
            href="#about"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Tentang Kami
          </a>
          <a
            href="#faq"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-hf-rose px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-hf-rose-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Image
            src="/icon/icon-whatsapp-nobg.png"
            alt=""
            width={18}
            height={18}
            className="h-6 w-6 object-contain"
          />
          Pesan via WhatsApp
        </a>
      </div>
    </header>
  )
}
