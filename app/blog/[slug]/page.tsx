import Link from "next/link"
import { notFound } from "next/navigation"
import { getPost, posts } from "@/lib/posts"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Global Eye Today`, description: post.excerpt }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gray-900">News</Link>
        <span>/</span>
        <Link href={`/blog?category=${post.category}`} className="hover:text-red-600 text-red-500">
          {post.category}
        </Link>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <span className="text-xs text-red-600 font-bold uppercase tracking-widest bg-red-50 px-2 py-1 rounded">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-black leading-tight mt-3 mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-b border-gray-100 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
              {post.author[0]}
            </div>
            <span className="font-medium text-gray-700">{post.author}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>

      {/* Hero image placeholder */}
      <div className="w-full h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-8 flex items-center justify-center">
        <span className="text-8xl font-black text-gray-600 opacity-30">{post.category[0]}</span>
      </div>

      {/* Article body */}
      <article className="prose prose-gray max-w-none">
        {post.content.split("\n").map((line, i) => {
          if (!line.trim()) return null
          if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <h3 key={i} className="text-xl font-bold mt-6 mb-3">
                {line.replace(/\*\*/g, "")}
              </h3>
            )
          }
          if (line.startsWith("- ")) {
            return (
              <li key={i} className="ml-4 text-gray-700 leading-relaxed mb-1">
                {line.replace(/^- /, "").replace(/\*\*(.+?)\*\*/g, (_, t) => t)}
              </li>
            )
          }
          return (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">
              {line}
            </p>
          )
        })}
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-red-600 rounded" />
            <h2 className="text-lg font-bold uppercase tracking-wide">More in {post.category}</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <div className="h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-3 flex items-center justify-center">
                  <span className="text-3xl font-black text-gray-300">{p.category[0]}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{p.date}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link href="/blog" className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
          ← Back to all stories
        </Link>
      </div>
    </div>
  )
}
