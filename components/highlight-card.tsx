import { Flower2, Heart, Gift } from 'lucide-react'

const benefits = [
  { label: 'Artificial Flower', icon: Flower2 },
  { label: 'Tahan Lama', icon: Heart },
  { label: 'Bisa Custom', icon: Gift },
]

export function HighlightCard() {
  return (
    <div className="js-reveal-card grid grid-cols-3 gap-2 rounded-3xl border border-white/50 bg-hf-cream/75 p-3 shadow-sm backdrop-blur-md">
      {benefits.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white/50 px-2 py-3 text-center"
        >
          <Icon className="h-5 w-5 text-hf-rose" />
          <span className="text-xs font-bold leading-tight text-hf-text">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
