'use client'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { Image, X } from 'lucide-react'
import { useState } from 'react';
import TextField from '../TextField';

//! Validation 
const schema = z.object({
    title: z
        .string()
        .min(3, { message: "Product name must be at least 3 characters long!" }),
    address: z
        .string()
        .min(3, { message: "Address must be at least 3 characters long!" }),
    // birthday: z
    //     .date({ message: "Birthday is required!" }),

    price: z
        .number({
            message: "Price must be a number",
        })
        .positive("Price must be greater than 0")
        .max(1000000, "Price cannot exceed 1 million"),
    description: z
        .string()
        .min(50, { message: "Description must be at least 50 characters long!" })
        .max(200, { message: "Description cannot be more than 200 characters long!" }),
    category: z
        .number(),
    product_image: z
        .array(z.instanceof(File, { message: "Product Image is required" }))
        .min(1, "At least one image is required"),
    halls: z
        .array(z.number()),
    amenities: z
        .array(z.number()),
    rules: z
        .array(z.number()),
});

type Inputs = z.infer<typeof schema>

const ProductForm = ({ type, data }: { type: "create" | "update"; data?: any; }) => {

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
        mode: "onChange",
        criteriaMode: "all",
    })

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedImages([...selectedImages, ...Array.from(files)]);
        }
    }

    const removeImage = (index: number) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 ">
                    Product
                </h2>
                <p className="text-sm text-gray-600 ">
                    Add your product name, description, price and address.
                </p>
            </div>
            {/*//! Form  */}
            <form className='h-[80vh] overflow-y-auto' onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">

                    {/*//* Product Image  */}
                    <div className="sm:col-span-3">
                        <label className="inline-block text-sm text-gray-800 mt-2.5">Product Images</label>
                    </div>
                    <div className="sm:col-span-9">
                        <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor='product_images'>
                            <Image />
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            {...register("product_image")}
                            className="hidden"
                            id="product_images"
                            onChange={handleImageUpload}
                        />
                        {errors.product_image?.message && (
                            <p className="text-xs text-red-600">{errors.product_image.message.toString()}</p>
                        )}

                        {/* Display selected images */}
                        <div className="flex gap-4 mt-2 overflow-x-auto">
                            {selectedImages.map((image: any, index: any) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Selected ${index}`}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-white rounded-full p-1"
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className="w-4 h-4 text-red-600" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* //! InputField component */}
                    <InputField
                        name="title"
                        label='Product Name'
                        type="string"
                        defaultValue={data?.title}
                        register={register}
                        error={errors?.title}
                        placeholder='My Product'
                    />
                    <InputField
                        name="price"
                        label='Price'
                        type="string"
                        defaultValue={data?.price}
                        register={register}
                        error={errors?.price}
                        placeholder='Price'
                    />
                    <InputField
                        name="address"
                        label='Address'
                        type="string"
                        defaultValue={data?.address}
                        register={register}
                        error={errors?.address}
                        placeholder='Address'
                    />
                    <InputField
                        name="price"
                        label='Price'
                        type="number"
                        defaultValue={data?.price}
                        register={register}
                        error={errors?.price}
                        placeholder='Price'
                    />
                    {/* <InputField
                        name="Birthday"
                        label='birthday'
                        type="date"
                        defaultValue={data?.birthday}
                        register={register}
                        error={errors?.birthday}
                    /> */}

                    {/*//! Select the category  */}
                    {/* <div className="sm:col-span-3">
                        <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5 ">
                            Select the Category
                        </label>
                    </div> */}

                    {/* <div className="sm:col-span-9">

                        <select
                            {...register("category")}
                            className={`py-2 px-3 block w-full border-gray-200 shadow-sm sm:mt-0
                                text-sm relative rounded-lg ring-1 ring-gray-300
                                focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                            defaultValue={data?.category}

                        >
                            <option>Home</option>
                            <option>Work</option>
                            <option>Fax</option>
                        </select>
                        {errors.category?.message && (
                            <p className="text-xs text-red-600">{errors?.category.message.toString()}</p>
                        )}
                    </div> */}

                    <TextField
                        name="description"
                        label="Description"
                        type="string"
                        defaultValue={data?.description}
                        register={register}
                        error={errors?.description}
                        placeholder='Product Description.'
                    />
                </div>

                <div className="mt-5 flex justify-end gap-x-2">
                    <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 ">
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
export default ProductForm