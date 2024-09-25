import ImageCarousel from "../Carousel/ImageCarousel"

const ProductDetailPage = () => {
    return (
        <>
            {/* <ImageCarousel /> */}


            {/* <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
                    <div>
                        <img className="rounded-xl" src="https://bookvenuenepal.com/_next/image?url=https%3A%2F%2Fapi.bookvenuenepal.com%2Fmedia%2Fvenue_images%2F8c80e3cf-599d-4c81-982f-082526eef253.jpg&w=1920&q=75" alt="Features Image" />
                    </div>

                    <div className="mt-5 sm:mt-10 lg:mt-0">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-2 md:space-y-4">
                                <h2 className="font-bold text-1xl lg:text-2xl text-gray-800 dark:text-neutral-200">
                                    Park Village Resort
                                </h2>
                                <p className="text-gray-500 dark:text-neutral-500">
                                    Besides working with start-up enterprises as a partner for digitalization, we have built enterprise products for common pain points that we have encountered in various products and projects.
                                </p>
                            </div>

                            <ul className="space-y-2 sm:space-y-4">
                                <li className="flex gap-x-3">
                                    <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <div className="grow">
                                        <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                                            <span className="font-bold">Easy & fast</span> designing
                                        </span>
                                    </div>
                                </li>

                                <li className="flex gap-x-3">
                                    <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <div className="grow">
                                        <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                                            Powerful <span className="font-bold">features</span>
                                        </span>
                                    </div>
                                </li>

                                <li className="flex gap-x-3">
                                    <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    <div className="grow">
                                        <span className="text-sm sm:text-base text-gray-500 dark:text-neutral-500">
                                            User Experience Design
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* //! Images wala section */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex flex-col lg:flex-row">
                    {/* Main Image */}
                    <div className="lg:w-1/2">
                        <img
                            className="rounded-xl w-full h-[26rem] object-cover"
                            src="https://bookvenuenepal.com/_next/image?url=https%3A%2F%2Fapi.bookvenuenepal.com%2Fmedia%2Fvenue_images%2F8c80e3cf-599d-4c81-982f-082526eef253.jpg&w=1920&q=75"
                            alt="Features Image"
                        />
                    </div>

                    {/* Smaller Images */}
                    <div className="lg:w-1/2 lg:pl-10 flex flex-col lg:flex-row lg:justify-between">
                        <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-0">
                            <img
                                className="w-full h-48 object-cover rounded-lg"
                                src="https://bookvenuenepal.com/_next/image?url=https%3A%2F%2Fapi.bookvenuenepal.com%2Fmedia%2Fvenue_images%2F22c162e2-7995-42e1-abb7-55bfbee7f3fa.jpg&w=640&q=75"
                                alt="Smaller Image 1"
                            />
                            <img
                                className="w-full h-48 object-cover rounded-lg"
                                src="https://bookvenuenepal.com/_next/image?url=https%3A%2F%2Fapi.bookvenuenepal.com%2Fmedia%2Fvenue_images%2Fda44ba02-f167-4df5-8881-53a82a77ebb4.jpg&w=640&q=75"
                                alt="Smaller Image 2"
                            />
                            <img
                                className="w-full h-48 object-cover rounded-lg"
                                src="https://bookvenuenepal.com/_next/image?url=https%3A%2F%2Fapi.bookvenuenepal.com%2Fmedia%2Fvenue_images%2F78ee4f28-40db-4698-a5f8-f9eafda269c2.jpg&w=640&q=75"
                                alt="Smaller Image 3"
                            />
                            <img
                                className="w-full h-48 object-cover rounded-lg"
                                src="https://bookvenuenepal.com/_next/image?url=https%3A%2F%2Fapi.bookvenuenepal.com%2Fmedia%2Fvenue_images%2Fa5e285a5-6d3c-409d-9fd6-e60fe16a2887.jpg&w=640&q=75"
                                alt="Smaller Image 4"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* //! Description section */}
            
        </>
    )
}
export default ProductDetailPage