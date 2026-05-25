import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, posts, categoryConfig } from "@/lib/posts"
import ShareButtons from "@/app/components/ShareButtons"
import BackButton from "@/app/components/BackButton"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const cfg = categoryConfig[post.category] ?? { hex: "#dc2626", light: "#fff1f2" }
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <BackButton label="Back to News" href="/blog" />
        <Link href="/" className="text-xs text-gray-400 hover:text-red-600 transition-colors font-semibold">
          🏠 Home
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        <Link href="/blog" className="hover:text-gray-900 transition-colors">News</Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        <span className="font-semibold" style={{ color: cfg.hex }}>{post.category}</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <span
          className="cat-badge mb-3 inline-block"
          style={{ backgroundColor: cfg.light, color: cfg.hex }}
        >
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>

        {/* Byline bar */}
        <div
          className="flex items-center gap-4 text-sm py-3 px-4 rounded-lg"
          style={{ backgroundColor: cfg.light }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{ backgroundColor: cfg.hex }}
            >
              {post.author[0]}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">{post.author}</p>
              <p className="text-xs text-gray-500">Staff Reporter</p>
            </div>
          </div>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600 text-xs">{post.date}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-600 text-xs">5 min read</span>

          {/* Share buttons */}
          <ShareButtons color={cfg.hex} />
        </div>
      </header>

      {/* Hero visual */}
      <div
        className="w-full h-64 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #1e293b 0%, #0f172a 100%)` }}
      >
        {/* Globe-eye watermark */}
        <svg width="200" height="200" viewBox="0 0 64 64" opacity="0.15">
          <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z" fill="none" stroke="white" strokeWidth="2.5"/>
          <circle cx="32" cy="32" r="16" fill="none" stroke={cfg.hex} strokeWidth="2"/>
          <ellipse cx="32" cy="32" rx="8" ry="16" fill="none" stroke={cfg.hex} strokeWidth="1.5"/>
          <line x1="16" y1="32" x2="48" y2="32" stroke={cfg.hex} strokeWidth="1.5"/>
          <path d="M20 24 Q32 20 44 24" fill="none" stroke={cfg.hex} strokeWidth="1.2"/>
          <path d="M20 40 Q32 44 44 40" fill="none" stroke={cfg.hex} strokeWidth="1.2"/>
          <circle cx="32" cy="32" r="5" fill={cfg.hex} opacity="0.6"/>
        </svg>
        <div className="absolute bottom-4 left-6">
          <span
            className="cat-badge"
            style={{ backgroundColor: cfg.hex, color: "white" }}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Article body */}
      <article className="article-body max-w-none mb-12">
        {post.content.trim().split("\n").map((line, i) => {
          const trimmed = line.trim()
          if (!trimmed) return null
          if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
            return <h3 key={i}>{trimmed.replace(/\*\*/g, "")}</h3>
          }
          if (trimmed.startsWith("- ")) {
            return (
              <li key={i}
                dangerouslySetInnerHTML={{
                  __html: trimmed.replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            )
          }
          return <p key={i}>{trimmed}</p>
        })}
      </article>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap mb-10 pb-8 border-b border-gray-200">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tags:</span>
        {[post.category, "Global News", "2026", post.author].map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: cfg.light, color: cfg.hex }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1 h-6 rounded block" style={{ backgroundColor: cfg.hex }} />
            <h2 className="text-lg font-black uppercase tracking-widest text-gray-700">More in {post.category}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((p) => {
              const rc = categoryConfig[p.category] ?? { hex: "#dc2626", light: "#fff1f2" }
              return (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div
                    className="h-32 rounded-lg mb-3 flex items-center justify-center"
                    style={{ backgroundColor: rc.light }}
                  >
                    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke={rc.hex} strokeWidth="3.5" strokeLinecap="round">
                      <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
                      <circle cx="32" cy="32" r="15"/>
                      <circle cx="32" cy="32" r="5" fill={rc.hex}/>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{p.date}</p>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Bottom navigation */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
        <BackButton label="Back to News" href="/blog" />
        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">
          🏠 Home
        </Link>
      </div>
    </div>
  )
}
