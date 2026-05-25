import Link from "next/link"
import { posts, categories, categoryConfig } from "@/lib/posts"
import { fetchTopHeadlines, fetchAllCategories, type NewsArticle } from "@/lib/newsapi"
import { ArticleCard } from "@/app/components/ArticleCard"

export const revalidate = 3600 // refresh news every hour

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

export default async function HomePage() {
  // Fetch real news — falls back to static posts if no API key
  const [headlines, categoryNews] = await Promise.all([
    fetchTopHeadlines(20),
    fetchAllCategories(),
  ])

  const allArticles = headlines.length > 0 ? headlines : posts.map(toArticle)
  const featuredArticles = allArticles.length > 0 ? allArticles : posts.map(toArticle)

  const featured = featuredArticles[0]
  const secondary = featuredArticles.slice(1, 4)
  const latest = featuredArticles.slice(4, 10)

  const cfg = categoryConfig[featured?.category] ?? { hex: "#dc2626", light: "#fff1f2" }

  return (
    <div className="space-y-12">

      {/* ── LIVE NEWS BANNER ── */}
      {headlines.length > 0 && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
          <span className="text-xs font-bold text-red-600 uppercase tracking-wide flex-shrink-0">Live News</span>
          <span className="text-xs text-gray-600 truncate">Auto-updating every hour from global sources</span>
          <span className="ml-auto text-xs text-gray-400 flex-shrink-0">
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          {featured && <ArticleCard article={featured} size="large" />}
        </div>

        <div className="md:col-span-2 flex flex-col divide-y divide-gray-100">
          {secondary.map((article, i) => (
            <div key={article.id + i} className="py-4 first:pt-0">
              <ArticleCard article={article} size="small" />
            </div>
          ))}
        </div>
      </section>

      {/* ── LATEST STORIES ── */}
      <div className="flex items-center gap-3">
        <span className="w-1 h-6 rounded bg-red-600 block" />
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-700">Latest Stories</h2>
        <div className="flex-1 border-t border-gray-200" />
        <Link href="/blog" className="text-xs text-red-600 font-semibold hover:underline">View all →</Link>
      </div>

      <section className="grid sm:grid-cols-2 gap-6">
        {latest.map((article, i) => (
          <ArticleCard key={article.id + i} article={article} />
        ))}
      </section>

      {/* ── NEWS BY CATEGORY ── */}
      {categoryNews.length > 0 && (
        <>
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 rounded bg-red-600 block" />
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-700">News by Topic</h2>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <div className="space-y-8">
            {categories.map((cat) => {
              const c = categoryConfig[cat] ?? { hex: "#dc2626", light: "#fff1f2" }
              const catArticles = categoryNews.filter((a) => a.category === cat).slice(0, 3)
              if (catArticles.length === 0) return null
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1 h-5 rounded block" style={{ backgroundColor: c.hex }} />
                      <h3 className="font-black uppercase tracking-wide text-sm" style={{ color: c.hex }}>{cat}</h3>
                    </div>
                    <Link href={`/blog?category=${cat}`} className="text-xs font-semibold hover:underline" style={{ color: c.hex }}>
                      More {cat} →
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {catArticles.map((article, i) => (
                      <ArticleCard key={article.id + i} article={article} size="small" />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ── BROWSE CATEGORIES ── */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1 h-6 rounded bg-red-600 block" />
          <h2 className="text-sm font-black uppercase tracking-widest text-gray-700">Browse by Topic</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const c = categoryConfig[cat] ?? { hex: "#dc2626", light: "#fff1f2" }
            return (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md"
                style={{ borderColor: c.hex + "33", backgroundColor: c.light }}
              >
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none" stroke={c.hex} strokeWidth="4" strokeLinecap="round">
                  <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
                  <circle cx="32" cy="32" r="15"/>
                  <circle cx="32" cy="32" r="5" fill={c.hex}/>
                </svg>
                <span className="text-sm font-bold" style={{ color: c.hex }}>{cat}</span>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}
