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

export function Step4Konfirmasi({ form, setStep }: any) {
  return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              {/* 1. Ringkasan Pesanan */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span>📋</span> 1. Ringkasan Pesanan
                  </h3>
                  <button onClick={() => setStep(1)} className="text-xs font-bold text-[#db3563] flex items-center gap-1 hover:text-[#c7345e]">
                    <Pencil className="h-3 w-3" /> Ubah
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#fcf8f9] p-2.5">
                    <Image src="/images/hanfleur-bouquet-transparent.png" alt="" width={32} height={32} className="h-8 w-8 object-contain drop-shadow-sm shrink-0" />
                    <div>
                      <p className="text-[10px] font-medium text-gray-500">Jenis Bouquet</p>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{form.jenis}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#fcf8f9] p-2.5">
                    <span className="text-2xl drop-shadow-sm shrink-0">{form.momen === 'Wisuda' ? '🎓' : form.momen === 'Ulang Tahun' ? '🎂' : '🎉'}</span>
                    <div>
                      <p className="text-[10px] font-medium text-gray-500">Momen</p>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{form.momen === 'Lainnya' ? form.momenLainnya : form.momen}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#fcf8f9] p-2.5">
                    <div className={cn("h-8 w-8 rounded-full border border-gray-200 shrink-0", form.warna === 'Pink Pastel' ? 'bg-pink-200' : form.warna === 'Merah' ? 'bg-red-500' : form.warna === 'Kuning' ? 'bg-yellow-400' : form.warna === 'Ungu' ? 'bg-purple-400' : form.warna === 'Putih' ? 'bg-white' : 'bg-gradient-to-tr from-pink-400 via-purple-400 to-yellow-400')}></div>
                    <div>
                      <p className="text-[10px] font-medium text-gray-500">Warna Utama</p>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{form.warna}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#fcf8f9] p-2.5">
                    <span className="text-2xl drop-shadow-sm shrink-0">💰</span>
                    <div>
                      <p className="text-[10px] font-medium text-gray-500">Budget</p>
                      <p className="text-[10px] font-bold text-gray-800 leading-tight">{form.budget}</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 rounded-xl border border-gray-100 bg-[#fcf8f9] p-2.5">
                    <span className="text-2xl drop-shadow-sm shrink-0">🌸</span>
                    <div>
                      <p className="text-[10px] font-medium text-gray-500">Ukuran</p>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{form.ukuran}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Tambahan */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span>🌸</span> 2. Tambahan
                  </h3>
                  <button onClick={() => setStep(2)} className="text-xs font-bold text-[#db3563] flex items-center gap-1 hover:text-[#c7345e]">
                    <Pencil className="h-3 w-3" /> Ubah
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-xl shrink-0 mt-0.5">💌</span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-800">Kartu Ucapan</p>
                      <p className="text-[10px] text-gray-500">{form.kartu !== 'Tanpa Kartu' ? 'Ya' : 'Tidak'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl shrink-0 mt-0.5">🎈</span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-800">Balon</p>
                      <p className="text-[10px] text-gray-500">{form.dekorasi.includes('Balon') ? 'Ya' : 'Tidak'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl shrink-0 mt-0.5">🧸</span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-800">Boneka / Gift</p>
                      <p className="text-[10px] text-gray-500">{form.hadiah.filter((h: string) => h !== 'Tidak Perlu').length > 0 ? 'Ya' : 'Tidak'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xl shrink-0 mt-0.5">📝</span>
                    <div>
                      <p className="text-[10px] font-bold text-gray-800">Catatan Tambahan</p>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{form.catatanTambahan || 'Tidak ada catatan'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Data Pemesan */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span>🧑‍💼</span> 3. Data Pemesan
                  </h3>
                  <button onClick={() => setStep(3)} className="text-xs font-bold text-[#db3563] flex items-center gap-1 hover:text-[#c7345e]">
                    <Pencil className="h-3 w-3" /> Ubah
                  </button>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr>
                        <td className="py-1.5 text-gray-600 w-24">Nama</td>
                        <td className="py-1.5 px-2 text-gray-400 w-2">:</td>
                        <td className="py-1.5 font-medium text-gray-800">{form.namaPemesan || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-600">No. WhatsApp</td>
                        <td className="py-1.5 px-2 text-gray-400">:</td>
                        <td className="py-1.5 font-medium text-gray-800">{form.waPemesan || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-600">Nama Penerima</td>
                        <td className="py-1.5 px-2 text-gray-400">:</td>
                        <td className="py-1.5 font-medium text-gray-800">{form.namaPenerima || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Pengiriman */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span>🚚</span> 4. Pengiriman
                  </h3>
                  <button onClick={() => setStep(3)} className="text-xs font-bold text-[#db3563] flex items-center gap-1 hover:text-[#c7345e]">
                    <Pencil className="h-3 w-3" /> Ubah
                  </button>
                </div>
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <table className="w-full text-xs">
                    <tbody>
                      <tr>
                        <td className="py-1.5 text-gray-600 flex items-center gap-1.5 w-24"><Calendar className="h-3.5 w-3.5 text-pink-400" /> Tanggal</td>
                        <td className="py-1.5 px-2 text-gray-400 w-2">:</td>
                        <td className="py-1.5 font-medium text-gray-800">{form.tanggal || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-600 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-pink-400" /> Jam</td>
                        <td className="py-1.5 px-2 text-gray-400">:</td>
                        <td className="py-1.5 font-medium text-gray-800">{form.jam || '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-600 flex items-center gap-1.5 align-top pt-2"><MapPin className="h-3.5 w-3.5 text-pink-400 mt-0.5" /> Alamat</td>
                        <td className="py-1.5 px-2 text-gray-400 align-top pt-2">:</td>
                        <td className="py-1.5 font-medium text-gray-800 leading-tight pt-2">{form.alamat ? `${form.alamat}${form.kecamatan ? `, ${form.kecamatan}` : ''}` : '-'}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-gray-600 flex items-center gap-1.5"><span className="text-sm w-3.5 flex justify-center">{form.metode === 'Ambil Sendiri' ? '🏪' : '🛵'}</span> Metode</td>
                        <td className="py-1.5 px-2 text-gray-400">:</td>
                        <td className="py-1.5 font-medium text-gray-800">{form.metode === 'Diantar Kurir' ? 'Diantar' : 'Diambil'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 5. Estimasi Total */}
              <div className="space-y-3 pb-8">
                <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span>🧮</span> 5. Estimasi Total
                </h3>
                <div className="rounded-xl border border-pink-200 bg-[#fff5f7] p-5">
                  <div className="flex justify-between text-xs text-gray-600 mb-2.5">
                    <span>Harga Bouquet</span>
                    <span className="font-bold text-gray-800">Rp200.000</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 pb-4 border-b border-pink-200 border-dashed">
                    <span>Ongkir</span>
                    <span className="font-bold text-gray-800">Rp20.000</span>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm font-bold text-[#db3563]">Total Estimasi</span>
                    <span className="text-lg font-bold text-[#db3563]">Rp220.000</span>
                  </div>
                </div>
              </div>

            </div>
  )
}
