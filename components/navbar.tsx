'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Menu, X, Volume2, VolumeX } from 'lucide-react'
import { links } from '@/data/links'

const navItems = [
  { label: 'Beranda', href: '#' },
  { label: 'Katalog', href: '#katalog' },
  { label: 'Custom Bouquet', href: '#custom-bouquet' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Tentang Kami', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeItem, setActiveItem] = useState('Beranda')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.5

    let isAttemptingPlay = false

    const playOnInteract = () => {
      if (!audio.paused || isAttemptingPlay) return

      isAttemptingPlay = true
      const promise = audio.play()

      if (promise !== undefined) {
        promise.then(() => {
          isAttemptingPlay = false
          window.removeEventListener('click', playOnInteract)
          window.removeEventListener('touchstart', playOnInteract)
          window.removeEventListener('scroll', playOnInteract)
          window.removeEventListener('mousemove', playOnInteract)
        }).catch((e) => {
          isAttemptingPlay = false
        })
      } else {
        isAttemptingPlay = false
      }
    }

    // Attempt native play
    const initialPromise = audio.play()
    if (initialPromise !== undefined) {
      initialPromise.catch(() => {
        window.addEventListener('click', playOnInteract, { passive: true })
        window.addEventListener('touchstart', playOnInteract, { passive: true })
        window.addEventListener('scroll', playOnInteract, { passive: true })
        window.addEventListener('mousemove', playOnInteract, { passive: true })
      })
    }

    return () => {
      window.removeEventListener('click', playOnInteract)
      window.removeEventListener('touchstart', playOnInteract)
      window.removeEventListener('scroll', playOnInteract)
      window.removeEventListener('mousemove', playOnInteract)
    }
  }, [])

  // Intersection Observer to update active item on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id === 'katalog') setActiveItem('Katalog')
          else if (id === 'custom-bouquet') setActiveItem('Custom Bouquet')
          else if (id === 'testimonials') setActiveItem('Testimoni')
          else if (id === 'about') setActiveItem('Tentang Kami')
          else if (id === 'faq') setActiveItem('FAQ')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const targets = [
      document.getElementById('katalog'),
      document.getElementById('custom-bouquet'),
      document.getElementById('testimonials'),
      document.getElementById('about'),
      document.getElementById('faq'),
    ]

    targets.forEach((target) => {
      if (target) observer.observe(target)
    })

    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveItem('Beranda')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    setActiveItem(label)
    setIsOpen(false)
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const navbarOffset = 82 // 76px navbar height + offset
        window.scrollTo({
          top: elementPosition - navbarOffset,
          behavior: 'smooth'
        })
      }
    } else if (href === '#') {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <header className="w-full border-b border-hf-border/10 bg-white/25 backdrop-blur-md fixed top-0 left-0 z-50">
        <audio
          ref={audioRef}
          src="/song/ost-song.mp3"
          loop
          playsInline
          autoPlay
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        {/* Desktop Navbar */}
        <div className="hidden lg:flex w-full items-center justify-between py-3 px-12">
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, '#', 'Beranda')} className="flex items-center">
            <Image
              src="/images/hanfleur-logo-startallign-transparent.png"
              alt="Logo Hanfleur Florist"
              width={80}
              height={20}
              className="h-auto w-[80px]"
              priority
            />
          </a>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.label)}
                className={`relative text-sm transition-all duration-200 ${activeItem === item.label
                  ? 'font-bold text-hf-rose'
                  : 'font-semibold text-hf-text/80 hover:text-hf-rose'
                  }`}
              >
                {item.label}
                {activeItem === item.label && (
                  <span className="absolute bottom-[-20px] left-0 h-[3px] w-full rounded-full bg-hf-rose transition-all duration-300" />
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMusic}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 text-[#db3563] hover:bg-pink-100 transition-colors"
              title={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
            >
              {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>

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
        </div>

        {/* Mobile Navbar */}
        <div className="flex lg:hidden w-full items-center justify-between py-2 px-4 sm:px-6">
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, '#', 'Beranda')} className="flex flex-col text-left">
            <Image
              src="/images/hanfleur-logo-startallign-transparent.png"
              alt="Logo Hanfleur Florist"
              width={110}
              height={30}
              className="h-auto w-[70px]"
              priority
            />
          </a>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMusic}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-[#db3563] hover:bg-pink-100 transition-colors"
              aria-label={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
            >
              {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

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
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-hf-border/5 bg-white/95 backdrop-blur-md ${isOpen ? 'max-h-[350px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
        >
          <nav className="flex flex-col gap-3.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.label)}
                className={`text-sm transition-colors duration-200 ${activeItem === item.label
                  ? 'font-bold text-hf-rose'
                  : 'font-semibold text-hf-text/80 hover:text-hf-rose'
                  }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#ff3a70] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#cf4067] transition-all duration-300 mt-1"
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
    </>
  )
}
