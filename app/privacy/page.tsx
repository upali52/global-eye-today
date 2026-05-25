export const metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-10 rounded bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tight">Privacy Policy</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 25, 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        {[
          {
            title: "1. Information We Collect",
            body: "When you subscribe to Global Eye Today, we collect your name and email address. We also collect standard website usage data such as browser type, pages visited, and time spent on the site through anonymous analytics."
          },
          {
            title: "2. How We Use Your Information",
            body: "We use your email address to send you news updates and newsletters that you have subscribed to. We do not sell, rent, or share your personal information with third parties for marketing purposes."
          },
          {
            title: "3. Cookies",
            body: "Our website uses cookies to improve your browsing experience. These are small text files stored on your device. You can disable cookies in your browser settings, though some features of the site may not function properly."
          },
          {
            title: "4. Third-Party Services",
            body: "We use NewsAPI to display news content and Formspree to process form submissions. These services have their own privacy policies. News content is sourced from publicly available news APIs and links to original sources."
          },
          {
            title: "5. Data Security",
            body: "We take reasonable measures to protect your personal information. Our website uses HTTPS encryption for all connections. However, no method of transmission over the internet is 100% secure."
          },
          {
            title: "6. Your Rights",
            body: "You have the right to access, update, or delete your personal information at any time. You may unsubscribe from our newsletter at any time by clicking the unsubscribe link in any email or by contacting us directly."
          },
          {
            title: "7. Contact",
            body: "If you have any questions about this Privacy Policy, please contact us at editor@globleeyetoday.com."
          },
        ].map((section) => (
          <div key={section.title}>
            <h2 className="font-black text-gray-900 text-lg mb-2">{section.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
