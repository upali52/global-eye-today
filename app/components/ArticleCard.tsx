import Link from "next/link"
import Image from "next/image"
import { categoryConfig } from "@/lib/posts"
import type { NewsArticle } from "@/lib/newsapi"

function buildPreviewUrl(article: NewsArticle): string {
  const params = new URLSearchParams({
    title:    article.title,
    excerpt:  article.excerpt,
    url:      article.url,
    source:   article.source,
    author:   article.author,
    date:     article.date,
    category: article.category,
    ...(article.imageUrl ? { image: article.imageUrl } : {}),
  })
  return `/news?${params.toString()}`
}

export function ArticleCard({ article, size = "normal" }: { article: NewsArticle; size?: "large" | "normal" | "small" }) {
  const cfg = categoryConfig[article.category] ?? { hex: "#dc2626", light: "#fff1f2" }
  const href = article.isExternal ? buildPreviewUrl(article) : article.url
  const target = undefined
  const rel = undefined

  if (size === "large") {
    return (
      <Link href={href} target={target} rel={rel} className="group block">
        <div
          className="rounded-xl overflow-hidden h-72 flex flex-col justify-end p-6 relative"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
        >
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover opacity-40"
              unoptimized
            />
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          {/* Watermark icon */}
          <div className="absolute top-4 right-4 opacity-10">
            <svg width="80" height="80" viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
              <circle cx="32" cy="32" r="16"/>
              <ellipse cx="32" cy="32" rx="8" ry="16"/>
              <line x1="16" y1="32" x2="48" y2="32"/>
              <circle cx="32" cy="32" r="5" fill="white"/>
            </svg>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="cat-badge" style={{ backgroundColor: cfg.light, color: cfg.hex }}>
                {article.category}
              </span>
              {article.isExternal && (
                <span className="text-xs text-gray-300 bg-black/40 px-2 py-0.5 rounded">
                  {article.source}
                </span>
              )}
            </div>
            <h2 className="text-white text-xl font-black leading-snug group-hover:text-red-300 transition-colors line-clamp-3">
              {article.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <span>{article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
              {article.isExternal && <span className="ml-auto text-gray-500">↗ Read at source</span>}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (size === "small") {
    return (
      <Link href={href} target={target} rel={rel} className="group flex gap-3">
        <div
          className="w-16 h-14 rounded flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: cfg.light }}
        >
          {article.imageUrl ? (
            <Image src={article.imageUrl} alt="" width={64} height={56} className="object-cover w-full h-full" unoptimized />
          ) : (
            <span className="text-lg font-black" style={{ color: cfg.hex }}>{article.category[0]}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className="cat-badge" style={{ backgroundColor: cfg.light, color: cfg.hex }}>{article.category}</span>
          <h3 className="text-sm font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
            {article.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <span>{article.source}</span><span>•</span><span>{article.date}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} target={target} rel={rel} className="group flex gap-4">
      <div
        className="w-24 h-20 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: cfg.light }}
      >
        {article.imageUrl ? (
          <Image src={article.imageUrl} alt="" width={96} height={80} className="object-cover w-full h-full" unoptimized />
        ) : (
          <span className="text-3xl font-black" style={{ color: cfg.hex }}>{article.category[0]}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="cat-badge" style={{ backgroundColor: cfg.light, color: cfg.hex }}>{article.category}</span>
          <span className="text-xs text-gray-400">{article.source}</span>
        </div>
        <h3 className="font-bold text-sm leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{article.excerpt}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <span>{article.author}</span><span>•</span><span>{article.date}</span>
          {article.isExternal && <span className="text-gray-400">↗</span>}
        </div>
      </div>
    </Link>
  )
}
