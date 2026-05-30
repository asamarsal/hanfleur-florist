import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { SocialLink } from '@/data/links'

export function SocialLinkButton({ link }: { link: SocialLink }) {
  return (
    <a
      href={link.href}
      aria-label={link.ariaLabel}
      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group js-link-button flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-hf-border bg-hf-cream/90 px-4 py-4 text-left font-semibold text-hf-rose shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hf-rose"
    >
      <span className="flex items-center gap-3">
        <Image
          src={link.icon}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 object-contain"
        />
        {link.label}
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-hf-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}
