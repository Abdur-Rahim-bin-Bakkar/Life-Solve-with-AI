import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-sm font-bold text-white">LS</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">LifeSolve</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              A community-driven platform to share life problems, get AI-powered solutions, and connect with people who care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/" className="text-sm text-slate-500 hover:text-indigo-600">Home</Link></li>
              <li><Link href="/problems" className="text-sm text-slate-500 hover:text-indigo-600">Problems</Link></li>
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-indigo-600">About</Link></li>
              <li><Link href="/connect" className="text-sm text-slate-500 hover:text-indigo-600">Connect</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-slate-500">Mental Health</span></li>
              <li><span className="text-sm text-slate-500">Financial</span></li>
              <li><span className="text-sm text-slate-500">Career</span></li>
              <li><span className="text-sm text-slate-500">Relationships</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Contact</h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@lifesolve.app
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                San Francisco, CA
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} LifeSolve. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
