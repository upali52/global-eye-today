import Link from "next/link"
import { categoryConfig } from "@/lib/posts"
import BackButton from "@/app/components/BackButton"

type Props = {
  searchParams: Promise<{
    title?: string
    excerpt?: string
    url?: string
    source?: string
    author?: string
    date?: string
    category?: string
    image?: string
  }>
}

export default async function NewsPreviewPage({ searchParams }: Props) {
  const params = await searchParams
  const { title, excerpt, url, source, author, date, category, image } = params

  if (!title || !url) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-gray-400 text-lg">Article not found.</p>
        <Link href="/" className="text-red-600 font-bold mt-4 inline-block hover:underline">← Go Home</Link>
      </div>
    )
  }

  const cfg = categoryConfig[category ?? ""] ?? { hex: "#dc2626", light: "#fff1f2" }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Back bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <BackButton label="Back to News" />
        <Link href="/" className="text-xs text-gray-400 hover:text-red-600 transition-colors font-semibold">🏠 Home</Link>
      </div>

      {/* Category + source */}
      <div className="flex items-center gap-3 mb-4">
        <span className="cat-badge" style={{ backgroundColor: cfg.light, color: cfg.hex }}>{category}</span>
        <span className="text-xs text-gray-400 font-medium">{source}</span>
        <span className="text-xs text-gray-300">•</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-black leading-tight mb-4">{title}</h1>

      {/* Author */}
      {author && (
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white" style={{ backgroundColor: cfg.hex }}>
            {author[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">{author}</p>
            <p className="text-xs text-gray-400">{source}</p>
          </div>
        </div>
      )}

      {/* Hero image or placeholder */}
      <div className="w-full h-64 rounded-xl mb-6 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full h-full object-cover opacity-70" />
        ) : (
          <div className="flex items-center justify-center h-full opacity-10">
            <svg width="120" height="120" viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="2">
              <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
              <circle cx="32" cy="32" r="16"/>
              <ellipse cx="32" cy="32" rx="8" ry="16"/>
              <line x1="16" y1="32" x2="48" y2="32"/>
              <circle cx="32" cy="32" r="5" fill="white"/>
            </svg>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="cat-badge" style={{ backgroundColor: cfg.hex, color: "white" }}>{category}</span>
        </div>
      </div>

      {/* Excerpt */}
      <div className="bg-gray-50 border-l-4 rounded-r-xl p-5 mb-8" style={{ borderColor: cfg.hex }}>
        <p className="text-gray-700 leading-relaxed text-base">{excerpt}</p>
      </div>

      {/* Read full story CTA */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-8 text-center">
        <p className="text-gray-400 text-sm mb-4">
          This article is published by <span className="text-white font-bold">{source}</span>. Click below to read the full story.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition-colors"
        >
          Read Full Story at {source}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        <p className="text-xs text-gray-600 mt-3">Opens in a new tab — you stay on Global Eye Today</p>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <BackButton label="Back to News" />
        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">🏠 Home</Link>
      </div>

    </div>
  )
}
