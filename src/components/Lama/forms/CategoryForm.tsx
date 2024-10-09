'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { categorySchema, CategorySchema } from '@/lib/formValidationSchemas';
import { useFormState } from 'react-dom';
import { createBlog, createCategory, updateBlog, updateCategory } from '@/lib/actions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Upload } from 'lucide-react'

const CategoryForm = ({
    type,
    data,
    setOpen
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        mode: "onChange",
        criteriaMode: "all",
    })

    const [img, setImg] = useState<any>(data?.category_icon || null);
    const [state, formAction] = useFormState(type === "create" ? createCategory : updateCategory, {
        success: false,
        error: false
    })

    const onSubmit = handleSubmit((formData) => {
        formAction({
            ...formData,
            category_icon: img?.secure_url || img, // Use uploaded image or existing one
        });
    });

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(`Category ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh()
        }
    }, [state])

    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 ">
                    Category
                </h2>
                <p className="text-sm text-gray-600 ">
                    Differentiate your products based on different categories.
                </p>
            </div>
            <form className='overflow-y-auto' onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                    <CldUploadWidget
                        uploadPreset="NextJS_Nimtoz"
                        options={{
                            clientAllowedFormats: ['image'], // Restrict to image formats only
                            maxFiles: 1                      // Allow only one file to be uploaded
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
                                            Category Icon
                                        </label>
                                    </div>
                                    <div className="sm:col-span-9">
                                        <div className="flex items-center gap-5">
                                            {(img || data?.category_icon) && (
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
                                                            img?.secure_url || data?.category_icon
                                                        } // Use uploaded image or existing image in edit mode
                                                        alt={data?.category_name ? data.category_name : "Category Icon"}
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

                    <InputField
                        name="category_name"
                        label="Category Name"
                        type="string"
                        defaultValue={data?.category_name}
                        register={register}
                        error={errors?.category_name}
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
                        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border ${!isValid ? "bg-gray-300 text-gray-500" : "bg-orange-600 text-white"
                            }`}
                    >
                        {type === "create" ? "Add" : "Update"}
                    </button>
                </div>
            </form>
        </>
    )
}
export default CategoryForm