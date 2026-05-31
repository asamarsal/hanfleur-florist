'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { links } from '@/data/links'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b border-hf-border/10 bg-white/25 backdrop-blur-md fixed top-0 left-0 z-50">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex w-full items-center justify-between py-4 px-12">
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
          className="flex items-center gap-2 rounded-full bg-[#ff3a70] px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#cf4067] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
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

      {/* Mobile Navbar */}
      <div className="flex lg:hidden w-full items-center justify-between py-3 px-4 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex flex-col text-left">
          <span className="font-serif text-xl font-bold text-hf-rose leading-none tracking-tight">
            Hanfleur
          </span>
          <span className="text-[9px] font-sans font-bold tracking-[0.35em] uppercase text-hf-accent mt-0.5">
            Florist
          </span>
        </a>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-2 text-hf-rose hover:text-hf-rose/80 focus:outline-none transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-hf-border/5 bg-white/95 backdrop-blur-md ${isOpen ? 'max-h-[350px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col gap-3.5">
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-hf-rose"
          >
            Beranda
          </a>
          <a
            href="#order-section"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Katalog
          </a>
          <a
            href="#order-section"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Custom Bouquet
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Testimoni
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Tentang Kami
          </a>
          <a
            href="#faq"
            onClick={() => setIsOpen(false)}
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            FAQ
          </a>
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-hf-rose px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-hf-rose-dark transition-all duration-300 mt-1"
          >
            <Image
              src="/icon/icon-whatsapp-nobg.png"
              alt=""
              width={16}
              height={16}
              className="h-5 w-5 object-contain"
            />
            Pesan via WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
