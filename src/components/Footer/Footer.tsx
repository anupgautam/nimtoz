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
                                    <a target="_blank" href="https://www.facebook.com/profile.php?id=61559957870032" rel="noreferrer" className="text-gray-800 transition hover:text-blue-600">
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
                                            <span className="font-bold">
                                                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationOnIcon">
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"></path></svg></span>
                                            <span className="ml-2">Kuleshwor - 14, Kathmandu, Nepal</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div className="flex flex-col">
                                            <p className="flex items-center text-gray-700 transition">
                                                <span className="font-bold">
                                                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PhoneIcon">
                                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02z"></path></svg>
                                                </span>
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
                                                <span className="font-bold">
                                                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="WhatsAppIcon">
                                                        <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z">
                                                        </path>
                                                    </svg>
                                                </span>
                                                <span className="ml-2">
                                                    <a target="_blank" className="hover:text-[#fe384e]" href="https://wa.me/9779802121033">+977-9802121033,</a>
                                                    <a target="_blank" className="hover:text-[#fe384e]" href="https://wa.me/9849623247">+977-9849623247</a></span>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <a target="_blank" className="flex items-center text-gray-700 transition hover:text-[#fe384e]" href="mailto:bookvenuenepal@gmail.com">
                                            <span className="font-bold">
                                                <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EmailIcon">
                                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z">
                                                        z
                                                    </path>
                                                </svg>
                                            </span>
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