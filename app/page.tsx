import Link from "next/link"
import { posts, categories, categoryConfig } from "@/lib/posts"

function CategoryBadge({ category }: { category: string }) {
  const cfg = categoryConfig[category] ?? { hex: "#dc2626", light: "#fff1f2" }
  return (
    <span
      className="cat-badge"
      style={{ backgroundColor: cfg.light, color: cfg.hex }}
    >
      {category}
    </span>
  )
}

function CategoryIcon({ category, size = 48 }: { category: string; size?: number }) {
  const cfg = categoryConfig[category] ?? { hex: "#dc2626", light: "#f5f5f5" }
  const icons: Record<string, string> = {
    World:      "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2c.55 0 1.4.4 2.24 1.73M12 4c-.55 0-1.4.4-2.24 1.73M12 4v16M4.27 8h15.46M3 12h18M4.27 16h15.46",
    Technology: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18",
    Business:   "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
    Science:    "M9 3v11m0 0a4 4 0 1 0 6 0M9 14a4 4 0 1 1 6 0M9 3h6M9 3a1 1 0 0 0-1 1v1h8V4a1 1 0 0 0-1-1",
    Sports:     "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
  }
  return (
    <div
      className="flex items-center justify-center rounded flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: cfg.light }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke={cfg.hex} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={icons[category] ?? "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"} />
      </svg>
    </div>
  )
}

export default function HomePage() {
  const featured = posts[0]
  const secondary = posts.slice(1, 4)
  const rest = posts.slice(4)
  const cfg = categoryConfig[featured.category] ?? { hex: "#dc2626", light: "#fff1f2" }

  return (
    <div className="space-y-12">

      {/* ── HERO ── */}
      <section className="grid md:grid-cols-5 gap-6">
        {/* Main featured */}
        <div className="md:col-span-3">
          <Link href={`/blog/${featured.slug}`} className="group block">
            {/* Hero card */}
            <div
              className="rounded-xl overflow-hidden h-72 flex flex-col justify-end p-6 relative"
              style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
            >
              {/* Decorative globe-eye watermark */}
              <div className="absolute top-4 right-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 64 64">
                  <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z" fill="none" stroke="white" strokeWidth="3"/>
                  <circle cx="32" cy="32" r="16" fill="none" stroke="white" strokeWidth="2"/>
                  <ellipse cx="32" cy="32" rx="8" ry="16" fill="none" stroke="white" strokeWidth="1.5"/>
                  <line x1="16" y1="32" x2="48" y2="32" stroke="white" strokeWidth="1.5"/>
                  <circle cx="32" cy="32" r="5" fill="white"/>
                </svg>
              </div>

              <div className="relative">
                <span
                  className="cat-badge mb-2 inline-block"
                  style={{ backgroundColor: cfg.light, color: cfg.hex }}
                >
                  {featured.category}
                </span>
                <h1 className="text-white text-2xl font-black leading-snug group-hover:text-red-300 transition-colors">
                  {featured.title}
                </h1>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mt-3">{featured.excerpt}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              <span className="font-medium text-gray-600">{featured.author}</span>
              <span>•</span>
              <span>{featured.date}</span>
            </div>
          </Link>
        </div>

        {/* Secondary stories */}
        <div className="md:col-span-2 flex flex-col divide-y divide-gray-100">
          {secondary.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-3 py-4 first:pt-0">
              <CategoryIcon category={post.category} size={52} />
              <div className="flex-1 min-w-0">
                <CategoryBadge category={post.category} />
                <h3 className="text-sm font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mt-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SECTION DIVIDER ── */}
      <div className="flex items-center gap-3">
        <span className="w-1 h-6 rounded bg-red-600 block" />
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-700">Latest Stories</h2>
        <div className="flex-1 border-t border-gray-200" />
        <Link href="/blog" className="text-xs text-red-600 font-semibold hover:underline">View all →</Link>
      </div>

      {/* ── LATEST GRID ── */}
      <section className="grid sm:grid-cols-2 gap-6">
        {rest.map((post) => {
          const c = categoryConfig[post.category] ?? { hex: "#dc2626", light: "#fff1f2" }
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4">
              <CategoryIcon category={post.category} size={72} />
              <div>
                <CategoryBadge category={post.category} />
                <h3 className="font-bold text-sm leading-snug group-hover:text-red-600 transition-colors mt-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                  <span>{post.author}</span><span>•</span><span>{post.date}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </section>

      {/* ── CATEGORY CARDS ── */}
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
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md"
                style={{ borderColor: c.hex + "33", backgroundColor: c.light }}
              >
                <CategoryIcon category={cat} size={40} />
                <span className="text-sm font-bold" style={{ color: c.hex }}>{cat}</span>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}
