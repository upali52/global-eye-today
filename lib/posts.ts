export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  imageUrl?: string
}

export const posts: Post[] = [
  {
    slug: "global-climate-summit-2026",
    title: "World Leaders Reach Historic Climate Agreement at Global Summit",
    excerpt:
      "Representatives from 195 nations signed a landmark accord pledging net-zero emissions by 2045, marking the most ambitious climate commitment in history.",
    content: `
World leaders gathered in Geneva this week to finalize what analysts are calling the most comprehensive climate agreement since the Paris Accord. The pact, signed by representatives from 195 nations, commits signatories to achieving net-zero carbon emissions by 2045.

**Key provisions of the agreement include:**

- A $500 billion annual climate fund for developing nations
- Mandatory renewable energy targets of 80% by 2040
- Phase-out of coal power plants by 2035 in developed nations
- New carbon pricing mechanisms across G20 economies

UN Secretary-General António Guterres called the agreement "a turning point for humanity," noting that failure to act would result in catastrophic consequences for future generations.

Environmental groups have broadly welcomed the deal, though some critics argue the timelines are still too lenient given the accelerating pace of climate change.

The agreement will now go to individual nations for ratification, with implementation expected to begin in 2027.
    `,
    category: "World",
    date: "May 25, 2026",
    author: "Sarah Mitchell",
  },
  {
    slug: "ai-breakthrough-medicine",
    title: "AI System Diagnoses Rare Diseases with 98% Accuracy in Clinical Trials",
    excerpt:
      "A new artificial intelligence platform developed by researchers at MIT and Johns Hopkins has demonstrated unprecedented accuracy in diagnosing over 3,000 rare diseases.",
    content: `
A groundbreaking artificial intelligence system developed jointly by researchers at MIT and Johns Hopkins University has achieved a 98% accuracy rate in diagnosing more than 3,000 rare diseases — a feat that typically takes human specialists years to accomplish.

The system, called MedInsight, was trained on over 50 million anonymized patient records and uses a novel multi-modal learning approach that combines genomic data, medical imaging, and clinical notes.

**What makes MedInsight different:**

In clinical trials spanning 12 hospitals across the United States and Europe, MedInsight correctly identified rare conditions in an average of 4.2 hours — compared to the current average diagnostic odyssey of 4.8 years for rare disease patients.

Dr. Elena Rodriguez, lead researcher at MIT's Computer Science and Artificial Intelligence Laboratory (CSAIL), said the system was particularly effective at identifying patterns across thousands of data points simultaneously — something human doctors simply cannot do at scale.

The technology is expected to receive FDA fast-track review and could be available in select medical centers as early as 2027. Researchers estimate the system could help the estimated 300 million people worldwide living with rare diseases.
    `,
    category: "Technology",
    date: "May 24, 2026",
    author: "James Okafor",
  },
  {
    slug: "global-economy-2026",
    title: "IMF Raises Global Growth Forecast as Emerging Markets Surge",
    excerpt:
      "The International Monetary Fund has revised its 2026 global growth forecast upward to 3.8%, driven by strong performance in Southeast Asia and Sub-Saharan Africa.",
    content: `
The International Monetary Fund (IMF) raised its global economic growth forecast for 2026 to 3.8%, up from its earlier projection of 3.2%, citing stronger-than-expected performance across emerging markets in Southeast Asia and Sub-Saharan Africa.

The revised forecast, published in the IMF's World Economic Outlook update, reflects sustained resilience in consumer spending and a recovery in global trade volumes following supply chain normalization.

**Regional highlights:**

- **Southeast Asia**: Vietnam, Indonesia, and the Philippines are projected to grow at 6.5%, 5.9%, and 6.2% respectively
- **Sub-Saharan Africa**: The region is expected to expand by 4.7%, led by Ethiopia, Rwanda, and Côte d'Ivoire
- **United States**: Growth revised upward to 2.4% on the back of continued labor market strength
- **Eurozone**: Modest improvement to 1.8% following energy sector stabilization

IMF Chief Economist Pierre-Olivier Gourinchas cautioned that risks remain, particularly around geopolitical tensions and potential volatility in commodity markets.

Markets responded positively to the announcement, with global equity indices posting gains across major exchanges.
    `,
    category: "Business",
    date: "May 23, 2026",
    author: "Priya Nair",
  },
  {
    slug: "space-mission-mars-2026",
    title: "NASA and ESA Confirm Joint Mars Sample Return Mission for 2028",
    excerpt:
      "Space agencies from the US and Europe have finalized plans for a joint mission to retrieve rock and soil samples previously collected by the Perseverance rover.",
    content: `
NASA and the European Space Agency (ESA) have officially confirmed a joint Mars Sample Return (MSR) mission targeted for launch in 2028, which aims to retrieve the 43 sample tubes cached by the Perseverance rover on the Martian surface.

The mission represents the most complex interplanetary endeavor ever attempted, requiring multiple spacecraft launches, a Mars ascent vehicle, and an Earth entry capsule.

**Mission architecture:**

The operation will involve a NASA-built Earth Return Orbiter and an ESA Sample Retrieval Lander. The lander will deploy a small fetch rover to collect Perseverance's sample caches and load them into the Mars Ascent Vehicle — a first-of-its-kind rocket that will launch from the Martian surface and rendezvous with the orbiter.

The samples are expected to reach Earth by 2033 and will be analyzed in specially constructed containment facilities to search for signs of ancient microbial life.

NASA Administrator Pam Melroy called the mission "the most scientifically consequential space mission in human history," noting that the samples could definitively answer the question of whether life ever existed on Mars.

The mission budget is estimated at $11 billion, shared between the two agencies.
    `,
    category: "Science",
    date: "May 22, 2026",
    author: "David Chen",
  },
  {
    slug: "olympic-games-2026-preview",
    title: "Tokyo 2026 Winter Olympics: Everything You Need to Know",
    excerpt:
      "With the opening ceremony just weeks away, here's a complete guide to the venues, events, and athletes to watch at Tokyo's historic first Winter Games.",
    content: `
Tokyo is set to make history as the first city to host both Summer and Winter Olympic Games when the 2026 Winter Olympics officially opens on February 7. The event, originally scheduled for Milan-Cortina, was relocated following infrastructure challenges, with Tokyo stepping in as host in 2024.

**Venues and events:**

The Games will feature 109 events across 15 sports, with competitions held at purpose-built venues in the Japanese Alps around Nagano prefecture and indoor events staged in Tokyo's world-class arena facilities.

**Athletes to watch:**

- **Mikaela Shiffrin (USA)** – Looking to extend her all-time World Cup wins record in alpine skiing
- **Yuzuru Hanyu (Japan)** – The local hero returning to competitive figure skating after a two-year hiatus
- **Nils van der Poel (Sweden)** – Defending gold medalist in speed skating seeking a historic three-peat
- **Eileen Gu (USA/China)** – Returning to represent USA after switching allegiances

The Games are expected to draw over 3,000 athletes from 90+ nations. Ticket sales have reportedly surpassed 2 million, driven largely by Japanese domestic demand.

Opening ceremony details remain under wraps, though organizers have promised a celebration blending traditional Japanese culture with futuristic technology.
    `,
    category: "Sports",
    date: "May 21, 2026",
    author: "Yuki Tanaka",
  },
  {
    slug: "renewable-energy-record",
    title: "Renewables Supply 60% of Global Electricity for First Time in History",
    excerpt:
      "Solar and wind power combined with hydroelectric sources crossed the 60% threshold for global electricity generation in April 2026, according to new data from the IEA.",
    content: `
Renewable energy sources supplied more than 60% of global electricity generation for the first time ever during April 2026, according to data released by the International Energy Agency (IEA). The milestone marks a dramatic acceleration in the clean energy transition.

Solar photovoltaic capacity alone grew by 285 gigawatts in 2025 — the largest single-year expansion of any energy technology in history — driven by rapidly falling costs and aggressive policy support in China, the European Union, and the United States.

**The breakdown:**

- Solar: 22% of global electricity
- Wind: 19%
- Hydropower: 14%
- Other renewables (geothermal, tidal, biomass): 5%
- Fossil fuels and nuclear: 40%

IEA Executive Director Fatih Birol described the milestone as "a watershed moment for the global energy system," adding that the transition was happening faster than most models had predicted even three years ago.

The achievement comes as electricity demand continues to rise globally, driven by the electrification of transport, heating, and industrial processes. Despite the renewables milestone, absolute fossil fuel consumption is still projected to peak in 2027 before declining.

Energy storage technology, particularly grid-scale batteries, is credited with enabling higher renewable penetration by smoothing out supply variability.
    `,
    category: "World",
    date: "May 20, 2026",
    author: "Maria Santos",
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category)
}

export const categories = ["World", "Technology", "Business", "Science", "Sports"]
