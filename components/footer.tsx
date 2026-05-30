import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="flex items-center justify-center gap-1.5 py-6 text-xs font-semibold text-hf-rose/80">
      Made with love by Hanfleur Florist
      <Heart className="h-3.5 w-3.5 fill-hf-accent text-hf-accent" />
    </footer>
  )
}
