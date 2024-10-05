'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { Image as Picture, X, CirclePlus, CircleMinus, Upload } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextField from '../TextField';
import { productSchema, ProductSchema } from '@/lib/formValidationSchemas';
import { useFormState } from 'react-dom';
import { createProduct, updateProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

//! Validation 
type Hall = {
    hall_name: string,
    hall_capacity: number
}
type Amenities = {
    amenity_name: string,
}
type Rules = {
    description: string,
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

    const { category, images } = relatedData;
    const defaultImages = images?.map((image) => image.url)

    const [selectedImages, setSelectedImages] = useState<any>(defaultImages || []);
    // const [halls, setHalls] = useState<Hall[]>(
    //     [{ hall_name: "", hall_capacity: 0 }]
    // );
    const [halls, setHalls] = useState<Hall[]>(
        data?.halls?.length > 0 ? data.halls : [{ hall_name: "", hall_capacity: 0 }]);
    const [amenities, setAmenities] = useState<Amenities[]>(
        data?.amenities.length > 0 ? data.amenities : [{ amenity_name: "" }]);
    const [rules, setRules] = useState<Rules[]>(
        data?.rules.length > 0 ? data.rules : [{ description: "" }]);

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

    const onSubmit = handleSubmit((formData) => {
        formAction({
            ...formData,
            price: Number(formData.price),
            // product_image: selectedImages.length > 0 ? selectedImages : undefined,
            halls: halls.filter(hall => hall.hall_name || hall.hall_capacity), // Only include halls with data
            amenities: amenities.filter(amenity => amenity.amenity_name), // Only include amenities with data
            rules: rules.filter(rule => rule.description),
            product_image: selectedImages,

        })
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

    //! Multiple Amenity 
    const handleAddAmenity = () => {
        setAmenities([...amenities, { amenity_name: "" }]);
    };

    const handleRemoveAmenity = (index: number) => {
        const updatedAmenities = amenities.filter((_, i) => i !== index);
        setAmenities(updatedAmenities);
    };

    const handleAmenityChange = (index: number, field: keyof Amenities, value: string) => {
        const updatedAmenities = [...amenities];
        updatedAmenities[index][field] = value;  // Update the specific amenity field with the new value
        setAmenities(updatedAmenities);
    };

    //! Multiple Rules 
    const handleAddRules = () => {
        setRules([...rules, { description: "" }]);
    };

    const handleRemoveRules = (index: number) => {
        const updatedRules = rules.filter((_, i) => i !== index);
        setRules(updatedRules);
    };

    const handleRulesChange = (index: number, field: keyof Rules, value: string) => {
        const updatedRules = [...rules];
        updatedRules[index][field] = value;  // Update the specific amenity field with the new value
        setRules(updatedRules);
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
                        <CldUploadWidget
                            uploadPreset="NextJS_Nimtoz"
                            options={{
                                multiple: true,
                                clientAllowedFormats: ['image'], // Restrict to image formats only
                            }}
                            onSuccess={(result) => {
                                const newImage = typeof result.info === 'object' && 'secure_url' in result.info
                                    ? result.info.secure_url
                                    : null; // Handle the case where result.info might not be an object

                                if (newImage) {
                                    setSelectedImages((prevImages) => Array.isArray(prevImages) ? [...prevImages, newImage] : [newImage]);
                                }
                            }}>
                            {({ open }) => {
                                return (
                                    <>
                                        <div className="sm:col-span-9">
                                            <div className="flex items-center gap-5">
                                                {/* {(selectedImages || data?.product_image) && (
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
                                                                selectedImages?.secure_url || data?.product_image
                                                            } // Use uploaded image or existing image in edit mode
                                                            alt={data?.category_name ? data.category_name : "Category Icon"}
                                                            width={100}
                                                            height={100}
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                )} */}
                                                <div className="flex gap-x-2 cursor-pointer" onClick={() => open()}>
                                                    <Picture width={25} height={25} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            }}
                        </CldUploadWidget>

                        {/* Display selected images */}
                        <div className="flex gap-4 mt-2 overflow-x-auto max-w-full">
                            {selectedImages && selectedImages.map((image: string, index: any) => (
                                <div key={index} className="relative">
                                    <Image
                                        src={
                                            // selectedImages?.secure_url || data?.product_image
                                            image
                                        }
                                        alt="Product Image"
                                        width={100}
                                        height={100}
                                        objectFit="cover"
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
                    {data && (
                        <InputField
                            name="id"
                            label='Product Name'
                            type="string"
                            defaultValue={data?.id}
                            register={register}
                            error={errors?.id}
                            // placeholder='My Product'
                            hidden
                        />
                    )}
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

                    {/*///! Amenities  */}
                    {amenities.map((amenity, index) => (
                        <div key={index} className="sm:col-span-12 flex items-center gap-1">
                            <label htmlFor={`hall_name-${index}`} className="inline-block text-sm text-gray-800">
                                Amenity {index + 1}
                            </label>
                            <div className="flex gap-0.5 ml-4">
                                <CirclePlus
                                    className="text-green-400 cursor-pointer"
                                    onClick={handleAddAmenity}
                                />
                                <CircleMinus
                                    className={`text-red-500 cursor-pointer ${amenities.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleRemoveAmenity(index)}
                                    style={{ pointerEvents: amenities.length === 1 ? 'none' : 'auto' }}
                                />
                            </div>

                            <div className="flex w-full ml-12">
                                <input
                                    type="text"
                                    id={`amenity_name-${index}`}
                                    value={amenity.amenity_name}
                                    onChange={(e) => handleAmenityChange(index, "amenity_name", e.target.value)}
                                    className="py-2 px-3 block w-1/2 border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Amenity Name"
                                />
                            </div>
                        </div>
                    ))}

                    {/*///! Rules  */}
                    {rules.map((rule, index) => (
                        <div key={index} className="sm:col-span-12 flex items-center gap-1">
                            <label htmlFor={`description-${index}`} className="inline-block text-sm text-gray-800">
                                Rules {index + 1}
                            </label>
                            <div className="flex gap-0.5 ml-4">
                                <CirclePlus
                                    className="text-green-400 cursor-pointer"
                                    onClick={handleAddRules}
                                />
                                <CircleMinus
                                    className={`text-red-500 cursor-pointer ${rules.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleRemoveRules(index)}
                                    style={{ pointerEvents: rules.length === 1 ? 'none' : 'auto' }}
                                />
                            </div>

                            <div className="flex w-full ml-16">
                                <input
                                    type="text"
                                    id={`description-${index}`}
                                    value={rule.description}
                                    onChange={(e) => handleRulesChange(index, "description", e.target.value)}
                                    className="py-2 px-3 block w-1/2 border-gray-200 shadow-sm text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Rule Description"
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
                        className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border ${!isValid ? "bg-gray-300 text-gray-500" : "bg-red-600 text-white"
                            }`}
                    >
                        {type === "create" ? "Add" : "Update"}
                    </button>
                </div>
            </form >
        </>
    )
}
export default ProductForm