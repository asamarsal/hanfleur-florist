import Image from 'next/image'
import { links } from '@/data/links'

export function PrimaryCta() {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Pesan via WhatsApp Hanfleur Florist"
      className="js-link-button flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-hf-rose px-5 py-2 text-base font-bold text-hf-cream shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-hf-rose-dark hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hf-rose"
    >
      <Image
        src="/icon/icon-whatsapp.png"
        alt=""
        width={40}
        height={40}
        className="h-8 w-8"
      />
      Pesan via WhatsApp
    </a>
  )
}
