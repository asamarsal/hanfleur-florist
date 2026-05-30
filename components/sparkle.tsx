import { cn } from '@/lib/utils'

type SparkleProps = {
  className?: string
  size?: number
}

export function Sparkle({ className, size = 18 }: SparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('js-sparkle text-hf-gold drop-shadow-sm', className)}
    >
      <path
        d="M12 1.5c.4 3.9 2.1 5.6 6 6-3.9.4-5.6 2.1-6 6-.4-3.9-2.1-5.6-6-6 3.9-.4 5.6-2.1 6-6Z"
        fill="currentColor"
      />
    </svg>
  )
}
