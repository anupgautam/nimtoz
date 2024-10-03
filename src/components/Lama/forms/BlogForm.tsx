'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import InputField from '../InputField';
import TextField from '../TextField';
import { blogSchema, BlogSchema } from '@/lib/formValidationSchemas';
import { useFormState } from 'react-dom';
import { createBlog, updateBlog } from '@/lib/actions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Upload } from 'lucide-react'

const BlogForm = ({
    type,
    data,
    setOpen
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {

    const { data: session } = useSession()
    const author_id = session?.user?.id ? parseInt(session.user.id) : null;

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<BlogSchema>({
        resolver: zodResolver(blogSchema),
        mode: "onChange",
        criteriaMode: "all",
    })

    const [img, setImg] = useState<any>(data?.image || null);
    const [state, formAction] = useFormState(type === "create" ? createBlog : updateBlog, {
        success: false,
        error: false
    })

    const onSubmit = handleSubmit((formData) => {
        formAction({
            ...formData,
            image: img?.secure_url || img, // Use uploaded image or existing one
            authorId: author_id ?? undefined,
        });
    });

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(`Blog ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh()
        }
    }, [state])

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

                    {/* <div className="sm:col-span-3">
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
                    </div> */}

                    <CldUploadWidget
                        uploadPreset="NextJS_Nimtoz"
                        options={{
                            clientAllowedFormats: ['image'],
                            maxFiles: 1
                        }}
                        onSuccess={(result, { widget }) => {
                            setImg(result.info)
                            widget.close()
                        }}>
                        {({ open }) => {
                            return (
                                <>
                                    <div className="sm:col-span-3">
                                        <label className="inline-block text-sm text-gray-800 mt-2.5 ">
                                            Blog Image
                                        </label>
                                    </div>
                                    <div className="sm:col-span-9">
                                        <div className="flex items-center gap-5">
                                            {(img || data?.image) && (
                                                <div
                                                    style={{
                                                        width: '100px',
                                                        height: '100px',
                                                        borderRadius: '50%',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            img?.secure_url || data?.image
                                                        } // Use uploaded image or existing image in edit mode
                                                        alt={data?.image ? data.image : "Blog Image"}
                                                        width={100}
                                                        height={100}
                                                        objectFit="cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex gap-x-2 cursor-pointer" onClick={() => open()}>
                                                <Upload width={25} height={25} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }}
                    </CldUploadWidget>

                    <InputField
                        name="title"
                        label='Title'
                        type="string"
                        defaultValue={data?.title}
                        register={register}
                        error={errors?.title}
                        placeholder='Title of the Blog'
                    />
                    {data && (
                        <InputField
                            name="id"
                            label='Product Name'
                            // type="string"
                            defaultValue={data?.id}
                            register={register}
                            error={errors?.id}
                            // placeholder='My Product'
                            hidden
                        />
                    )}

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

                {state.error && <span className="text-red-600">Something went wrong!</span>}
                <div className="mt-5 flex justify-end gap-x-2">
                    <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 ">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!isValid}
                        // className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border bg-blue-600 text-white"
                        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border ${!isValid ? "bg-gray-300 text-gray-500" : "bg-red-600 text-white"
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