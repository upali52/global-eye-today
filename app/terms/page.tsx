export const metadata = { title: "Terms of Service" }

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-10 rounded bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tight">Terms of Service</h1>
      </div>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 25, 2026</p>

      <div className="space-y-8">
        {[
          {
            title: "1. Acceptance of Terms",
            body: "By accessing and using globleeyetoday.com, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website."
          },
          {
            title: "2. Use of Content",
            body: "All content published on Global Eye Today, including articles, logos, and graphics, is the property of Global Eye Today or its content providers. News articles link to and source from their original publishers. You may share our content with proper attribution and a link back to the original article."
          },
          {
            title: "3. News Content",
            body: "Global Eye Today aggregates news from third-party sources. We are not responsible for the accuracy, completeness, or reliability of third-party content. External news stories are provided for informational purposes only."
          },
          {
            title: "4. User Conduct",
            body: "You agree not to misuse this website, attempt to gain unauthorised access, or use it for any unlawful purpose. You must not transmit any harmful, offensive, or disruptive content through any forms or contact methods on this site."
          },
          {
            title: "5. Newsletter Subscription",
            body: "By subscribing to our newsletter, you consent to receive email communications from Global Eye Today. You may unsubscribe at any time. We will not use your email for any purpose other than delivering news updates."
          },
          {
            title: "6. Disclaimer",
            body: "Global Eye Today provides news and information for general informational purposes only. Nothing on this site constitutes professional, legal, financial, or medical advice. We make no warranties about the completeness or accuracy of the information."
          },
          {
            title: "7. Changes to Terms",
            body: "We reserve the right to update these Terms of Service at any time. Continued use of the website after changes are made constitutes acceptance of the new terms."
          },
          {
            title: "8. Contact",
            body: "For questions about these Terms of Service, please contact us at editor@globleeyetoday.com."
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
