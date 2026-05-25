import Link from "next/link"
import { posts, categories } from "@/lib/posts"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? posts.filter((p) => p.category === category) : posts

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-4">
          {category ? category : "All Stories"}
        </h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`px-3 py-1.5 text-sm font-semibold rounded border-2 transition-colors ${
              !category
                ? "bg-gray-900 text-white border-gray-900"
                : "border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className={`px-3 py-1.5 text-sm font-semibold rounded border-2 transition-colors ${
                category === cat
                  ? "bg-red-600 text-white border-red-600"
                  : "border-gray-300 text-gray-600 hover:border-red-600 hover:text-red-600"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles list */}
      <div className="divide-y divide-gray-100">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-6 py-6">
            <div className="w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex-shrink-0 flex items-center justify-center">
              <span className="text-4xl font-black text-gray-300">{post.category[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-red-600 font-bold uppercase tracking-wide bg-red-50 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-lg font-bold leading-snug group-hover:text-red-600 transition-colors mb-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              <p className="text-xs text-gray-400 mt-2">By {post.author}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-20 text-lg">No articles in this category yet.</p>
      )}
    </div>
  )
}
