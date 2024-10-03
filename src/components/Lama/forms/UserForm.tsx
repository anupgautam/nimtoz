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

const UserForm = ({ type, data, setOpen }: { type: "create" | "update"; data?: any; setOpen: Dispatch<SetStateAction<boolean>> }) => {

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
    })

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast(`Venue ${type === "create" ? "created" : "updated"}`)
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
export default UserForm