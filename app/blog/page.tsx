import Link from "next/link"
import { posts, categories, categoryConfig } from "@/lib/posts"
import { fetchByCategory, fetchTopHeadlines, type NewsArticle } from "@/lib/newsapi"
import { ArticleCard } from "@/app/components/ArticleCard"
import BackButton from "@/app/components/BackButton"

export const revalidate = 3600

function toArticle(post: typeof posts[0]): NewsArticle {
  return {
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    author: post.author,
    source: "Global Eye Today",
    url: `/blog/${post.slug}`,
    imageUrl: null,
    isExternal: false,
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  let articles: NewsArticle[] = []

  if (category) {
    articles = await fetchByCategory(category, 20)
  } else {
    articles = await fetchTopHeadlines(30)
  }

  // Fallback to static posts if no API key
  if (articles.length === 0) {
    const filtered = category ? posts.filter((p) => p.category === category) : posts
    articles = filtered.map(toArticle)
  }

  const cfg = category ? categoryConfig[category] : null

  return (
    <div>
      {/* Back navigation */}
      <div className="mb-4">
        <BackButton label="Back to Home" />
      </div>

      {/* Header */}
      <div className="mb-8">
        {category && cfg ? (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-10 rounded" style={{ backgroundColor: cfg.hex }} />
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">{category}</h1>
              <p className="text-sm text-gray-500">{articles.length} stories • Updates every hour</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-10 rounded bg-red-600" />
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">All Stories</h1>
              <p className="text-sm text-gray-500">{articles.length} stories • Updates every hour</p>
            </div>
          </div>
        )}

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="px-4 py-1.5 text-sm font-bold rounded-full border-2 transition-colors"
            style={!category
              ? { backgroundColor: "#111827", color: "white", borderColor: "#111827" }
              : { borderColor: "#d1d5db", color: "#6b7280" }
            }
          >
            All
          </Link>
          {categories.map((cat) => {
            const c = categoryConfig[cat] ?? { hex: "#dc2626", light: "#fff1f2" }
            const active = category === cat
            return (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className="px-4 py-1.5 text-sm font-bold rounded-full border-2 transition-colors"
                style={active
                  ? { backgroundColor: c.hex, color: "white", borderColor: c.hex }
                  : { borderColor: c.hex + "66", color: c.hex }
                }
              >
                {cat}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Articles */}
      <div className="divide-y divide-gray-100">
        {articles.map((article, i) => {
          const c = categoryConfig[article.category] ?? { hex: "#dc2626", light: "#fff1f2" }
          return (
            <Link
              key={article.id + i}
              href={article.isExternal
                ? `/news?${new URLSearchParams({ title: article.title, excerpt: article.excerpt, url: article.url, source: article.source, author: article.author, date: article.date, category: article.category, ...(article.imageUrl ? { image: article.imageUrl } : {}) }).toString()}`
                : article.url}
              className="group flex gap-5 py-6"
            >
              <div
                className="w-28 h-24 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: c.light }}
              >
                {article.imageUrl ? (
                  <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <svg width="28" height="28" viewBox="0 0 64 64" fill="none" stroke={c.hex} strokeWidth="4" strokeLinecap="round">
                    <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
                    <circle cx="32" cy="32" r="15"/>
                    <circle cx="32" cy="32" r="5" fill={c.hex}/>
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="cat-badge" style={{ backgroundColor: c.light, color: c.hex }}>{article.category}</span>
                  <span className="text-xs text-gray-400 font-medium">{article.source}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                  {article.isExternal && <span className="ml-auto text-xs text-gray-400">↗ External</span>}
                </div>
                <h2 className="text-lg font-black leading-snug group-hover:text-red-600 transition-colors mb-1.5 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                <p className="text-xs text-gray-400 mt-2">By {article.author}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">📰</p>
          <p className="text-lg font-semibold">No articles found.</p>
        </div>
      )}
    </div>
  )
}
