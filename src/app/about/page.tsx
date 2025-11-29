import { JSX } from "react"
import Link from 'next/link'

export default function aboutCompany(): JSX.Element {
    return (
        <div>
            <div>
                <div className="bg-white dark:bg-gray-900">
                    <div className="relative isolate px-6 lg:px-8">
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        >
                            <div
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                                className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                            />
                        </div>
                        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-42">
                            <div className="text-center mb-16">
                                <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">
                                    About News Wallah
                                </h1>
                                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
                                    Your trusted destination for real-time news and curated stories from around the world.
                                </p>
                            </div>

                            <div className="mt-16 space-y-12">
                                <div className="rounded-2xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 dark:ring-white/5 p-8 sm:p-12">
                                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                                        Our Story
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                        News Wallah was founded on <span className="font-semibold text-indigo-600 dark:text-indigo-400">November 15, 2025</span> with a mission to deliver reliable, real-time news updates to readers worldwide. Built with modern web technologies including Next.js, TypeScript, and Tailwind CSS, News Wallah combines cutting-edge development practices with intuitive user experience to bring you the stories that matter most.
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-linear-to-br from-indigo-50/40 to-purple-50/40 dark:from-gray-900/40 dark:to-gray-800/40 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 dark:ring-white/5 p-8 sm:p-12">
                                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                                        Meet the Founder
                                    </h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                                                Sarthak Chauhan
                                            </h3>
                                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                                Full-stack developer and the creator of News Wallah. Currently working at Physics Wallah in Bangalore, Sarthak is passionate about building scalable web applications that solve real-world problems.
                                            </p>
                                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                                With expertise spanning modern web frameworks, systems programming in Rust, and game development, Sarthak brings diverse technical knowledge to create innovative solutions.
                                            </p>
                                        </div>

                                        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl p-6 mt-6 ring-1 ring-gray-200/50 dark:ring-white/10">
                                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                                <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                </svg>
                                                Education
                                            </h4>
                                            <div className="text-gray-700 dark:text-gray-300">
                                                <p className="font-semibold text-lg">BCA (Hons.) in Cyber Security</p>
                                                <p className="text-gray-600 dark:text-gray-400">Lovely Professional University</p>
                                                <p className="text-gray-500 dark:text-gray-500 text-sm">Phagwara, Punjab</p>
                                            </div>
                                        </div>

                                        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl p-6 mt-6 ring-1 ring-gray-200/50 dark:ring-white/10">
                                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                                <svg className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                                Professional Certifications
                                            </h4>
                                            <div className="space-y-3">
                                                <div className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                                                    <p className="font-semibold text-gray-900 dark:text-white">CompTIA Security+</p>
                                                </div>
                                                <div className="border-l-4 border-indigo-600 dark:border-indigo-400 pl-4">
                                                    <p className="font-semibold text-gray-900 dark:text-white">CompTIA Network+</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                                Technical Expertise
                                            </h4>

                                            <div className="mb-6">
                                                <h5 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wide">Web Development</h5>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Next.js</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">TypeScript</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">React</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tailwind CSS</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Node.js</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rust</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <h5 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wide">Additional Skills</h5>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">System Administration(Linux+)</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Game Development</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Systems Programming</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">AWS</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Jenkins</span>
                                                    </div>
                                                    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-lg px-4 py-3 text-center ring-1 ring-gray-200/50 dark:ring-white/10">
                                                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kubernates</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                                Connect With Me
                                            </h4>
                                            <div className="flex flex-wrap gap-4">
                                                <Link
                                                    href="https://github.com/your-github"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                    </svg>
                                                    GitHub
                                                </Link>
                                                <Link
                                                    href="https://linkedin.com/in/your-linkedin"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                    LinkedIn
                                                </Link>
                                                <Link
                                                    href="https://twitter.com/your-twitter"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-lg hover:bg-sky-600 transition-colors font-medium"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                    </svg>
                                                    Twitter
                                                </Link>
                                                <Link
                                                    href="https://instagram.com/your-instagram"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity font-medium"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                                    </svg>
                                                    Instagram
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-16 text-center">
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Start Reading Today
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Join thousands of readers who trust News Wallah for their daily dose of news and insights.
                                </p>
                                <div className="flex items-center justify-center gap-x-6">
                                    <Link
                                        href="/general"
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                                    >
                                        Browse News
                                    </Link>
                                    <Link
                                        href="/newsContent"
                                        className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
                                    >
                                        Learn more <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div
                            aria-hidden="true"
                            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        >
                            <div
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                                className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
