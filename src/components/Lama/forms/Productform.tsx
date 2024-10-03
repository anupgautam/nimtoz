'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { Image, X, CirclePlus, CircleMinus } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '../TextField';
import { productSchema, ProductSchema } from '@/lib/formValidationSchemas';
import { useFormState } from 'react-dom';
import { createProduct, updateProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

//! Validation 
type Hall = {
    hall_name: string,
    hall_capacity: number
}

const ProductForm = ({
    type,
    data,
    setOpen,
    relatedData
}: {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any
}) => {

    const { category } = relatedData;
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [halls, setHalls] = useState<Hall[]>([{ hall_name: "", hall_capacity: 0 }]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
        criteriaMode: "all",
    })

    const [state, formAction] = useFormState(type === "create" ? createProduct : updateProduct, {
        success: false,
        error: false
    })

    const onSubmit = handleSubmit(data => {
        formAction(data)
    })

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(`Product ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh();
        }
    }, [state])

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedImages([...selectedImages, ...Array.from(files)]);
        }
    }

    const removeImage = (index: number) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const handleAddHall = () => {
        setHalls([...halls, { hall_name: "", hall_capacity: 0 }]);
    };

    const handleRemoveHall = (index: number) => {
        // Remove the hall at the given index
        const updatedHalls = halls.filter((_, i) => i !== index);
        setHalls(updatedHalls);
    };

    const handleChange = (index: number, field: keyof Hall, value: string) => {
        const updatedHalls = [...halls];
        if (field === "hall_capacity") {
            updatedHalls[index][field] = Number(value); // Convert to number
        } else {
            updatedHalls[index][field] = value;
        }
        setHalls(updatedHalls);
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
                    {data && (
                        <InputField
                            name="Id"
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
                    <div className="sm:col-span-3">
                        <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5 ">
                            Select the Category
                        </label>
                    </div>

                    <div className="sm:col-span-9">

                        <select
                            {...register("category")}
                            className={`py-2 px-3 block w-full border-gray-200 shadow-sm sm:mt-0
                                text-sm relative rounded-lg ring-1 ring-gray-300
                                focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                            defaultValue={data?.category}
                        >
                            {category && category.map((categories: { id: string; category_name: string }) => {
                                return (
                                    <option value={categories.id} key={categories.id}>{categories.category_name}</option>
                                )
                            })}
                        </select>
                        {errors.category?.message && (
                            <p className="text-xs text-red-600">{errors?.category.message.toString()}</p>
                        )}
                    </div>
                    {/*//! Multiple Halls  */}
                    {/* {halls.map((hall, index) => (
                        <div key={index} className="sm:col-span-12 flex items-center gap-2">
                            <label htmlFor={`hall_name-${index}`} className="inline-block text-sm text-gray-800">
                                Hall {index + 1}
                            </label>
                            <div className="flex gap-2 ml-2">
                                <CirclePlus
                                    className="text-green-400 cursor-pointer"
                                    onClick={handleAddHall}
                                />
                                <CircleMinus
                                    className={`text-red-500 cursor-pointer ${halls.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleRemoveHall(index)}
                                    style={{ pointerEvents: halls.length === 1 ? 'none' : 'auto' }}
                                />
                            </div>
                            <div className="sm:flex ml-12 pl-4">
                                <input
                                    type="text"
                                    id={`af-account-full-name hall_name-${index}`}
                                    value={hall.hall_name}
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                    placeholder="Hall Name" />
                                <input
                                    type="text"
                                    value={hall.hall_capacity}
                                    onChange={(e) => handleChange(index, "hall_capacity", e.target.value)}
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                                    placeholder="Hall Capacity" />
                            </div>
                        </div>
                    ))} */}
                    {halls.map((hall, index) => (
                        <div key={index} className="sm:col-span-12 flex items-center gap-1">
                            <label htmlFor={`hall_name-${index}`} className="inline-block text-sm text-gray-800">
                                Hall {index + 1}
                            </label>
                            <div className="flex gap-0.5 ml-4">
                                <CirclePlus
                                    className="text-green-400 cursor-pointer"
                                    onClick={handleAddHall}
                                />
                                <CircleMinus
                                    className={`text-red-500 cursor-pointer ${halls.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleRemoveHall(index)}
                                    style={{ pointerEvents: halls.length === 1 ? 'none' : 'auto' }}
                                />
                            </div>

                            <div className="flex ml-12  pl-8 w-full">
                                <input
                                    type="text"
                                    id={`hall_name-${index}`}
                                    value={hall.hall_name}
                                    onChange={(e) => handleChange(index, "hall_name", e.target.value)}
                                    className="py-2 px-3 block w-1/2 border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Hall Name"
                                />
                                <input
                                    type="text"
                                    value={hall.hall_capacity}
                                    onChange={(e) => handleChange(index, "hall_capacity", e.target.value)}
                                    className="py-2 px-3 block w-1/2 border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Hall Capacity"
                                />
                            </div>
                        </div>
                    ))}

                    {halls.map((hall, index) => (
                        <div key={index} className="sm:col-span-12 flex items-center gap-1">
                            <label htmlFor={`hall_name-${index}`} className="inline-block text-sm text-gray-800">
                                Hall {index + 1}
                            </label>
                            <div className="flex gap-0.5 ml-4">
                                <CirclePlus
                                    className="text-green-400 cursor-pointer"
                                    onClick={handleAddHall}
                                />
                                <CircleMinus
                                    className={`text-red-500 cursor-pointer ${halls.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleRemoveHall(index)}
                                    style={{ pointerEvents: halls.length === 1 ? 'none' : 'auto' }}
                                />
                            </div>

                            <div className="flex w-full">
                                <input
                                    type="text"
                                    id={`hall_name-${index}`}
                                    value={hall.hall_name}
                                    onChange={(e) => handleChange(index, "hall_name", e.target.value)}
                                    className="py-2 px-3 block w-1/2 border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Hall Name"
                                />
                            </div>
                        </div>
                    ))}


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