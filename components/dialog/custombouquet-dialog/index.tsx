'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { CustomBouquetDialogPage } from './page'

export function CustomBouquetDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [showConsult, setShowConsult] = useState(true)
  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    nama: '',
    lokasi: '',
    jenis: 'Bouquet Wrapping',
    momen: 'Wisuda',
    momenLainnya: '',
    warna: 'Pink Pastel',
    catatan: '',
    budget: 'Rp150.000 - Rp250.000',
    ukuran: 'Medium (Paling Populer)',
    kartu: 'Tanpa Kartu',
    ucapan: '',
    dekorasi: ['Pita Premium', 'Lampu Fairy'] as string[],
    hadiah: ['Cokelat'] as string[],
    catatanTambahan: '',
    namaPemesan: '',
    waPemesan: '',
    namaPenerima: '',
    waPenerima: '',
    alamat: '',
    kecamatan: '',
    patokan: '',
    tanggal: '',
    jam: '',
    metode: 'Diantar Kurir',
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex max-h-[86vh] sm:max-h-[86vh] w-full flex-col overflow-hidden p-0 bg-[#fcf8f9] gap-0 border-none shadow-xl [&>button]:hidden !bottom-0 !top-auto !translate-y-0 !rounded-b-none !rounded-t-[32px] !max-w-full sm:!max-w-[480px] sm:!bottom-auto sm:!top-[50%] sm:!-translate-y-1/2 sm:!rounded-[32px]"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Custom Bouquet Form</DialogTitle>
        <CustomBouquetDialogPage step={step} setStep={setStep} form={form} setForm={setForm} setOpen={setOpen} showConsult={showConsult} setShowConsult={setShowConsult} />
      </DialogContent>
    </Dialog>
  )
}
