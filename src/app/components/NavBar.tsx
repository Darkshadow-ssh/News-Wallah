"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

const solutions = [
  {
    name: 'Technology',
    description: 'Latest tech innovations, AI breakthroughs, and digital trends',
    href: '/technology',
    icon: ChartPieIcon
  },
  {
    name: 'Business',
    description: 'Markets, economy, startups, and corporate news',
    href: '/business',
    icon: CursorArrowRaysIcon
  },
  {
    name: 'Health',
    description: 'Medical discoveries, wellness tips, and healthcare updates',
    href: '/health',
    icon: FingerPrintIcon
  },
  {
    name: 'Science',
    description: 'Research breakthroughs, space exploration, and discoveries',
    href: '/science',
    icon: SquaresPlusIcon
  },
  {
    name: 'Sports',
    description: 'Live scores, match highlights, and athlete stories',
    href: '/sports',
    icon: ArrowPathIcon
  },
]

const callsToAction = [
  {
    name: 'Breaking News',
    href: '/general',
    icon: PlayCircleIcon
  },
  {
    name: 'Newsletter',
    href: '/auth/login',
    icon: PhoneIcon
  },
]

const navigation = [
  { name: 'Trending', href: '/general' },
  { name: 'Latest Stories', href: '/business' },
  { name: 'Company', href: '/about' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const sessionData = useSession();
  const session = sessionData.data;
  const status = sessionData.status;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/general?q=${encodeURIComponent(search)}`);
      setMobileMenuOpen(false);
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">News Wallah</span>
            <Image
              alt="News Wallah Logo"
              src="/logo_dark.png"
              className="hidden dark:block"
              width={100}
              height={100}
            />
            <Image
              alt="News Wallah Logo"
              src="/logo_white.png"
              className="block dark:hidden"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-200 dark:hover:bg-gray-800">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400 outline-none">
              <span>Categories</span>
              <ChevronDownIcon aria-hidden="true" className="size-5" />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-gray-900/40 backdrop-blur-xl shadow-2xl ring-1 ring-white/5">

                <div className="p-5">
                  {solutions.map((item) => (
                    <div key={item.name} className="group relative flex items-center gap-x-4 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-100 dark:bg-indigo-900/20 dark:group-hover:bg-indigo-900/30 transition-colors">
                        <item.icon aria-hidden="true" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 px-5 py-4 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-x-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 transition-colors"
                      >
                        <item.icon aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm leading-6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <form className="relative" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                name="query"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </form>
          {status === "loading" ? (
            <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
          ) : session?.user ? (
            <Popover className="relative">
              <PopoverButton className="inline-flex items-center gap-x-2 text-sm leading-6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400 outline-none">
                <UserCircleIcon className="h-6 w-6" />
                <span className="max-w-[120px] truncate">{session.user.name || session.user.email}</span>
                <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="p-2">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-700 transition-colors mt-1"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    Sign out
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm leading-6 font-semibold text-gray-900 hover:text-indigo-600 transition-colors dark:text-white dark:hover:text-indigo-400"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">News Wallah</span>
              <Image
                alt="News Wallah Logo"
                src="/logo_dark.png"
                className="hidden dark:block"
                width={100}
                height={100}
              />
              <Image
                alt="News Wallah Logo"
                src="/logo_white.png"
                className="block dark:hidden"
                width={100}
                height={100}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">

              <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <button
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors dark:text-white dark:hover:bg-white/5"
                  >
                    <span>Categories</span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className={`h-5 w-5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {categoriesOpen && (
                    <div className="mt-2 space-y-2">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-x-3 rounded-lg px-3 py-3 text-sm leading-6 text-gray-700 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:bg-white/5 ml-3"
                        >
                          <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors dark:text-white dark:hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-6 space-y-4">
                <form
                  className="-mx-3"
                  onSubmit={handleSubmit}
                >
                  <div className="relative px-3">
                    <input
                      type="text"
                      name="query"
                      placeholder="Search news..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </form>


                <div className="-mx-3 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors dark:text-white dark:hover:bg-white/5"
                    >
                      <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      {item.name}
                    </Link>
                  ))}
                </div>
                {status === "loading" ? (
                  <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-gray-500 dark:text-gray-400">
                    Loading...
                  </div>
                ) : session?.user ? (
                  <>
                    <div className="-mx-3 rounded-lg px-3 py-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="-mx-3 flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors dark:text-white dark:hover:bg-white/5"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors dark:text-white dark:hover:bg-white/5"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
