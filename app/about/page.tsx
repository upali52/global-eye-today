import Image from "next/image"
import Link from "next/link"
import { categoryConfig, categories } from "@/lib/posts"

export const metadata = { title: "About Us" }

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-12">
        <Image src="/logo.svg" alt="Global Eye Today" width={280} height={64} className="mx-auto mb-6 h-14 w-auto" />
        <p className="text-xl text-gray-600 leading-relaxed">
          Your window to the world — delivering accurate, timely, and independent journalism.
        </p>
      </div>

      {/* Founder profile */}
      <div className="bg-gray-900 text-white rounded-2xl p-8 mb-10 relative overflow-hidden">
        <div className="absolute right-6 top-6 opacity-10">
          <svg width="100" height="100" viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="2">
            <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
            <circle cx="32" cy="32" r="16"/>
            <ellipse cx="32" cy="32" rx="8" ry="16"/>
            <line x1="16" y1="32" x2="48" y2="32"/>
            <circle cx="32" cy="32" r="5" fill="white"/>
          </svg>
        </div>
        <div className="flex items-center gap-5 mb-5">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-2xl font-black text-white flex-shrink-0">
            U
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Upali Tennakoon</h2>
            <p className="text-red-400 font-bold text-sm uppercase tracking-wide">Founder &amp; Editor-in-Chief</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed text-base mb-3">
          Upali Tennakoon is a veteran Sri Lankan journalist and media entrepreneur with decades of experience
          in print and digital journalism.
        </p>
        <p className="text-gray-300 leading-relaxed text-base mb-3">
          He is the Founder and Editor-in-Chief of <span className="text-white font-bold">Rivira</span>, one of
          Sri Lanka&apos;s leading Sunday newspapers, and a Founding Member of
          <span className="text-white font-bold"> Divaina</span>, where he served as Editor-in-Chief for ten years.
        </p>
        <p className="text-gray-300 leading-relaxed text-base">
          With Global Eye Today, Upali brings his wealth of editorial expertise to international news,
          offering readers a trusted, independent window to world events.
        </p>
      </div>

      {/* Career highlights */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1 h-6 rounded bg-red-600 block" />
          <h2 className="text-lg font-black uppercase tracking-widest text-gray-700">Career Highlights</h2>
        </div>
        <div className="space-y-4">
          {[
            { year: "2024 – Present", role: "Founder & Editor-in-Chief", org: "Global Eye Today", color: "#dc2626" },
            { year: "10+ Years", role: "Founder Member & Editor-in-Chief", org: "Divaina", color: "#2563eb" },
            { year: "Founder", role: "Founder & Editor-in-Chief", org: "Rivira Sunday Newspaper", color: "#7c3aed" },
          ].map((item) => (
            <div key={item.org} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-1 h-12 rounded flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div>
                <p className="font-black text-gray-900">{item.org}</p>
                <p className="text-sm text-gray-600">{item.role}</p>
                <p className="text-xs font-bold mt-0.5" style={{ color: item.color }}>{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        {[
          { title: "Independence", desc: "We answer only to our readers — no political affiliations, no advertiser influence.", color: "#2563eb" },
          { title: "Accuracy", desc: "Every story is verified by trusted sources before publication.", color: "#dc2626" },
          { title: "Transparency", desc: "We correct mistakes publicly and explain our editorial decisions openly.", color: "#059669" },
        ].map((v) => (
          <div key={v.title} className="p-5 rounded-xl border-2" style={{ borderColor: v.color + "33", backgroundColor: v.color + "08" }}>
            <div className="w-2 h-6 rounded mb-3" style={{ backgroundColor: v.color }} />
            <h3 className="font-black text-lg mb-2" style={{ color: v.color }}>{v.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Coverage areas */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1 h-6 rounded bg-red-600 block" />
          <h2 className="text-lg font-black uppercase tracking-widest text-gray-700">Coverage Areas</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const c = categoryConfig[cat] ?? { hex: "#dc2626", light: "#fff1f2" }
            return (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className="px-4 py-2 rounded-full font-bold text-sm transition-colors hover:opacity-80"
                style={{ backgroundColor: c.light, color: c.hex }}
              >
                {cat}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Contact */}
      <div className="text-center bg-red-50 border border-red-100 rounded-2xl p-8">
        <h3 className="text-xl font-black mb-2">Get in Touch</h3>
        <p className="text-gray-600 mb-4 text-sm">News tips, feedback, or press inquiries — we want to hear from you.</p>
        <a
          href="mailto:editor@globleeyetoday.com"
          className="inline-block bg-red-600 text-white font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors text-sm"
        >
          editor@globleeyetoday.com
        </a>
      </div>

    </div>
  )
}
