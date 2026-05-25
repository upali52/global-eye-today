export const metadata = { title: "Careers" }

export default function CareersPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-2 h-10 rounded bg-red-600" />
        <h1 className="text-3xl font-black uppercase tracking-tight">Careers</h1>
      </div>

      <div className="bg-gray-900 text-white rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-black text-red-400 mb-3">Join Our Team</h2>
        <p className="text-gray-300 leading-relaxed">
          Global Eye Today is always looking for talented journalists, editors, and digital media
          professionals who are passionate about delivering accurate, independent news to readers worldwide.
        </p>
      </div>

      {/* Open roles */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1 h-6 rounded bg-red-600 block" />
          <h2 className="text-lg font-black uppercase tracking-widest text-gray-700">Open Positions</h2>
        </div>
        <div className="space-y-4">
          {[
            { title: "News Reporter", type: "Part-time / Remote", desc: "Cover breaking news across World, Technology, and Business categories." },
            { title: "Social Media Editor", type: "Part-time / Remote", desc: "Manage and grow our social media presence across platforms." },
            { title: "Freelance Correspondent", type: "Freelance", desc: "Contribute articles and reports from your region or area of expertise." },
          ].map((job) => (
            <div key={job.title} className="p-5 rounded-xl border border-gray-200 hover:border-red-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-black text-gray-900">{job.title}</h3>
                  <p className="text-xs text-red-600 font-bold mb-2">{job.type}</p>
                  <p className="text-sm text-gray-600">{job.desc}</p>
                </div>
                <a href="mailto:editor@globleeyetoday.com?subject=Application"
                  className="flex-shrink-0 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
        <p className="text-gray-700 text-sm mb-3">
          Don&apos;t see your role? Send us your CV anyway — we&apos;re always open to talented people.
        </p>
        <a href="mailto:editor@globleeyetoday.com?subject=General Application"
          className="inline-block bg-red-600 text-white font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors text-sm">
          Send Your CV
        </a>
      </div>
    </div>
  )
}
