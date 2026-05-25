import Link from "next/link"
import { posts, categories, categoryConfig } from "@/lib/posts"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? posts.filter((p) => p.category === category) : posts
  const cfg = category ? categoryConfig[category] : null

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        {category && cfg ? (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-10 rounded" style={{ backgroundColor: cfg.hex }} />
            <h1 className="text-3xl font-black uppercase tracking-tight">{category}</h1>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-10 rounded bg-red-600" />
            <h1 className="text-3xl font-black uppercase tracking-tight">All Stories</h1>
          </div>
        )}

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="px-4 py-1.5 text-sm font-bold rounded-full border-2 transition-colors"
            style={
              !category
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
                style={
                  active
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
        {filtered.map((post) => {
          const c = categoryConfig[post.category] ?? { hex: "#dc2626", light: "#fff1f2" }
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-5 py-6">
              {/* Category visual */}
              <div
                className="w-28 h-24 rounded-lg flex-shrink-0 flex flex-col items-center justify-center gap-1"
                style={{ backgroundColor: c.light }}
              >
                <svg width="28" height="28" viewBox="0 0 64 64" fill="none" stroke={c.hex} strokeWidth="4" strokeLinecap="round">
                  <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
                  <circle cx="32" cy="32" r="15"/>
                  <ellipse cx="32" cy="32" rx="7" ry="15"/>
                  <line x1="17" y1="32" x2="47" y2="32"/>
                  <circle cx="32" cy="32" r="4" fill={c.hex}/>
                </svg>
                <span className="text-xs font-black uppercase tracking-wide" style={{ color: c.hex }}>
                  {post.category}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="cat-badge"
                    style={{ backgroundColor: c.light, color: c.hex }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-lg font-black leading-snug group-hover:text-red-600 transition-colors mb-1.5 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-gray-400 mt-2">By {post.author}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <p className="text-5xl mb-4">📰</p>
          <p className="text-lg font-semibold">No articles in this category yet.</p>
        </div>
      )}
    </div>
  )
}
