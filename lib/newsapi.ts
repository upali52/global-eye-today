export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  source: string
  url: string
  imageUrl: string | null
  isExternal: boolean
}

const categoryMap: Record<string, string> = {
  World:      "general",
  Technology: "technology",
  Business:   "business",
  Science:    "science",
  Sports:     "sports",
}

function guessCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  if (text.match(/tech|ai|software|app|digital|robot|cyber|internet|data/)) return "Technology"
  if (text.match(/business|market|economy|stock|trade|company|bank|finance|gdp/)) return "Business"
  if (text.match(/sport|football|soccer|basketball|tennis|olympic|cricket|rugby/)) return "Sports"
  if (text.match(/science|space|nasa|climate|health|medical|research|study|covid/)) return "Science"
  return "World"
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    })
  } catch {
    return iso
  }
}

function mapArticles(articles: any[], category?: string): NewsArticle[] {
  return articles
    .filter((a) => a.title && a.title !== "[Removed]" && a.url)
    .map((a, i) => ({
      id: `news-${i}-${Date.now()}`,
      title: a.title,
      excerpt: a.description ?? "Read the full story at the source.",
      category: category ?? guessCategory(a.title, a.description ?? ""),
      date: formatDate(a.publishedAt),
      author: a.author ?? a.source?.name ?? "Staff Reporter",
      source: a.source?.name ?? "News Source",
      url: a.url,
      imageUrl: a.urlToImage ?? null,
      isExternal: true,
    }))
}

export async function fetchTopHeadlines(pageSize = 20): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return []

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&pageSize=${pageSize}&apiKey=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return mapArticles(data.articles ?? [])
  } catch {
    return []
  }
}

export async function fetchByCategory(category: string, pageSize = 15): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return []

  const newsCategory = categoryMap[category] ?? "general"

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${newsCategory}&language=en&pageSize=${pageSize}&apiKey=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return mapArticles(data.articles ?? [], category)
  } catch {
    return []
  }
}

export async function fetchAllCategories(): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY
  if (!apiKey) return []

  const results = await Promise.all(
    Object.keys(categoryMap).map((cat) => fetchByCategory(cat, 6))
  )
  return results.flat()
}
