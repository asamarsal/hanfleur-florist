import type { LucideIcon } from 'lucide-react'
import { BookOpen, Instagram, Music2, Mail, MapPin } from 'lucide-react'

export const links = {
  whatsapp: 'https://wa.me/62XXXXXXXXXXX',
  catalog: '#',
  instagram: 'https://instagram.com/hanfleurflorist.bekasi',
  tiktok: 'https://tiktok.com/@hanfleurflorist.bekasi',
  email: 'mailto:hanfleurflorist@gmail.com',
  location: '#',
}

export type SocialLink = {
  label: string
  href: string
  icon: LucideIcon
  ariaLabel: string
  external?: boolean
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Lihat Katalog Bouquet',
    href: links.catalog,
    icon: BookOpen,
    ariaLabel: 'Lihat katalog bouquet Hanfleur Florist',
  },
  {
    label: 'Instagram',
    href: links.instagram,
    icon: Instagram,
    ariaLabel: 'Buka Instagram Hanfleur Florist',
    external: true,
  },
  {
    label: 'TikTok',
    href: links.tiktok,
    icon: Music2,
    ariaLabel: 'Buka TikTok Hanfleur Florist',
    external: true,
  },
  {
    label: 'Email Kami',
    href: links.email,
    icon: Mail,
    ariaLabel: 'Kirim email ke Hanfleur Florist',
  },
  {
    label: 'Lokasi & Informasi Pemesanan',
    href: links.location,
    icon: MapPin,
    ariaLabel: 'Lihat lokasi dan informasi pemesanan',
  },
]
