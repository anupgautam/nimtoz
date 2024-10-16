import Image from "next/image";
import Link from "next/link";

const ChatFooter = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="bg-gray-50 mt-20">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                <div className="space-y-6 py-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        {/* Left Side */}
                        <div className="flex flex-col items-start justify-start gap-5 lg:ml-20 -mt-10">
                            <Link href="/" className="flex ms-2 md:me-24">
                                <Image src='/nimtoz_logo.png' alt="Logo" height="120" width="180" />
                            </Link>
                            <p className="text-[#00002A] text-xl font-medium">Smart Booking, Easy Living</p>

                            <ul className="flex gap-4">
                                <li>
                                    <Link target="_blank" href="https://www.facebook.com/profile.php?id=61565185001541&mibextid=ZbWKwL" rel="noreferrer" className="text-gray-800 transition hover:text-blue-600">
                                        <span className="sr-only">Facebook</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" /></svg>
                                    </Link>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-500">© {year}. Nimtoz. All rights reserved.</p>
                        </div>

                        {/* Right Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 -mt-20 lg:mt-0">
                            <div>
                                <p className="font-medium text-gray-900">Company</p>
                                <ul className="mt-4 lg:mt-6 space-y-2 lg:space-y-4 text-sm">
                                    <li>
                                        <a className="text-gray-700 transition hover:text-[#ff5a1f]" href="/aboutus">About Us</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-700 transition hover:text-[#ff5a1f]" href="/aboutus#mission">Mission</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-700 transition hover:text-[#ff5a1f]" href="/aboutus#visionandgoals">Vision and Goals</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Contact Us</p>
                                <ul className="mt-4 lg:mt-6 space-y-2 lg:space-y-4 text-sm">
                                    <li>
                                        <a target="_blank" className="flex items-center text-gray-700 transition hover:text-[#ff5a1f]" href="">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                            </svg>
                                            <span className="ml-2">Hetauda-16, Chisapani, Nepal</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a target="_blank" className="flex items-center text-gray-700 transition hover:text-[#ff5a1f]" href="mailto:bookvenuenepal@gmail.com">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>
                                            <span className="ml-2">nimtozsewa@gmail.com</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default ChatFooter;
