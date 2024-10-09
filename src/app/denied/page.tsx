import Image from "next/image";
import Link from "next/link";

const DeniedPage = () => {
    const date = new Date()
    const year = date.getFullYear();
    return (
        <div>

            <div className="max-w-[50rem] flex flex-col mx-auto size-full">
                <header className="mb-auto flex justify-center z-50 w-full py-2">
                    <nav className="px-4 sm:px-6 lg:px-8">
                        <a className="flex-none text-xl font-semibold sm:text-3xl " href="#" aria-label="Brand">Nimtoz</a>
                    </nav>
                </header>

                <main id="content">
                    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center"> {/* Center the image container */}
                            <Image src="/401.svg" alt="401" height={500} width={500} /> {/* Increased size */}
                        </div>
                        <p className="mt-3 text-gray-600">Access Denied</p>
                        <p className="text-gray-600">
                            You are logged in, but you do not have the required access level to view this page..
                        </p>
                        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
                            <Link
                                className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none"
                                href="/"
                            >
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </main>


                <footer className="mt-auto text-center py-5">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-500">© All Rights Reserved. {year}.</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default DeniedPage