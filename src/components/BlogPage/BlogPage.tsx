
const BlogPage = () => {

    return (
        <div className="max-w-[85rem] mt-4 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <button>Add blog</button>
            <div className="grid lg:grid-cols-2 gap-6">
                <a className="group sm:flex rounded-xl focus:outline-none" href="#">
                    <div className="shrink-0 relative rounded-xl overflow-hidden h-[200px] sm:w-[250px] sm:h-[350px] w-full">
                        <img className="size-full absolute top-0 start-0 object-cover" src="https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
                    </div>

                    <div className="grow">
                        <div className="p-4 flex flex-col h-full sm:p-6">
                            <div className="mb-3">
                                <p className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 ">
                                    Business
                                </p>
                            </div>
                            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 group-focus:text-blue-600 ">
                                Preline becomes an official Instagram Marketing Partner
                            </h3>
                            <p className="mt-2 text-gray-600 ">
                                Great news we're eager to share.
                            </p>

                            <div className="mt-5 sm:mt-auto">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <img className="size-[46px] rounded-full" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                                    </div>
                                    <div className="ms-2.5 sm:ms-4">
                                        <h4 className="font-semibold text-gray-800 ">
                                            Aaron Larsson
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            Feb 15, 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>

                <a className="group sm:flex rounded-xl focus:outline-none" href="#">
                    <div className="shrink-0 relative rounded-xl overflow-hidden h-[200px] sm:w-[250px] sm:h-[350px] w-full">
                        <img className="size-full absolute top-0 start-0 object-cover" src="https://images.unsplash.com/photo-1669824774762-65ddf29bee56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Blog Image" />
                    </div>
                    <div className="grow">
                        <div className="p-4 flex flex-col h-full sm:p-6">
                            <div className="mb-3">
                                <p className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 ">
                                    Announcements
                                </p>
                            </div>
                            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 group-hover:text-blue-600 group-focus:text-blue-600 ">
                                Announcing a free plan for small teams
                            </h3>
                            <p className="mt-2 text-gray-600 ">
                                At Wake, our mission has always been focused on bringing openness.
                            </p>

                            <div className="mt-5 sm:mt-auto">
                                <div className="flex items-center">
                                    <div className="shrink-0">
                                        <img className="size-[46px] rounded-full" src="https://images.unsplash.com/photo-1669720229052-89cda125fc3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" alt="Avatar" />
                                    </div>
                                    <div className="ms-2.5 sm:ms-4">
                                        <h4 className="font-semibold text-gray-800 ">
                                            Hanna Wolfe
                                        </h4>
                                        <p className="text-xs text-gray-500">
                                            Feb 4, 2021
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
export default BlogPage