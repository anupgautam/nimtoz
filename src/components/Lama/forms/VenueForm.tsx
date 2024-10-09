'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { venueSchema, VenueSchema } from '@/lib/formValidationSchemas';
import { createVenue, updateVenues } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const VenueForm = ({
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
    } = useForm<VenueSchema>({
        resolver: zodResolver(venueSchema),
        mode: "onChange",
        criteriaMode: "all",
    })

    //! After React 19 useActionState 

    const [state, formAction] = useFormState(type === "create" ? createVenue : updateVenues, {
        success: false,
        error: false
    })


    const onSubmit = handleSubmit(data => {
        formAction(data)
        console.log(data)
    })

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(`Venue ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh();
        }
    }, [state])

    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                    {type === "create" ? "Register Venue" : "Edit Venue"}

                </h2>
                <p className="text-sm text-gray-600 ">
                    Connect with us.
                </p>
            </div>
            <form className='overflow-y-auto' onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-12 gap-3 sm:gap-6">


                    <InputField
                        name="venue_name"
                        label='Venue Name'
                        type="string"
                        defaultValue={data?.venue_name}
                        register={register}
                        error={errors?.venue_name}
                        placeholder='Venue Name'
                    />
                    <InputField
                        name="email"
                        label='Email'
                        type="email"
                        defaultValue={data?.email}
                        register={register}
                        error={errors?.email}
                        placeholder='someone@gmail.com'
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
                    <InputField
                        name="venue_address"
                        label='Venue Address'
                        type="string"
                        defaultValue={data?.venue_address}
                        register={register}
                        error={errors?.venue_address}
                        placeholder='Venue Address'
                    />
                    <InputField
                        name="phone_number"
                        label='Phone Number'
                        type="string"
                        defaultValue={data?.phone_number}
                        register={register}
                        error={errors?.phone_number}
                        placeholder='9841------'
                    />
                    <InputField
                        name="contact_person"
                        label='Contact Person'
                        type="string"
                        defaultValue={data?.contact_person}
                        register={register}
                        error={errors?.contact_person}
                        placeholder='Contact Person'
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
export default VenueForm