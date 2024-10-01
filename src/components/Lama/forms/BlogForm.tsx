'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import InputField from '../InputField';
import TextField from '../TextField';

//! Validation 
const schema = z.object({
    title: z
        .string()
        .min(3, { message: "Blog Title must be at least 3 characters long!" }),
    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters long!" })
        .max(200, { message: "Description cannot be more than 200 characters long!" }),
    image: z
        .instanceof(File, { message: "Product Image is required" }),
    // authorId: session?.user.id
});

type Inputs = z.infer<typeof schema>

const BlogForm = ({ type, data }: { type: "create" | "update"; data?: any; }) => {

    const { data: session } = useSession()
    console.log(session)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        mode: "onChange",
        criteriaMode: "all",
    })

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 ">
                    Blog
                </h2>
                <p className="text-sm text-gray-600 ">
                    Share your experience with our Nimtoz users.
                </p>
            </div>
            <form className='overflow-y-auto' onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                    
                    <div className="sm:col-span-3">
                        <label className="inline-block text-sm text-gray-800 mt-2.5 ">
                            Blog Image
                        </label>
                    </div>

                    <div className="sm:col-span-9">
                        <div className="flex items-center gap-5">
                            <img className="inline-block size-16 rounded-full ring-2 ring-white " src="https://preline.co/assets/img/160x160/img1.jpg" alt="Avatar" />
                            <div className="flex gap-x-2">
                                <div>
                                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 ">
                                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <InputField
                        name="title"
                        label='Title'
                        type="string"
                        defaultValue={data?.title}
                        register={register}
                        error={errors?.title}
                        placeholder='Title of the Blog'
                    />

                    {/* <div className="sm:col-span-3">
                        <label htmlFor="af-account-bio" className="inline-block text-sm text-gray-800 mt-2.5 ">
                            Description
                        </label>
                    </div>

                    <div className="sm:col-span-9">
                        <textarea
                            id="af-account-bio description"
                            className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  "
                            rows={6}
                            placeholder="Type your message..."
                            {...register("description")}
                        ></textarea>
                    </div> */}

                    <TextField
                        name="description"
                        label="Description"
                        type="string"
                        defaultValue={data?.description}
                        register={register}
                        error={errors?.description}
                        placeholder='Description about the blog.'
                    />
                </div>

                <div className="mt-5 flex justify-end gap-x-2">
                    <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 ">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border ${!isValid ? "bg-gray-300 text-gray-500" : "bg-blue-600 text-white"
                            }`}
                    >
                        {type === "create" ? "Add" : "Update"}
                    </button>
                </div>
            </form>
        </>
    )
}
export default BlogForm