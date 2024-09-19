'use client'
import { Hotel, Flower2, Utensils } from "lucide-react"
import Link from "next/link"
const Sidebar = () => {
    return (
        <>
            <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden ">
                <div className="flex items-center py-2">
                    <button type="button" className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none " aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar" aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                        <span className="sr-only">Toggle Navigation</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M15 3v18" /><path d="m8 9 3 3-3 3" /></svg>
                    </button>

                    <ol className="ms-3 flex items-center whitespace-nowrap">
                        <li className="flex items-center text-sm text-gray-800">
                            Application Layout
                            {/* <svg className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg> */}

                        </li>
                        {/* <li className="text-sm font-semibold  truncate" aria-current="page">
                            Dashboard
                        </li> */}
                    </ol>
                </div>
            </div>

            <div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  " role="dialog" tabIndex={-1} aria-label="Sidebar">
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="px-6 pt-4">
                        <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Preline">
                        </a>
                    </div>

                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                            <ul className="flex flex-col space-y-1">

                                <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" href="/about">
                                    <Hotel />
                                    Hotels
                                </Link></li>
                                <li><Link className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" href="/venue">
                                    <Hotel />
                                    Banquet
                                </Link></li>
                                <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" href="#">
                                    <Hotel />
                                    Boutique Hotels
                                </a></li>
                                <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" href="#">
                                    <Hotel />
                                    Resorts
                                </a></li>
                                <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" href="#">
                                    <Utensils />
                                    Restaurants
                                </a></li>
                                <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100" href="#">
                                    <Flower2 />
                                    Garden View
                                </a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            {/* <!-- Content --> */}
            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
                {/* <!-- your content goes here ... --> */}
                <h1>My content is here</h1>
            </div>
        </>
    )
}
export default Sidebar