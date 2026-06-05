export const links = {
  whatsapp: 'https://api.whatsapp.com/send/?phone=628152008873&text=Halo.%0ASaya+ingin+memesan+bunga+custom',
  catalog: '/catalogue/KATALOG-HANFLEUR-FLORIST-JUNI.pdf',
  instagram: 'https://instagram.com/hanfleurflorist.bekasi',
  tiktok: 'https://tiktok.com/@hanfleurflorist.bekasi',
  email: 'mailto:hanfleurflorist@gmail.com',
  location: '#',
}

export type SocialLink = {
  label: string
  href: string
  icon: string
  ariaLabel: string
  external?: boolean
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Lihat Katalog Bouquet',
    href: '/catalogue/KATALOG-HANFLEUR-FLORIST-JUNI.pdf',
    icon: '/icon/icon-catalogue.png',
    ariaLabel: 'Lihat katalog bouquet Hanfleur Florist',
  },
  {
    label: 'Instagram',
    href: links.instagram,
    icon: '/icon/icon-instagram.png',
    ariaLabel: 'Buka Instagram Hanfleur Florist',
    external: true,
  },
  {
    label: 'TikTok',
    href: links.tiktok,
    icon: '/icon/icon-tiktok.png',
    ariaLabel: 'Buka TikTok Hanfleur Florist',
    external: true,
  },
  {
    label: 'Email Kami',
    href: links.email,
    icon: '/icon/icon-email.png',
    ariaLabel: 'Kirim email ke Hanfleur Florist',
  },
  {
    label: 'Lokasi & Informasi Pemesanan',
    href: links.location,
    icon: '/icon/icon-maps.png',
    ariaLabel: 'Lihat lokasi dan informasi pemesanan',
  },
]
