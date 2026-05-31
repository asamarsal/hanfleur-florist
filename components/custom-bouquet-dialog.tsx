'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Headphones,
  Check,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { links } from '@/data/links'

export function CustomBouquetDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [showConsult, setShowConsult] = useState(true)

  const [form, setForm] = useState({
    nama: '',
    lokasi: '',
    jenis: 'Bouquet Wrapping',
    momen: 'Wisuda',
    warna: 'Pink Pastel',
    catatan: '',
    budget: 'Rp150.000 - Rp250.000',
    ukuran: 'Medium (Paling Populer)',
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex max-h-[85vh] sm:max-h-[85vh] w-full flex-col overflow-hidden p-0 bg-[#fcf8f9] gap-0 border-none shadow-xl [&>button]:hidden !bottom-0 !top-auto !translate-y-0 !rounded-b-none !rounded-t-[32px] !max-w-full sm:!max-w-[480px] sm:!bottom-auto sm:!top-[50%] sm:!-translate-y-1/2 sm:!rounded-[32px]"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Custom Bouquet Form</DialogTitle>
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-4 shadow-sm rounded-t-[32px]">
          <button
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-hf-rose hover:bg-hf-rose/10 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-[#c7345e] font-serif flex items-center gap-2">
              Custom Bouquet<span className="text-xl">🌸</span>
            </h2>
            <p className="text-xs font-medium text-[#e04470]">
              Buat bouquet sesuai keinginanmu
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent">
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-32 sm:pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Progress Bar */}
          <div className="mb-6 mt-2 flex items-start justify-between px-2 relative">
            <div className="absolute top-[14px] left-[10%] right-[10%] h-[2px] bg-gray-200 border-t border-dashed border-gray-300 z-0"></div>
            {[
              { num: 1, label: 'Detail Bouquet', active: true },
              { num: 2, label: 'Tambahan', active: false },
              { num: 3, label: 'Data & Pengiriman', active: false },
              { num: 4, label: 'Konfirmasi', active: false },
            ].map((step) => (
              <div
                key={step.num}
                className="flex flex-col items-center gap-2 relative z-10 w-1/4"
              >
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    step.active
                      ? 'bg-[#db3563] text-white shadow-sm'
                      : 'bg-white text-gray-400 border border-gray-200'
                  )}
                >
                  {step.num}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium text-center leading-tight px-1',
                    step.active ? 'text-[#db3563]' : 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Consult Box */}
          <div className="mb-6 rounded-2xl border border-pink-200 bg-white overflow-hidden shadow-sm">
            <button
              onClick={() => setShowConsult(!showConsult)}
              className="flex w-full items-center justify-between bg-[#fff5f7] px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-[#db3563]">
                <Headphones className="h-5 w-5" />
                Tidak tahu mengisi apa? Konsultasi sekarang
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#db3563] shadow-sm">
                {showConsult ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </button>

            {showConsult && (
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Nama</label>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <span className="mr-2 text-pink-300">👤</span>
                    <input
                      type="text"
                      placeholder="Masukkan nama kamu"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                      value={form.nama}
                      onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Lokasi</label>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <span className="mr-2 text-pink-300">📍</span>
                    <input
                      type="text"
                      placeholder="Masukkan lokasi kamu"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                      value={form.lokasi}
                      onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                    />
                  </div>
                </div>
                <a
                  href={`https://wa.me/628152008873?text=${encodeURIComponent(
                    form.nama
                      ? `Halo saya ${form.nama}${form.lokasi ? ` dari ${form.lokasi}` : ''
                      }.\nSaya ingin memesan bunga custom.`
                      : 'Halo, saya ingin memesan bunga custom.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e34573] py-3 text-sm font-bold text-white transition-colors hover:bg-[#c7345e]"
                >
                  <Image src="/icon/icon-whatsapp-nobg.png" alt="WA" width={20} height={20} className="h-5 w-5 object-contain brightness-0 invert" />
                  Konsultasi via WhatsApp
                </a>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* 1. Jenis Bouquet */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>🌸</span> 1. Jenis Bouquet
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 pt-2 pr-2">
                {[
                  { id: 'Bouquet Wrapping', img: '/images/hanfleur-bouquet-transparent.png' },
                  { id: 'Bouquet Box', img: '/images/hanfleur-bouquet-transparent.png' },
                  { id: 'Bouquet dengan Balon', img: '/images/hanfleur-bouquet-transparent.png' },
                  { id: 'Mini Bouquet', img: '/images/hanfleur-bouquet-transparent.png' },
                  { id: 'Minta Rekomendasi', icon: '💬' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setForm({ ...form, jenis: item.id })}
                    className={cn(
                      'relative flex min-w-[80px] flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-all',
                      form.jenis === item.id
                        ? 'border-[#db3563] bg-[#fff5f7]'
                        : 'border-gray-200 bg-white hover:border-pink-200'
                    )}
                  >
                    {form.jenis === item.id && (
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                      {item.img ? (
                        <Image src={item.img} alt={item.id} width={40} height={40} className="object-contain" />
                      ) : (
                        <span className="text-2xl">{item.icon}</span>
                      )}
                    </div>
                    <span className="text-center text-[10px] font-medium leading-tight text-gray-700">
                      {item.id}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Untuk Momen Apa? */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>🎁</span> 2. Untuk Momen Apa?
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Wisuda', icon: '🎓' },
                  { id: 'Ulang Tahun', icon: '🎂' },
                  { id: 'Anniversary', icon: '💖' },
                  { id: 'Hadiah Pasangan', icon: '💕' },
                  { id: 'Hadiah Sahabat', icon: '👯' },
                  { id: 'Dekorasi', icon: '🏡' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setForm({ ...form, momen: item.id })}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border py-2.5 transition-all',
                      form.momen === item.id
                        ? 'border-[#db3563] bg-[#fff5f7] text-[#db3563] font-bold'
                        : 'border-gray-200 bg-white text-gray-700 font-medium hover:border-pink-200'
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs">{item.id}</span>
                  </button>
                ))}
                <button
                  onClick={() => setForm({ ...form, momen: 'Lainnya' })}
                  className={cn(
                    'col-span-2 flex items-center justify-center gap-2 rounded-xl border py-2.5 transition-all',
                    form.momen === 'Lainnya'
                      ? 'border-[#db3563] bg-[#fff5f7] text-[#db3563] font-bold'
                      : 'border-gray-200 bg-white text-gray-700 font-medium hover:border-pink-200'
                  )}
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  <span className="text-xs">Lainnya</span>
                </button>
              </div>
            </div>

            {/* 3. Warna Utama */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>🎨</span> 3. Warna Utama
              </h3>
              <div className="flex justify-between gap-2 overflow-x-auto py-3 px-2 -mx-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {[
                  { id: 'Pink Pastel', color: 'bg-pink-200' },
                  { id: 'Merah', color: 'bg-red-500' },
                  { id: 'Putih', color: 'bg-white border-2 border-gray-100' },
                  { id: 'Kuning', color: 'bg-yellow-400' },
                  { id: 'Ungu', color: 'bg-purple-400' },
                  { id: 'Custom', color: 'bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-400' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setForm({ ...form, warna: item.id })}
                    className="flex flex-col items-center gap-1.5 min-w-[56px]"
                  >
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                        item.color,
                        form.warna === item.id
                          ? 'ring-2 ring-[#db3563] ring-offset-2 scale-110 shadow-md'
                          : 'shadow-sm hover:scale-105'
                      )}
                    >
                      {form.warna === item.id && item.id !== 'Putih' && (
                        <Check className="h-5 w-5 text-white drop-shadow-md" />
                      )}
                      {form.warna === item.id && item.id === 'Putih' && (
                        <Check className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 text-center leading-tight">
                      {item.id}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <textarea
                  placeholder="Catatan warna atau tema (opsional)&#10;Contoh: pink pastel dengan sedikit putih, gaya elegant"
                  className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs outline-none focus:border-[#db3563] focus:ring-1 focus:ring-[#db3563] placeholder:text-gray-400 resize-none min-h-[80px]"
                  value={form.catatan}
                  onChange={(e) => setForm({ ...form, catatan: e.target.value })}
                />
              </div>
            </div>

            {/* 4. Budget */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>💰</span> 4. Budget
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '< Rp100.000',
                  'Rp100.000 -\nRp150.000',
                  'Rp150.000 -\nRp250.000',
                  'Rp250.000 -\nRp400.000',
                  '> Rp400.000',
                  'Belum tahu,\nminta rekomendasi',
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setForm({ ...form, budget: item })}
                    className={cn(
                      'relative flex items-center justify-center rounded-xl border py-3 px-2 text-center transition-all min-h-[56px]',
                      form.budget === item
                        ? 'border-[#db3563] bg-[#fff5f7] text-[#db3563] font-bold'
                        : 'border-gray-200 bg-white text-gray-700 font-medium hover:border-pink-200'
                    )}
                  >
                    {form.budget === item && (
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <span className="text-[11px] whitespace-pre-line leading-tight">
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Ukuran Bouquet */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>📏</span> 5. Ukuran Bouquet
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: 'Mini', sub: '(Sederhana)' },
                  { label: 'Medium', sub: '(Paling Populer)' },
                  { label: 'Large', sub: '(Lebih Penuh)' },
                  { label: 'Belum Yakin', sub: '' },
                ].map((item) => {
                  const id = item.sub ? `${item.label} ${item.sub}` : item.label
                  return (
                    <button
                      key={id}
                      onClick={() => setForm({ ...form, ukuran: id })}
                      className={cn(
                        'relative flex flex-col items-center justify-center rounded-xl border py-2 px-2 text-center transition-all min-h-[56px]',
                        form.ukuran === id
                          ? 'border-[#db3563] bg-[#fff5f7]'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                      )}
                    >
                      {form.ukuran === id && (
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <span
                        className={cn(
                          'text-xs',
                          form.ukuran === id ? 'text-[#db3563] font-bold' : 'text-gray-700 font-medium'
                        )}
                      >
                        {item.label}
                      </span>
                      {item.sub && (
                        <span
                          className={cn(
                            'text-[10px]',
                            form.ukuran === id ? 'text-[#db3563]' : 'text-gray-500'
                          )}
                        >
                          {item.sub}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white px-4 pt-3 pb-8 sm:py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] sm:rounded-b-[32px] flex items-center justify-between">
          <button
            onClick={() => {
              // Proceed to Step 2
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#db3563] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#c7345e] active:scale-[0.98]"
          >
            Lanjut ke Step 2
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#db3563]">
              <ArrowRight className="h-3 w-3" />
            </div>
          </button>
          <div className="ml-4 flex flex-col items-end justify-center">
            <span className="text-[10px] font-medium text-gray-400">
              Step 1 dari 4
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
