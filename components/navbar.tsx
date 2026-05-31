import { links } from '@/data/links'

export function Navbar() {
  return (
    <header className="hidden lg:block w-full border-b border-hf-border/10 bg-white/25 backdrop-blur-md sticky top-0 z-50">
      <div className="flex w-full items-center justify-between py-4 px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex flex-col text-left">
          <span className="font-serif text-2xl font-bold text-hf-rose leading-none tracking-tight">
            Hanfleur
          </span>
          <span className="text-[10px] font-sans font-bold tracking-[0.35em] uppercase text-hf-accent mt-1">
            Florist
          </span>
        </a>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-8">
          <a
            href="#"
            className="relative text-sm font-bold text-hf-rose transition-colors duration-200"
          >
            Beranda
            <span className="absolute bottom-[-20px] left-0 h-[3px] w-full rounded-full bg-hf-rose" />
          </a>
          <a
            href="#order-section"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Katalog
          </a>
          <a
            href="#order-section"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Custom Bouquet
          </a>
          <a
            href="#testimonials"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Testimoni
          </a>
          <a
            href="#about"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            Tentang Kami
          </a>
          <a
            href="#faq"
            className="text-sm font-semibold text-hf-text/80 hover:text-hf-rose transition-colors duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-hf-rose px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-hf-rose-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <svg
            className="h-4.5 w-4.5 fill-current text-white"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.59 2.016 14.12 1.01 11.998 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.47 3.387 1.357 4.881l-.994 3.634 3.756-.973zm12.066-5.836c-.32-.16-1.89-.933-2.185-1.043-.294-.11-.508-.16-.724.16-.215.32-.83.16-1.02.38-.19.22-.38.247-.7.087-.32-.16-1.35-.497-2.57-1.588-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.492.14-.652.145-.144.32-.373.48-.56.16-.188.213-.32.32-.533.11-.21.053-.4-.027-.56-.08-.16-.724-1.745-.99-2.39-.26-.624-.52-.54-.724-.55-.186-.01-.4-.01-.613-.01-.213 0-.56.08-.853.4-.293.32-1.12 1.1-1.12 2.678 0 1.578 1.15 3.1 1.31 3.3.16.2 2.26 3.45 5.486 4.84 2.68 1.16 3.23.93 3.8.88.57-.05 1.89-.77 2.15-1.48.27-.72.27-1.33.19-1.47-.08-.14-.294-.22-.614-.38z" />
          </svg>
          Pesan via WhatsApp
        </a>
      </div>
    </header>
  )
}
