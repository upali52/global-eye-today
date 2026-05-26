import Link from "next/link"
import { redirect } from "next/navigation"
import { categoryConfig } from "@/lib/posts"
import BackButton from "@/app/components/BackButton"

type Article = {
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  source: string
  url: string
  imageUrl: string | null
}

export default async function NewsViewPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>
}) {
  const { d } = await searchParams
  if (!d) redirect("/blog")

  let article: Article | null = null
  try {
    article = JSON.parse(Buffer.from(d, "base64url").toString("utf-8")) as Article
  } catch {
    redirect("/blog")
  }
  if (!article) redirect("/blog")

  const cfg = categoryConfig[article.category] ?? { hex: "#dc2626", light: "#fff1f2" }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <BackButton label="Back to News" href="/blog" />
        <Link href="/" className="text-xs text-gray-400 hover:text-red-600 transition-colors font-semibold">
          🏠 Home
        </Link>
      </div>

      {/* Category + headline */}
      <header className="mb-8">
        <span className="cat-badge mb-3 inline-block" style={{ backgroundColor: cfg.light, color: cfg.hex }}>
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4 text-gray-900 dark:text-white">
          {article.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{article.excerpt}</p>

        {/* Source bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm py-3 px-4 rounded-lg" style={{ backgroundColor: cfg.light }}>
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ backgroundColor: cfg.hex }}
            >
              {(article.source ?? "N")[0]}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">{article.source}</p>
              <p className="text-xs text-gray-500">{article.date}</p>
            </div>
          </div>
          {article.author && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-xs">By {article.author}</span>
            </>
          )}
        </div>
      </header>

      {/* Image */}
      {article.imageUrl && (
        <div className="mb-8 rounded-xl overflow-hidden">
          <img src={article.imageUrl} alt={article.title} className="w-full h-72 object-cover" />
        </div>
      )}

      {/* Read full story */}
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-8 border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm">Full article published by</p>
        <p className="text-xl font-black text-gray-900 dark:text-white mb-6">{article.source}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-red-700 transition-colors text-base"
        >
          Read Full Story
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
        <p className="text-xs text-gray-400 mt-4">Opens at {article.source}</p>
      </div>

      {/* Bottom nav */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <BackButton label="Back to News" href="/blog" />
        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">
          🏠 Home
        </Link>
      </div>
    </div>
  )
}
