import Link from "next/link"
import { categoryConfig } from "@/lib/posts"
import BackButton from "@/app/components/BackButton"

type Props = {
  searchParams: Promise<{
    title?: string
    excerpt?: string
    src?: string   // base64url encoded source URL
    source?: string
    author?: string
    date?: string
    category?: string
    image?: string
  }>
}

export default async function NewsPreviewPage({ searchParams }: Props) {
  const params = await searchParams
  const { title, excerpt, src, source, author, date, category, image } = params

  // Decode the source URL safely
  let articleUrl = ""
  if (src) {
    try {
      articleUrl = Buffer.from(src, "base64url").toString("utf-8")
    } catch {
      articleUrl = ""
    }
  }

  if (!title || !articleUrl) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-gray-400 text-lg mb-4">Article not found.</p>
        <Link href="/" className="text-red-600 font-bold hover:underline">← Go Home</Link>
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

      {/* Category + meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="cat-badge" style={{ backgroundColor: cfg.light, color: cfg.hex }}>{category}</span>
        <span className="text-xs text-gray-500 font-bold">{source}</span>
        <span className="text-xs text-gray-300">•</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-black leading-tight mb-5">{title}</h1>

      {/* Author */}
      {author && (
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
            style={{ backgroundColor: cfg.hex }}>
            {author[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">{author}</p>
            <p className="text-xs text-gray-400">{source}</p>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="w-full h-64 rounded-xl mb-6 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="flex items-center justify-center h-full opacity-10">
            <svg width="100" height="100" viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="2">
              <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
              <circle cx="32" cy="32" r="16"/>
              <circle cx="32" cy="32" r="5" fill="white"/>
            </svg>
          </div>
        )}
      </div>

      {/* Excerpt */}
      <div className="border-l-4 rounded-r-xl p-5 mb-8 text-base text-gray-700 leading-relaxed"
        style={{ borderColor: cfg.hex, backgroundColor: cfg.light }}>
        {excerpt}
      </div>

      {/* READ FULL STORY — prominent CTA */}
      <div className="rounded-2xl overflow-hidden mb-8 border-2" style={{ borderColor: cfg.hex + "44" }}>
        <div className="bg-gray-900 px-6 py-4 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 64 64" fill="none" stroke={cfg.hex} strokeWidth="3">
            <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
            <circle cx="32" cy="32" r="14"/>
            <circle cx="32" cy="32" r="5" fill={cfg.hex}/>
          </svg>
          <p className="text-white text-sm font-bold">Full story published by <span style={{ color: cfg.hex }}>{source}</span></p>
        </div>
        <div className="bg-white p-6 text-center">
          <p className="text-gray-500 text-sm mb-5">
            Click the button below to read the complete article. It will open in a new tab — you stay on Global Eye Today.
          </p>

          {/* Primary button */}
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-black px-8 py-4 rounded-full text-base transition-colors mb-4"
            style={{ backgroundColor: cfg.hex }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Read Full Story at {source}
          </a>

          {/* Fallback direct link */}
          <p className="text-xs text-gray-400 mt-2">
            If the button doesn&apos;t open: &nbsp;
            <a href={articleUrl} target="_blank" rel="noopener noreferrer"
              className="underline break-all" style={{ color: cfg.hex }}>
              {articleUrl.length > 60 ? articleUrl.slice(0, 60) + "…" : articleUrl}
            </a>
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <BackButton label="Back to News" />
        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">🏠 Home</Link>
      </div>

    </div>
  )
}
