export function DecorativeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft pink glows */}
      <div className="absolute left-[-80px] top-[-40px] h-64 w-64 rounded-full bg-hf-accent/20 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-40px] h-72 w-72 rounded-full bg-hf-secondary/60 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-hf-accent/10 blur-3xl" />

      {/* Very subtle floral dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, var(--hf-rose) 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  )
}
