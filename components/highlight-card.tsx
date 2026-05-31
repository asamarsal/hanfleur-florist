import Image from 'next/image'

const benefits = [
  { label: 'Artificial Flower', iconPath: '/icon/icon-flower.png' },
  { label: 'Tahan Lama', iconPath: '/icon/icon-heart.png' },
  { label: 'Bisa Custom', iconPath: '/icon/icon-gift.png' },
]

export function HighlightCard() {
  return (
    <div className="js-reveal-card grid grid-cols-3 gap-2 rounded-3xl border border-white/50 bg-hf-cream/75 p-3 shadow-sm backdrop-blur-md">
      {benefits.map(({ label, iconPath }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-2xl bg-white/50 px-2 py-2 text-center"
        >
          <div className="relative h-10 w-10 flex items-center justify-center">
            <Image
              src={iconPath}
              alt=""
              width={24}
              height={24}
              className="h-10 w-10"
            />
          </div>
          <span className="text-xs font-bold leading-tight text-hf-text">
            {label.split(' ').map((word, idx) => (
              <span key={idx} className="block">
                {word}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}
