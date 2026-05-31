'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  X, Search, Heart, Cake, Gift,
  ZoomIn, ZoomOut, RotateCcw, RotateCw
} from 'lucide-react'
import { links } from '@/data/links'

export type Product = {
  name: string
  price: string
  tag: string
  tagBg: string
  desc: string
  image: string
  images: string[]
  details: string[]
  suitableFor: { label: string; icon: 'heart' | 'cake' | 'gift' }[]
}

export function ProductModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [mainImage, setMainImage] = useState(product.images[0])
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomScale, setZoomScale] = useState(1)
  const [zoomRotate, setZoomRotate] = useState(0)

  // States for dragging/panning
  const [isDragging, setIsDragging] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const lightboxRef = useRef<HTMLDivElement>(null)

  // Listen to wheel events on the lightbox container to zoom in/out
  useEffect(() => {
    if (!isZoomOpen) return

    const container = lightboxRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const direction = e.deltaY < 0 ? 1 : -1
      // Zoom 10% per scroll step, clamp between 0.5x and 5x
      setZoomScale((prev) => Math.min(5, Math.max(0.5, prev + direction * 0.1)))
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [isZoomOpen])

  if (!product) return null

  const renderIcon = (type: string) => {
    switch (type) {
      case 'heart':
        return <Heart className="h-3.5 w-3.5" />
      case 'cake':
        return <Cake className="h-3.5 w-3.5" />
      case 'gift':
        return <Gift className="h-3.5 w-3.5" />
      default:
        return null
    }
  }

  const openZoom = () => {
    setZoomScale(1)
    setZoomRotate(0)
    setPanOffset({ x: 0, y: 0 })
    setIsZoomOpen(true)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-hf-rose/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative w-full max-w-5xl overflow-hidden rounded-[32px] bg-hf-cream shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-hf-rose/10 text-hf-rose hover:bg-hf-rose/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col lg:flex-row h-full max-h-[90vh] overflow-y-auto">
            {/* Left: Images */}
            <div className="flex-1 bg-hf-rose/5 p-6 lg:p-8">
              <div className="flex flex-col gap-4">
                {/* Main Image */}
                <div
                  className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-white/50 group"
                  onClick={openZoom}
                >
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute right-5 top-6 flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-bold text-hf-rose shadow-sm backdrop-blur-md hover:bg-white transition-colors">
                    <Search className="h-3.5 w-3.5" />
                    Lihat Lebih Besar
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(img)}
                      className={`relative aspect-square overflow-hidden rounded-xl bg-white/50 border-2 transition-all ${mainImage === img
                          ? 'border-hf-rose'
                          : 'border-transparent hover:border-hf-rose/30'
                        }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col text-left">
              <div className="inline-flex">
                <span
                  className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${product.tagBg}`}
                >
                  {product.tag}
                </span>
              </div>

              <h2 className="mt-4 font-serif text-3xl font-bold text-hf-rose">
                {product.name}
              </h2>
              <p className="mt-1 text-xl font-extrabold text-hf-rose/80">
                {product.price}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-hf-text/80">
                {product.desc}
              </p>

              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-bold text-hf-rose">
                  Detail Bouquet <span className="text-hf-gold">✦</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {product.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-hf-text/80"
                    >
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-hf-rose/50" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold text-hf-rose">Cocok untuk:</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.suitableFor.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded-full border border-hf-rose/20 bg-white/60 px-3 py-1.5 text-xs font-semibold text-hf-rose/80"
                    >
                      {renderIcon(item.icon)}
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 lg:mt-auto">
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ca5a74] to-[#b94e68] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                >
                  <Image
                    src="/icon/icon-whatsapp-nobg.png"
                    alt=""
                    width={18}
                    height={18}
                    className="h-4.5 w-4.5 object-contain"
                  />
                  Pesan via WhatsApp
                </a>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-hf-rose/20 bg-white px-6 py-3.5 text-sm font-bold text-hf-rose shadow-sm transition-all hover:bg-hf-rose/5 active:scale-[0.98]"
                >
                  <Gift className="h-4.5 w-4.5 text-hf-rose/60" />
                  Konsultasi Custom Bouquet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Lightbox */}
      {isZoomOpen && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 animate-in fade-in duration-200"
        >
          {/* Lightbox Controls */}
          <div className="absolute top-6 right-6 z-[210] flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-md">
              <button 
                onClick={() => setZoomScale(s => Math.min(5, s + 0.25))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setZoomScale(s => Math.max(0.5, s - 0.25))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <div className="h-5 w-px bg-white/30 mx-1" />
              <button 
                onClick={() => setZoomRotate(r => r - 90)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                title="Rotate Left"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setZoomRotate(r => r + 90)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                title="Rotate Right"
              >
                <RotateCw className="h-5 w-5" />
              </button>
            </div>
            <button 
              onClick={() => setIsZoomOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              title="Tutup"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Zoomable Image Container */}
          <div
            className="relative h-full w-full flex items-center justify-center overflow-hidden cursor-zoom-out p-8"
            onClick={() => setIsZoomOpen(false)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className={`relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale}) rotate(${zoomRotate}deg)`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              onMouseDown={handleMouseDown}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={mainImage}
                alt={product.name}
                width={1200}
                height={1200}
                className="object-contain max-h-[85vh] w-auto drop-shadow-2xl pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
