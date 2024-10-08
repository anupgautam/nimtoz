import Image from "next/image";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
                <div className="space-y-6 py-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        {/*//! Left Side  */}
                        <div className="flex flex-col items-start justify-start gap-5 ml-20">
                            {/* <Image alt = "Nimtoz" src={}/> */}
                            <p className="text-[#00002A] text-xl font-medium">Booking for All Events.</p>


                            <ul className="flex gap-4">
                                <li>
                                    <a target="_blank" href="https://www.facebook.com/profile.php?id=61565185001541&mibextid=ZbWKwL" rel="noreferrer" className="text-gray-800 transition hover:text-blue-600">
                                        <span className="sr-only">Facebook</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" /></svg>

                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://www.instagram.com/bookvenuenepal/" rel="noreferrer" className="text-gray-800 hover:text-red-700">
                                        <span className="sr-only">Instagram</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" /></svg>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://www.linkedin.com/company/91116558/admin/feed/posts/" rel="noreferrer" className="text-gray-800 hover:text-blue-500">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" /></svg>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://www.youtube.com/channel/UCxG4UnaC8cl7AgF1g9lJPiA" rel="noreferrer" className="text-gray-800 hover:text-red-600">
                                        <span className="sr-only">Youtube</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" /></svg>
                                    </a>
                                </li>
                            </ul>
                            <p className="text-xs text-gray-500">© {year}. Nimtoz. All rights reserved.</p>
                        </div>

                        {/*//! Right  */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            <div>
                                <p className="font-medium text-gray-900">Company</p>
                                <ul className="mt-4 lg:mt-6 space-y-2 lg:space-y-4 text-sm">
                                    <li>
                                        <a className="text-gray-700 transition hover:text-[#fe384e]" href="/aboutus">About Us</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-700 transition hover:text-[#fe384e]" href="/aboutus#mission">Mission</a>
                                    </li>
                                    <li>
                                        <a className="text-gray-700 transition hover:text-[#fe384e]" href="/aboutus#visionandgoals">Vision and Goals</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Contact Us</p>
                                <ul className="mt-4 lg:mt-6 space-y-2 lg:space-y-4 text-sm">
                                    <li>
                                        <a target="_blank" className="flex items-center text-gray-700 transition hover:text-[#fe384e]" href="https://maps.app.goo.gl/NYFWZWu4AwPbWUrv5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                            </svg>

                                            <span className="ml-2">Kuleshwor - 14, Kathmandu, Nepal</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="flex flex-col">
                                            <p className="flex items-center text-gray-700 transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                                                </svg>

                                                <span className="ml-2">
                                                    <a target="_blank" className="hover:text-[#fe384e]" href="tel:9802121033">+977-9802121033,</a>
                                                    <a target="_blank" className="hover:text-[#fe384e]" href="tel:9849623247">+977-9849623247</a>
                                                </span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-col">
                                            <p className="flex items-center text-gray-700 transition">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" /></svg>
                                                <span className="ml-2">
                                                    <a target="_blank" className="hover:text-[#fe384e]" href="https://wa.me/9779802121033">+977-9802121033,</a>
                                                    <a target="_blank" className="hover:text-[#fe384e]" href="https://wa.me/9849623247">+977-9849623247</a></span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <a target="_blank" className="flex items-center text-gray-700 transition hover:text-[#fe384e]" href="mailto:bookvenuenepal@gmail.com">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>

                                            <span className="ml-2">bookvenuenepal@gmail.com</span>
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

export default Footer