import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Global Eye Today",
  description: "Your window to the world — breaking news, analysis, and in-depth reporting.",
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog?category=World", label: "World" },
  { href: "/blog?category=Technology", label: "Technology" },
  { href: "/blog?category=Business", label: "Business" },
  { href: "/blog?category=Science", label: "Science" },
  { href: "/blog?category=Sports", label: "Sports" },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* Top bar */}
        <div className="bg-red-600 text-white text-xs py-1 px-4 text-center font-medium tracking-wide">
          BREAKING NEWS &nbsp;•&nbsp; Stay informed with Global Eye Today
        </div>

        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl font-black tracking-tight leading-none text-gray-900">
                GLOBAL <span className="text-red-600">EYE</span> TODAY
              </span>
              <span className="text-xs text-gray-500 tracking-widest uppercase mt-0.5">
                Your Window to the World
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
              <span>May 25, 2026</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium whitespace-nowrap hover:bg-red-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-black text-xl mb-2">
                  GLOBAL <span className="text-red-500">EYE</span> TODAY
                </h3>
                <p className="text-sm leading-relaxed">
                  Delivering accurate, timely, and independent news from around the world since 2020.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">Sections</h4>
                <ul className="space-y-1 text-sm">
                  {["World", "Technology", "Business", "Science", "Sports"].map((cat) => (
                    <li key={cat}>
                      <Link href={`/blog?category=${cat}`} className="hover:text-white transition-colors">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">About</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-xs text-center">
              © 2026 Global Eye Today. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
