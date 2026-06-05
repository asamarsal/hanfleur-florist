import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { SocialLink } from '@/data/links'
import dynamic from 'next/dynamic'

const PdfModal = dynamic(
  () => import('@/components/pdf-modal').then((mod) => mod.PdfModal),
  { ssr: false }
)

export function SocialLinkButton({
  link,
  className = '',
}: {
  link: SocialLink
  className?: string
}) {
  const isPdf = link.href.endsWith('.pdf')

  const innerContent = (
    <>
      <span className="flex items-center gap-3">
        <Image
          src={link.icon}
          alt=""
          width={44}
          height={44}
          className="h-10 w-10 shrink-0 object-contain"
        />
        {link.label}
      </span>
      <ArrowUpRight className="h-5 w-5 shrink-0 text-hf-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  )

  const classNameString = `group js-link-button flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-hf-border bg-hf-cream/90 px-4 py-2 text-left font-semibold text-hf-rose shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hf-rose ${className}`

  if (isPdf) {
    return (
      <PdfModal file={link.href}>
        <button
          aria-label={link.ariaLabel}
          className={classNameString}
        >
          {innerContent}
        </button>
      </PdfModal>
    )
  }

  return (
    <a
      href={link.href}
      aria-label={link.ariaLabel}
      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={classNameString}
    >
      {innerContent}
    </a>
  )
}
