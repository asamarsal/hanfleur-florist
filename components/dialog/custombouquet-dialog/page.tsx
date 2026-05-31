'use client'

import { Step1Detail } from './page/step-1'
import { Step2Tambahan } from './page/step-2'
import { Step3Pengiriman } from './page/step-3'
import { Step4Konfirmasi } from './page/step-4'

import Image from 'next/image'
import {
  ChevronLeft,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function CustomBouquetDialogPage({ step, setStep, form, setForm, setOpen, showConsult, setShowConsult }: any) {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-4 shadow-sm rounded-t-[32px]">
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1)
            else setOpen(false)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full text-hf-rose hover:bg-hf-rose/10 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-[#c7345e] font-serif flex items-center gap-2">
            Custom Bouquet<span className="text-xl">🌸</span>
          </h2>
          <p className="text-xs font-medium text-[#e04470]">
            {step === 3 ? 'Isi data & atur pengiriman dengan mudah 💖' : 'Buat bouquet sesuai keinginanmu 💖'}
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
            { num: 1, label: 'Detail Bouquet' },
            { num: 2, label: 'Tambahan' },
            { num: 3, label: 'Data & Pengiriman' },
            { num: 4, label: 'Konfirmasi' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => {
                if (s.num !== 4) setStep(s.num)
              }}
              className={cn(
                "flex flex-col items-center gap-2 relative z-10 w-1/4 transition-all outline-none",
                s.num !== 4 ? "cursor-pointer hover:opacity-80 active:scale-95" : "cursor-default"
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  step === s.num
                    ? 'bg-[#db3563] text-white shadow-sm'
                    : step > s.num
                      ? 'bg-white text-[#db3563] border border-[#db3563]'
                      : 'bg-white text-gray-400 border border-gray-200'
                )}
              >
                {s.num}
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium text-center leading-tight px-1',
                  step >= s.num ? 'text-[#db3563]' : 'text-gray-400'
                )}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Steps */}
        {step === 1 && <Step1Detail form={form} setForm={setForm} showConsult={showConsult} setShowConsult={setShowConsult} />}
        {step === 2 && <Step2Tambahan form={form} setForm={setForm} />}
        {step === 3 && <Step3Pengiriman form={form} setForm={setForm} />}
        {step === 4 && <Step4Konfirmasi form={form} setStep={setStep} />}
      </div>

      {/* Bottom Sticky Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-white px-4 pt-3 pb-8 sm:py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] sm:rounded-b-[32px] flex items-center justify-between">
        {step === 4 ? (
          <a
            href={`https://wa.me/628152008873?text=${encodeURIComponent(
              `Halo Hanfleur Florist, saya ingin memesan Custom Bouquet.\n\n*1. Ringkasan Pesanan*\nJenis: ${form.jenis}\nMomen: ${form.momen === 'Lainnya' ? form.momenLainnya : form.momen}\nWarna: ${form.warna}\nBudget: ${form.budget}\nUkuran: ${form.ukuran}\n\n*2. Tambahan*\nKartu: ${form.kartu}\nDekorasi: ${form.dekorasi.join(', ')}\nHadiah: ${form.hadiah.join(', ')}\nCatatan: ${form.catatanTambahan || '-'}\n\n*3. Data Pemesan*\nNama: ${form.namaPemesan}\nWA: ${form.waPemesan}\nPenerima: ${form.namaPenerima}\nWA Penerima: ${form.waPenerima || '-'}\n\n*4. Pengiriman*\nTanggal: ${form.tanggal}\nJam: ${form.jam}\nAlamat: ${form.alamat}\nMetode: ${form.metode}\n\nTerima kasih!`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#db3563] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#c7345e] active:scale-[0.98]"
          >
            <Image src="/icon/icon-whatsapp-nobg.png" alt="WA" width={24} height={24} className="h-5 w-5 object-contain brightness-0 invert" />
            Kirim ke WhatsApp
          </a>
        ) : (
          <button
            onClick={() => {
              if (step === 3) {
                if (!form.namaPemesan || !form.waPemesan || !form.namaPenerima || !form.alamat || !form.kecamatan || !form.tanggal || !form.jam) {
                  alert('Harap isi seluruh input yang diperlukan sebelum melanjutkan.')
                  return
                }
              }
              if (step < 4) setStep(step + 1)
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#db3563] py-3.5 text-sm font-bold text-white transition-all hover:bg-[#c7345e] active:scale-[0.98]"
          >
            Lanjut ke Step {step + 1}
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#db3563]">
              <ArrowRight className="h-3 w-3" />
            </div>
          </button>
        )}
        <div className="ml-4 flex flex-col items-end justify-center min-w-[50px]">
          <span className="text-[10px] font-medium text-gray-400">
            Step {step} dari 4
          </span>
        </div>
      </div>

    </>
  )
}
