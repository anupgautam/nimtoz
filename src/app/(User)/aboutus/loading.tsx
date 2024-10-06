import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AboutUsLoading = () => {
    return (
        <>
            {/* <div className="pt-20" >
                <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
                    <div className="max-w-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                <div className="shrink-0">
                                    <img className="size-12 rounded-full" src="https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                                </div>

                                <div className="grow">
                                    <div className="flex justify-between items-center gap-x-2">
                                        <div>
                                            <div className="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                                                <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                                                    <span className="font-semibold text-gray-800 ">
                                                        <Skeleton />
                                                    </span>

                                                    <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 max-w-xs cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl  " role="tooltip">
                                                        <div className="p-4 sm:p-5">
                                                            <div className="mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3">
                                                                <div className="shrink-0">
                                                                    <Image
                                                                        className="size-8 rounded-full"
                                                                        alt="Avatar"
                                                                        src={RegisterPassword}
                                                                        height={400}
                                                                        width={600}
                                                                    />
                                                                </div>

                                                                <div className="grow">
                                                                    <p className="text-lg font-semibold text-gray-200 ">
                                                                        <Skeleton />
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-400 dark:text-neutral-400">
                                                                <Skeleton count={10} />
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between items-center px-4 py-3 sm:px-5">
                                                            <ul className="text-xs space-x-3">
                                                                <li className="inline-block">
                                                                    <span className="font-semibold text-gray-200 "><Skeleton /></span>
                                                                    <span className="text-gray-400 dark:text-neutral-400"><Skeleton /></span>
                                                                </li>
                                                                <li className="inline-block">
                                                                    <span className="font-semibold text-gray-200 "><Skeleton /></span>
                                                                    <span className="text-gray-400 dark:text-neutral-400"><Skeleton /></span>
                                                                </li>
                                                            </ul>

                                                            <div>
                                                                <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                                                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                                                    </svg>
                                                                    <Skeleton />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <ul className="text-xs text-gray-500 ">
                                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                                    <Skeleton />
                                                </li>
                                                <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full ">
                                                    <Skeleton />
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <button type="button" className="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ">
                                                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                                </svg>
                                                <Skeleton />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5 md:space-y-8">
                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold md:text-3xl "><Skeleton /></h2>

                                <p className="text-lg text-gray-800 "><Skeleton count={5} /></p>
                            </div>

                            <p className="text-lg text-gray-800 "><Skeleton count={3} /></p>

                            <figure>
                                <img className="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
                                <figcaption className="mt-3 text-sm text-center text-gray-500 ">
                                    <Skeleton />
                                </figcaption>
                            </figure>

                            <p className="text-lg text-gray-800 "><Skeleton count={10} /></p>

                            <p className="text-lg text-gray-800 "><Skeleton /> <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium " href="#"><Skeleton /></a><Skeleton count={3} /></p>

                            <blockquote className="text-center p-4 sm:px-7">
                                <p className="text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal ">
                                    <Skeleton count={3} />
                                </p>
                                <p className="mt-5 text-gray-800 ">
                                    <Skeleton />
                                </p>
                            </blockquote>

                            <figure>
                                <img className="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1670272498380-eb330b61f3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
                                <figcaption className="mt-3 text-sm text-center text-gray-500 ">
                                    <Skeleton />
                                </figcaption>
                            </figure>

                            <div className="space-y-3">
                                <h3 className="text-2xl font-semibold "><Skeleton /></h3>

                                <p className="text-lg text-gray-800 "><Skeleton count={10} /></p>
                            </div>

                            <ul className="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 ">
                                <li className="ps-2"><Skeleton count={3} />" <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium " href="#"><Skeleton /></a> <Skeleton /></li>
                                <li className="ps-2"><Skeleton count={2} /><a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium " href="#"><Skeleton /></a>.</li>
                            </ul>

                            <p className="text-lg text-gray-800 "><Skeleton count={10} /></p>

                            <div>
                                <a className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                                    <Skeleton />
                                </a>
                                <a className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                                    <Skeleton />
                                </a>
                                <a className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                                    <Skeleton />
                                </a>
                                <a className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200" href="#">
                                    <Skeleton />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div>
                <p>About Us</p>
                <ul className='list-disc pl-6 mt-4 space-y-2'>
                    {[...Array(20).keys()].map((i) => (
                        <li key={i}>
                            <span className='inline-block h-5 animate-pulse'
                                style={{
                                    animationDelay: `${i * 0.05}s`,
                                    animationDuration: "1s"
                                }}>

                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default AboutUsLoading