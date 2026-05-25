import Link from "next/link"
import { posts, categories } from "@/lib/posts"

export default function HomePage() {
  const featured = posts[0]
  const secondary = posts.slice(1, 4)
  const rest = posts.slice(4)

  return (
    <div className="space-y-10">
      {/* Featured story */}
      <section>
        <div className="grid md:grid-cols-5 gap-6">
          {/* Main featured */}
          <div className="md:col-span-3">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden h-64 flex items-end p-6 mb-4">
                <div>
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
                    {featured.category}
                  </span>
                  <h1 className="text-white text-2xl font-bold leading-snug group-hover:text-red-300 transition-colors">
                    {featured.title}
                  </h1>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{featured.excerpt}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span>{featured.author}</span>
                <span>•</span>
                <span>{featured.date}</span>
              </div>
            </Link>
          </div>

          {/* Secondary featured */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {secondary.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="w-20 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-black text-lg">{post.category[0]}</span>
                </div>
                <div>
                  <span className="text-xs text-red-600 font-semibold uppercase">{post.category}</span>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mt-0.5">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider with section title */}
      <div className="flex items-center gap-4">
        <div className="w-1 h-6 bg-red-600 rounded" />
        <h2 className="text-lg font-bold uppercase tracking-wide">Latest Stories</h2>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* Latest stories grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-4">
            <div className="w-24 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex-shrink-0 flex items-center justify-center">
              <span className="text-3xl text-gray-300 font-black">{post.category[0]}</span>
            </div>
            <div>
              <span className="text-xs text-red-600 font-semibold uppercase">{post.category}</span>
              <h3 className="font-semibold text-sm leading-snug group-hover:text-red-600 transition-colors mt-0.5 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Categories row */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-6 bg-red-600 rounded" />
          <h2 className="text-lg font-bold uppercase tracking-wide">Browse by Topic</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/blog?category=${cat}`}
              className="px-4 py-2 border-2 border-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors rounded"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
