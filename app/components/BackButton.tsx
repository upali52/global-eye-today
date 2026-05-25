"use client"

import { useRouter } from "next/navigation"

export default function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors group"
    >
      <span className="w-7 h-7 rounded-full border-2 border-gray-300 group-hover:border-red-600 flex items-center justify-center transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </span>
      {label}
    </button>
  )
}
