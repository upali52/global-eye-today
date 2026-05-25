"use client"

import { useState } from "react"
import Image from "next/image"

export default function SubscribeModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("https://formspree.io/f/xkgwojbq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, _subject: "New subscriber — Global Eye Today" }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
      {/* Subscribe button */}
      <button
        onClick={() => { setOpen(true); setStatus("idle") }}
        className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
      >
        Subscribe
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            {/* Header */}
            <div className="bg-gray-900 p-6 relative">
              <div className="absolute right-4 top-4 opacity-10">
                <svg width="60" height="60" viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="2">
                  <path d="M4 32 C14 10 50 10 60 32 C50 54 14 54 4 32Z"/>
                  <circle cx="32" cy="32" r="16"/>
                  <ellipse cx="32" cy="32" rx="8" ry="16"/>
                  <line x1="16" y1="32" x2="48" y2="32"/>
                  <circle cx="32" cy="32" r="5" fill="white"/>
                </svg>
              </div>
              <Image src="/logo.svg" alt="Global Eye Today" width={160} height={36} className="h-8 w-auto brightness-0 invert mb-3" />
              <p className="text-gray-300 text-sm">Get the latest world news delivered to your inbox — free.</p>
            </div>

            {/* Form */}
            <div className="p-6">
              {status === "success" ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">You&apos;re subscribed! 🎉</h3>
                  <p className="text-gray-500 text-sm mb-5">Thank you for subscribing to Global Eye Today. You&apos;ll receive the latest news updates soon.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-red-600 text-white font-bold px-6 py-2 rounded-full hover:bg-red-700 transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 text-xs">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-red-600 text-white font-bold py-3 rounded-full hover:bg-red-700 transition-colors text-sm disabled:opacity-60"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe — It's Free"}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>

            {/* Close button */}
            {status !== "success" && (
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
