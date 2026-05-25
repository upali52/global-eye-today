export const metadata = { title: "Contact Us" }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-10 rounded bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tight">Contact Us</h1>
      </div>

      <p className="text-gray-600 leading-relaxed mb-8">
        Have a news tip, feedback, or press inquiry? We&apos;d love to hear from you.
        Reach out to the Global Eye Today team using any of the methods below.
      </p>

      {/* Contact cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {[
          { label: "Editor-in-Chief", value: "editor@globleeyetoday.com", icon: "📧", desc: "Editorial inquiries & news tips" },
          { label: "General Contact", value: "contact@globleeyetoday.com", icon: "✉️", desc: "General questions & feedback" },
        ].map((item) => (
          <div key={item.label} className="p-5 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-2xl mb-3 block">{item.icon}</span>
            <p className="font-black text-gray-900 text-sm">{item.label}</p>
            <a href={`mailto:${item.value}`} className="text-red-600 font-semibold text-sm hover:underline">
              {item.value}
            </a>
            <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-black mb-5">Send us a Message</h2>
        <form action="https://formspree.io/f/xkgwojbq" method="POST" className="space-y-4">
          <input type="hidden" name="_subject" value="Contact form — Global Eye Today" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Name</label>
              <input name="name" type="text" required placeholder="Your full name"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email</label>
              <input name="email" type="email" required placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Subject</label>
            <input name="subject" type="text" required placeholder="What is this about?"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Message</label>
            <textarea name="message" required rows={5} placeholder="Your message..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none" />
          </div>
          <button type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-full hover:bg-red-700 transition-colors text-sm">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
