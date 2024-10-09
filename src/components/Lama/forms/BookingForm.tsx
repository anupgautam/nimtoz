'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { bookingSchema, BookingSchema } from '@/lib/formValidationSchemas';
import { useFormState } from 'react-dom';
import { updateBooking } from '@/lib/actions';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const BookingForm = ({
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
        setValue,
        formState: { errors, isValid },
    } = useForm<BookingSchema>({
        resolver: zodResolver(bookingSchema),
        mode: "onChange",
        criteriaMode: "all",
        defaultValues: {
            // is_approved: data?.is_approved || false,
            id: data?.id,
            productId: data?.productId || null, // Ensure this is set if required
        }
    })

    const [img, setImg] = useState<any>(data?.image || null);
    const [state, formAction] = useFormState(updateBooking, {
        success: false,
        error: false
    })

    const onSubmit = handleSubmit((formData) => {
        formAction({
            ...formData,
        });
    });

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(`Booking ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh()
        }
    }, [state])

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('is_approved', event.target.checked);
    };

    // Log the isValid and errors to the console
    useEffect(() => {
    }, [isValid, errors]);

    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 ">
                    Booking
                </h2>
                <p className="text-sm text-gray-600 ">
                    Approve or reject the booking
                </p>
            </div>
            <form className='overflow-y-auto' onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
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
                        name="is_approved"
                        label='Is Approved'
                        type="checkbox"
                        defaultValue={data?.is_approved}
                        register={register}
                        error={errors?.is_approved}
                        // placeholder='Title of the Blog'
                        onChange={handleCheckboxChange}
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
export default BookingForm