import { DecorativeBackground } from '@/components/decorative-background'
import { HanfleurProfileCard } from '@/components/hanfleur-profile-card'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { RunningText } from '@/components/running-text'
import { BestSellers } from '@/components/best-sellers'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { StoreLocation } from '@/components/store-location'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-hf-bg via-[#fadde4] to-hf-secondary pt-[50px] lg:pt-[72px] flex flex-col">
      <DecorativeBackground />
      <Navbar />
      <RunningText />
      <div className="mx-auto w-full max-w-[480px] px-4 pt-6 pb-4 sm:px-5 md:max-w-[680px] lg:max-w-none lg:px-12 lg:pt-3 lg:pb-4 overflow-x-hidden lg:overflow-x-visible flex-grow flex flex-col justify-between">
        <div>
          <HanfleurProfileCard />

          {/* Best Sellers & Testimonials Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[2.1fr_1fr] gap-8 mt-12">
            <BestSellers />
            <Testimonials />
          </div>

          {/* FAQ Section */}
          <Faq />

          {/* Map Section */}
          <StoreLocation />
        </div>

        <Footer />
      </div>
    </main>
  )
}
