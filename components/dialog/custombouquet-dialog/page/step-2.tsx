import React from 'react'
import Image from 'next/image'
import {
  ChevronDown,
  ChevronUp,
  Headphones,
  Check,
  MoreHorizontal,
  Upload,
  User,
  MessageCircle,
  Home,
  Building,
  FileText,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Mail,
  Clipboard,
  Pencil,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step2Tambahan({ form, setForm }: any) {
  return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              {/* 1. Kartu Ucapan */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>🎀</span> 1. Kartu Ucapan
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Tanpa Kartu', icon: '💌' },
                    { id: 'Kartu Ucapan', icon: '💖' },
                    { id: 'Kartu Premium', icon: '👑' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setForm({ ...form, kartu: item.id })}
                      className={cn(
                        'relative flex flex-col items-center justify-center gap-2 rounded-xl border py-3 px-2 text-center transition-all',
                        form.kartu === item.id
                          ? 'border-[#db3563] bg-[#fff5f7]'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                      )}
                    >
                      {form.kartu === item.id && (
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-pink-50">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-[10px] font-medium leading-tight text-gray-700">
                        {item.id}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 relative">
                  <textarea
                    placeholder="Tulis ucapan (opsional)&#10;Contoh: Selamat wisuda, semoga sukses selalu!"
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 pb-6 text-xs outline-none focus:border-[#db3563] focus:ring-1 focus:ring-[#db3563] placeholder:text-gray-400 resize-none min-h-[80px]"
                    maxLength={150}
                    value={form.ucapan}
                    onChange={(e) => setForm({ ...form, ucapan: e.target.value })}
                  />
                  <div className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                    {form.ucapan.length}/150
                  </div>
                </div>
              </div>

              {/* 2. Tambahan Dekorasi */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>🎈</span> 2. Tambahan Dekorasi
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Balon', icon: '🎈' },
                    { id: 'Pita Premium', icon: '🎀' },
                    { id: 'Lampu Fairy', icon: '✨' },
                    { id: 'Butterfly', icon: '🦋' },
                    { id: 'Topper Nama', icon: '🎂' },
                    { id: 'Tanpa Tambahan', icon: '🚫' },
                  ].map((item) => {
                    const isSelected = form.dekorasi.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'Tanpa Tambahan') {
                            setForm({ ...form, dekorasi: ['Tanpa Tambahan'] })
                            return
                          }
                          let newDekorasi = form.dekorasi.filter((d: string) => d !== 'Tanpa Tambahan')
                          if (isSelected) {
                            newDekorasi = newDekorasi.filter((d: string) => d !== item.id)
                          } else {
                            newDekorasi.push(item.id)
                          }
                          setForm({ ...form, dekorasi: newDekorasi })
                        }}
                        className={cn(
                          'relative flex flex-col items-center justify-center gap-2 rounded-xl border py-3 px-2 text-center transition-all',
                          isSelected
                            ? 'border-[#db3563] bg-[#fff5f7]'
                            : 'border-gray-200 bg-white hover:border-pink-200'
                        )}
                      >
                        {isSelected && (
                          <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-[10px] font-medium leading-tight text-gray-700">
                          {item.id}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 3. Hadiah Tambahan */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>🎁</span> 3. Hadiah Tambahan
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {[
                    { id: 'Cokelat', icon: '🍫' },
                    { id: 'Boneka Mini', icon: '🧸' },
                    { id: 'Gift Card', icon: '💳' },
                    { id: 'Snack Mini', icon: '🍿' },
                    { id: 'Tidak Perlu', icon: '🚫' },
                  ].map((item) => {
                    const isSelected = form.hadiah.includes(item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'Tidak Perlu') {
                            setForm({ ...form, hadiah: ['Tidak Perlu'] })
                            return
                          }
                          let newHadiah = form.hadiah.filter((d: string) => d !== 'Tidak Perlu')
                          if (isSelected) {
                            newHadiah = newHadiah.filter((d: string) => d !== item.id)
                          } else {
                            newHadiah.push(item.id)
                          }
                          setForm({ ...form, hadiah: newHadiah })
                        }}
                        className={cn(
                          'relative flex flex-col items-center justify-center gap-2 rounded-xl border py-3 px-2 text-center transition-all',
                          isSelected
                            ? 'border-[#db3563] bg-[#fff5f7]'
                            : 'border-gray-200 bg-white hover:border-pink-200'
                        )}
                      >
                        {isSelected && (
                          <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                            <Check className="h-3 w-3" />
                          </div>
                        )}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <span className="text-[10px] font-medium leading-tight text-gray-700">
                          {item.id}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4. Upload Referensi */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>🖼️</span> 4. Upload Referensi
                </h3>
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-pink-300 bg-[#fff5f7] py-6 text-center cursor-pointer hover:bg-pink-50 transition-colors">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-200 text-[#db3563]">
                    <Upload className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-gray-700">Upload foto inspirasi bouquet (opsional)</p>
                  <p className="text-[10px] text-gray-500">Format: JPG, PNG (Maks. 5MB)</p>
                </div>
              </div>

              {/* 5. Catatan Tambahan */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>✍️</span> 5. Catatan Tambahan
                </h3>
                <div className="relative mt-2">
                  <textarea
                    placeholder="Contoh: tolong nuansanya manis, elegan, dan ada sentuhan pink pastel"
                    className="w-full rounded-xl border border-gray-200 bg-white p-3 pb-6 text-xs outline-none focus:border-[#db3563] focus:ring-1 focus:ring-[#db3563] placeholder:text-gray-400 resize-none min-h-[80px]"
                    maxLength={200}
                    value={form.catatanTambahan}
                    onChange={(e) => setForm({ ...form, catatanTambahan: e.target.value })}
                  />
                  <div className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                    {form.catatanTambahan.length}/200
                  </div>
                </div>
              </div>
            </div>
  )
}
