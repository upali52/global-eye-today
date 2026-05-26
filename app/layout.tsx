import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import SubscribeModal from "@/app/components/SubscribeModal"
import BackToTop from "@/app/components/BackToTop"
import DarkModeToggle from "@/app/components/DarkModeToggle"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Global Eye Today", template: "%s — Global Eye Today" },
  description: "Your window to the world — breaking news, analysis, and in-depth reporting.",
  icons: { icon: "/logo-icon.svg", apple: "/logo-icon.svg" },
  openGraph: {
    siteName: "Global Eye Today",
    type: "website",
  },
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog?category=World", label: "World" },
  { href: "/blog?category=Technology", label: "Technology" },
  { href: "/blog?category=Business", label: "Business" },
  { href: "/blog?category=Science", label: "Science" },
  { href: "/blog?category=Sports", label: "Sports" },
  { href: "/about", label: "About" },
]

const headlines = [
  "World leaders sign landmark climate accord pledging net-zero by 2045",
  "AI system diagnoses rare diseases with 98% accuracy in clinical trials",
  "IMF raises global growth forecast to 3.8% on emerging market surge",
  "NASA and ESA confirm joint Mars Sample Return mission for 2028",
  "Renewables cross 60% of global electricity for first time in history",
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ticker = headlines.join("   •••   ")

  return (
    <html lang="en" className={geist.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const s=localStorage.getItem('theme');const p=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&p))document.documentElement.classList.add('dark')}catch(e){}` }} />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">

        {/* Breaking news ticker */}
        <div className="bg-red-600 text-white flex items-center overflow-hidden h-8">
          <span className="flex-shrink-0 bg-gray-900 text-white text-xs font-black px-3 h-full flex items-center tracking-widest uppercase z-10">
            Breaking
          </span>
          <div className="overflow-hidden flex-1 relative h-full flex items-center">
            <div className="ticker-track whitespace-nowrap text-xs font-medium">
              {ticker}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ticker}
            </div>
          </div>
        </div>

        {/* Header — sticky so nav is always visible */}
        <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 bg-white dark:bg-slate-950 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Global Eye Today"
                width={240}
                height={54}
                priority
                className="h-12 w-auto"
              />
            </Link>

            {/* Search bar */}
            <div className="hidden md:flex flex-1 max-w-sm ml-8">
              <div className="relative w-full">
                <input
                  type="search"
                  placeholder="Search stories..."
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 pr-9"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Date + Subscribe + Dark toggle */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-gray-400 dark:text-gray-500">Sunday, May 25, 2026</span>
              <SubscribeModal />
              <DarkModeToggle />
            </div>
          </div>

          {/* Nav bar */}
          <nav className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-semibold whitespace-nowrap hover:bg-red-600 transition-colors border-b-2 border-transparent hover:border-red-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </main>

        <BackToTop />

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <Image src="/logo.svg" alt="Global Eye Today" width={200} height={44} className="h-10 w-auto brightness-0 invert mb-3" />
                <p className="text-sm leading-relaxed max-w-xs">
                  Delivering accurate, timely, and independent news from around the world since 2020.
                </p>
                <div className="flex gap-3 mt-4">
                  {["X", "FB", "IG", "YT"].map((s) => (
                    <a key={s} href="#" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-xs font-bold hover:bg-red-600 hover:border-red-600 transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Sections</h4>
                <ul className="space-y-2 text-sm">
                  {["World", "Technology", "Business", "Science", "Sports"].map((cat) => (
                    <li key={cat}>
                      <Link href={`/blog?category=${cat}`} className="hover:text-white transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">Company</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    { label: "About Us",        href: "/about"   },
                    { label: "Contact",          href: "/contact" },
                    { label: "Careers",          href: "/careers" },
                    { label: "Privacy Policy",   href: "/privacy" },
                    { label: "Terms of Service", href: "/terms"   },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <span>© 2026 Global Eye Today. All rights reserved.</span>
              <span className="text-gray-600">Independent journalism, trusted worldwide.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
