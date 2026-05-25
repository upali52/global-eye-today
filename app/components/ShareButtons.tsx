"use client"

export default function ShareButtons({ color }: { color: string }) {
  return (
    <div className="ml-auto flex gap-2">
      {["X", "FB", "Copy"].map((label) => (
        <button
          key={label}
          onClick={() => {
            if (label === "Copy") navigator.clipboard.writeText(window.location.href)
          }}
          className="text-xs font-bold px-3 py-1 rounded-full border transition-colors"
          style={{ borderColor: color, color }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.backgroundColor = color
            el.style.color = "white"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.backgroundColor = ""
            el.style.color = color
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
