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

export function Step3Pengiriman({ form, setForm }: any) {
  return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              {/* 1. Data Pemesan */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>🧑‍💼</span> 1. Data Pemesan
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <User className="mr-2 h-4 w-4 text-pink-400" />
                    <input type="text" placeholder="Nama Pemesan" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.namaPemesan} onChange={(e) => setForm({ ...form, namaPemesan: e.target.value })} />
                  </div>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <MessageCircle className="mr-2 h-4 w-4 text-pink-400" />
                    <input type="text" placeholder="No. WhatsApp" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.waPemesan} onChange={(e) => setForm({ ...form, waPemesan: e.target.value })} />
                  </div>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose sm:col-span-2">
                    <User className="mr-2 h-4 w-4 text-pink-400" />
                    <input type="text" placeholder="Nama Penerima" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.namaPenerima} onChange={(e) => setForm({ ...form, namaPenerima: e.target.value })} />
                  </div>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose sm:col-span-2">
                    <MessageCircle className="mr-2 h-4 w-4 text-pink-400" />
                    <input type="text" placeholder="No. WhatsApp Penerima (opsional)" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.waPenerima} onChange={(e) => setForm({ ...form, waPenerima: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* 2. Alamat Pengiriman */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>📍</span> 2. Alamat Pengiriman
                </h3>
                <div className="space-y-3">
                  <div className="flex rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <Home className="mr-2 h-4 w-4 text-pink-400 mt-0.5 shrink-0" />
                    <textarea placeholder="Alamat Lengkap" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400 resize-none min-h-[60px]" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                      <Building className="mr-2 h-4 w-4 text-pink-400" />
                      <input type="text" placeholder="Kecamatan / Kota" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.kecamatan} onChange={(e) => setForm({ ...form, kecamatan: e.target.value })} />
                    </div>
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                      <FileText className="mr-2 h-4 w-4 text-pink-400" />
                      <input type="text" placeholder="Patokan / Catatan Kurir" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.patokan} onChange={(e) => setForm({ ...form, patokan: e.target.value })} />
                    </div>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-pink-200 bg-[#fff5f7] py-3 text-xs font-bold text-[#db3563] transition-colors hover:bg-pink-50">
                    <MapPin className="h-4 w-4" />
                    Pin Lokasi Google Maps
                  </button>
                </div>
              </div>

              {/* 3. Jadwal Pengiriman */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>📅</span> 3. Jadwal Pengiriman
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <Calendar className="mr-2 h-4 w-4 text-pink-400 shrink-0" />
                    <input type="text" placeholder="Tanggal Pengiriman" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
                    <ChevronRight className="ml-2 h-4 w-4 text-gray-400 shrink-0" />
                  </div>
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                    <Clock className="mr-2 h-4 w-4 text-pink-400 shrink-0" />
                    <input type="text" placeholder="Jam Pengiriman" className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400" value={form.jam} onChange={(e) => setForm({ ...form, jam: e.target.value })} />
                    <ChevronRight className="ml-2 h-4 w-4 text-gray-400 shrink-0" />
                  </div>
                  {[
                    { id: 'Diantar Kurir', icon: '🛵' },
                    { id: 'Ambil Sendiri', icon: '🏪' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setForm({ ...form, metode: item.id })}
                      className={cn(
                        'relative flex items-center justify-center gap-2 rounded-xl border py-3 px-2 text-center transition-all',
                        form.metode === item.id
                          ? 'border-[#db3563] bg-[#fff5f7]'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                      )}
                    >
                      {form.metode === item.id && (
                        <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db3563] text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                      <span className="text-xl">{item.icon}</span>
                      <span className={cn("text-xs", form.metode === item.id ? "text-[#db3563] font-bold" : "text-gray-700 font-medium")}>
                        {item.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Ucapan & Catatan */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>✉️</span> 4. Ucapan & Catatan
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="flex rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                      <Mail className="mr-2 h-4 w-4 text-pink-400 mt-0.5 shrink-0" />
                      <textarea
                        placeholder="Pesan untuk kartu ucapan (opsional)"
                        className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400 resize-none min-h-[60px]"
                        maxLength={150}
                        value={form.ucapan}
                        onChange={(e) => setForm({ ...form, ucapan: e.target.value })}
                      />
                    </div>
                    <div className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                      {form.ucapan.length}/150
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex rounded-xl border border-gray-200 bg-white px-3 py-2.5 focus-within:border-hf-rose focus-within:ring-1 focus-within:ring-hf-rose">
                      <Clipboard className="mr-2 h-4 w-4 text-pink-400 mt-0.5 shrink-0" />
                      <textarea
                        placeholder="Catatan tambahan untuk florist"
                        className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400 resize-none min-h-[60px]"
                        maxLength={150}
                        value={form.catatanTambahan}
                        onChange={(e) => setForm({ ...form, catatanTambahan: e.target.value })}
                      />
                    </div>
                    <div className="absolute bottom-2 right-3 text-[10px] text-gray-400">
                      {form.catatanTambahan.length}/150
                    </div>
                  </div>
                </div>
              </div>

              {/* Ringkasan Pilihan */}
              <div className="rounded-xl bg-[#fff5f7] border border-pink-100 p-4">
                <h4 className="text-xs font-bold text-[#db3563] mb-3">Ringkasan Pilihan</h4>
                <div className="flex items-center justify-between gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1">
                  {[
                    { icon: '/images/hanfleur-bouquet-transparent.png', label: form.jenis },
                    { icon: '🎓', label: form.momen === 'Lainnya' ? form.momenLainnya : form.momen },
                    { icon: 'color', label: form.warna },
                    { icon: '💰', label: form.budget },
                    { icon: '🌸', label: form.ukuran },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 min-w-[60px] text-center border-r border-pink-100 last:border-0 px-1">
                      {item.icon === 'color' ? (
                        <div className={cn("h-6 w-6 rounded-full border border-gray-200 shrink-0", form.warna === 'Pink Pastel' ? 'bg-pink-200' : form.warna === 'Merah' ? 'bg-red-500' : form.warna === 'Kuning' ? 'bg-yellow-400' : form.warna === 'Ungu' ? 'bg-purple-400' : form.warna === 'Putih' ? 'bg-white' : 'bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-400')}></div>
                      ) : item.icon.startsWith('/') ? (
                        <Image src={item.icon} alt="" width={24} height={24} className="h-6 w-6 object-contain shrink-0" />
                      ) : (
                        <span className="text-lg shrink-0">{item.icon}</span>
                      )}
                      <span className="text-[8px] font-bold text-gray-700 whitespace-pre-line leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  )
}
