import Image from "next/image";

const AboutNImto = () => {
    return (
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-10 mt-20">
            <div className="py-10">
                {/* About Section */}
                <div className="mb-10" id="aboutus">
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold text-[#00002a] mb-2">
                                About <span className="text-orange-500 ">Nimtoz</span>
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                                Welcome to NIMTOZ Sewa Pvt. LTD., your one-stop solution for turning dream events into reality. Need a photographer, videographer, musical instrumental services, catering, solo/group performer, decorator, event manager or a stunning venue? We've got it all! Our platform connects you directly with trusted vendors, allowing you to compare prices and book instantly—all without the hassle of back-and-forth communication.
                            </p>
                            <p className="text-gray-700 leading-relaxed text-justify">
                                With just a few clicks, you can lock in top-notch services like photography, videography, live entertainment, event management, and much more. For vendors, we simplify everything—no more repeating the same details to every customer. At NIMTOZ Sewa, we believe planning a memorable event should be fun, simple, and stress-free. Explore, book, and enjoy—your perfect event is just a click away!
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            {/* Illustration for About */}
                            {/* <img src="/aboutus.svg" alt="About Illustration" className="w-64 h-64 object-contain" /> */}
                            <Image src="/aboutus.svg" alt="About Us Image" className="w-84 h-84 object-contain" height="800" width="800" />
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="mb-10" id="mission">
                    <div className="flex flex-col md:flex-row-reverse items-start md:items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold text-orange-500  mb-2">Mission</h2>
                            <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                                To simplify the event planning process by connecting users with trusted vendors, providing a seamless platform for comparing prices and booking high-quality services, ensuring a stress-free experience for both customers and service providers.
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            {/* Illustration for Mission */}
                            {/* <img src="/path/to/mission-illustration.png" alt="Mission Illustration" className="w-64 h-64 object-contain" /> */}
                            <Image src="/mission.svg" alt="About Us Image" className="w-84 h-84 object-contain" height="400" width="400" />
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div id="visionandgoals">
                    <div className="mb-10 flex flex-col md:flex-row items-start md:items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold text-orange-500 mb-2">Vision</h2>
                            <p className="mb-10 text-justify">
                                To be the leading platform for event services in Nepal, where every user can effortlessly bring their dream events to life while empowering vendors with streamlined communication and opportunities for growth.
                            </p>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            {/* Illustration for Vision */}
                            {/* <img src="/path/to/vision-illustration.png" alt="Vision Illustration" className="w-64 h-64 object-contain" /> */}
                            <Image src="/vision.svg" alt="About Us Image" className="w-84 h-84 object-contain" height="400" width="400" />
                        </div>
                    </div>

                    {/* Goals Section */}
                    <div className="flex flex-col md:flex-row-reverse items-start md:items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-2xl font-bold text-orange-500  mb-2">Goals</h2>
                            <ul className="list-none list-inside space-y-2 text-gray-700 text-justify">
                                <li>
                                    <strong>Enhance User Experience</strong>
                                    <br /> Continuously improve the platform's usability and service offerings to ensure a user-friendly experience for customers.
                                </li>
                                <li>
                                    <strong>Build a Strong Vendor Networks</strong>
                                    <br /> Establish and maintain partnerships with reliable and verified vendors across various service categories to ensure quality and trustworthiness.
                                </li>
                                <li>
                                    <strong>Increase Market Reach</strong>
                                    <br /> Expand NIMTOZ Sewa’s presence throughout Nepal, reaching diverse markets and demographics to cater to a wider audience.
                                </li>
                                <li>
                                    <strong>Promote Event Management Education</strong>
                                    <br /> Provide resources and support to both users and vendors to enhance event planning knowledge and skills, ensuring successful events.
                                </li>
                                <li>
                                    <strong>Achieve Customer Satisfaction</strong>
                                    <br /> Strive for high customer satisfaction rates by delivering exceptional service and prompt support, fostering long-term relationships.
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            {/* Illustration for Goals */}
                            {/* <img src="/path/to/goals-illustration.png" alt="Goals Illustration" className="w-64 h-64 object-contain" /> */}
                            <Image src="/goals.svg" alt="About Us Image" className="w-128 h-128 object-contain" height="800" width="800" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutNImto;
