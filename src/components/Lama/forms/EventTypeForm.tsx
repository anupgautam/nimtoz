'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../InputField';
import { eventTypeSchema, EventTypeSchema, } from '@/lib/formValidationSchemas';
import { createEventType, updateEventType } from '@/lib/actions';
import { useFormState } from 'react-dom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const EventTypeForm = ({
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
    } = useForm<EventTypeSchema>({
        resolver: zodResolver(eventTypeSchema),
        mode: "onChange",
        criteriaMode: "all",
    })

    //! After React 19 useActionState 

    const [state, formAction] = useFormState(type === "create" ? createEventType : updateEventType, {
        success: false,
        error: false
    })


    const onSubmit = handleSubmit(data => {
        formAction(data)
    })

    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success(`Event Type ${type === "create" ? "created" : "updated"}`)
            setOpen(false)
            router.refresh();
        }
    }, [state])

    return (
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800">
                    {type === "create" ? "Create Event Type" : "Edit Event Type"}

                </h2>
                <p className="text-sm text-gray-600 ">
                    Create your events for all occasion.
                </p>
            </div>
            <form className='overflow-y-auto' onSubmit={onSubmit}>
                <div className="grid sm:grid-cols-12 gap-3 sm:gap-6">


                    <InputField
                        name="title"
                        label='Title'
                        type="string"
                        defaultValue={data?.title}
                        register={register}
                        error={errors?.title}
                        placeholder='Title'
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
export default EventTypeForm