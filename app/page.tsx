import { DecorativeBackground } from '@/components/decorative-background'
import { HanfleurProfileCard } from '@/components/hanfleur-profile-card'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { BestSellers } from '@/components/best-sellers'
import { Testimonials } from '@/components/testimonials'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-hf-bg via-[#fadde4] to-hf-secondary">
      <DecorativeBackground />
      <Navbar />
      <div className="mx-auto w-full max-w-[480px] px-4 py-6 sm:px-5 md:max-w-[680px] lg:max-w-none lg:px-12 lg:py-10">
        <HanfleurProfileCard />

        {/* Desktop-only layout section */}
        <div className="hidden lg:grid lg:grid-cols-[2.1fr_1fr] gap-8 mt-12">
          <BestSellers />
          <Testimonials />
        </div>

        <Footer />
      </div>
    </main>
  )
}
