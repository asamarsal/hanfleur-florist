import { DecorativeBackground } from '@/components/decorative-background'
import { HanfleurProfileCard } from '@/components/hanfleur-profile-card'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { RunningText } from '@/components/running-text'
import { BestSellers } from '@/components/best-sellers'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-hf-bg via-[#fadde4] to-hf-secondary pt-[58px] lg:pt-[76px]">
      <DecorativeBackground />
      <Navbar />
      <RunningText />
      <div className="mx-auto w-full max-w-[480px] px-4 pt-6 pb-6 sm:px-5 md:max-w-[680px] lg:max-w-none lg:px-12 lg:pt-3 lg:pb-10 overflow-x-hidden lg:overflow-x-visible">
        <HanfleurProfileCard />

        {/* Best Sellers & Testimonials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.1fr_1fr] gap-8 mt-12">
          <BestSellers />
          <Testimonials />
        </div>

        {/* FAQ Section */}
        <Faq />

        {/* Map Section */}
        <section className="relative mt-8 sm:mt-12 rounded-[32px] border border-white/40 bg-white/50 p-6 sm:p-8 backdrop-blur-sm shadow-[0_8px_30px_rgba(185,78,104,0.06)]">
          <div className="text-center lg:text-left mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-hf-rose/80">
              ✦ KUNJUNGI KAMI ✦
            </span>
            <h2 className="mt-1 font-serif text-2xl lg:text-3xl font-bold text-hf-rose">
              Lokasi Toko Bouquet 📍
            </h2>
            <p className="mt-2 text-sm text-hf-text/80">
              Taman Wisma Asri 2, Bekasi, Indonesia. Jemput atau ambil sendiri di lokasi atau order via ojek online!
            </p>
          </div>
          <div className="w-full overflow-hidden rounded-2xl border border-hf-border/20 shadow-inner h-[280px] sm:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.90314958420907!2d107.02684588730337!3d-6.204165289370607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6989fdfc36d2cd%3A0xc5927f020a0beafc!2sTaman%20wisma%20asri%202!5e0!3m2!1sid!2sid!4v1780225414276!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
