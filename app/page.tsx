import { DecorativeBackground } from '@/components/decorative-background'
import { HanfleurProfileCard } from '@/components/hanfleur-profile-card'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-hf-bg via-[#fadde4] to-hf-secondary">
      <DecorativeBackground />
      <div className="mx-auto w-full max-w-[480px] px-4 py-6 sm:px-5 md:max-w-[680px] lg:max-w-[1100px] lg:px-8 lg:py-10">
        <HanfleurProfileCard />
        <Footer />
      </div>
    </main>
  )
}
