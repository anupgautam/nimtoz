'use client'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useFormik, FormikErrors } from 'formik'
import { array, date, number, object, string } from 'yup'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import prisma from '@/lib/db';


//! Types
interface Booking {
    start_date: Date;
    end_date: Date;
    start_time?: Date | null;
    end_time?: Date | null;
    events: { id: string }[];
    userId: number;  // Should be a number
    productId: number;  // Should be a number
    Hall: string[]; // Assuming Hall is a string array of hall IDs
}


const BookingForm = ({ product, halls }: { product: any; halls: any[] }) => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [eventTypes, setEventTypes] = useState([])
    // const [bookedDates, setBookedDates] = useState<{ start_date: Date; end_date: Date; }[]>([]);

    const fetchEventTypes = async () => {
        try {
            const response = await axios.get('/api/eventtype');
            setEventTypes(response.data);
        } catch (error) {
            toast.error("Event Types not found")
            console.error('Error fetching event types:', error);
        }
    }

    useEffect(() => {
        fetchEventTypes()
    }, [])

    useEffect(() => {
        if (session?.user?.id) {
            formik.setFieldValue('userId', session.user.id);
        }
        if (product?.id) {
            formik.setFieldValue('productId', product.id);
        }
    }, [session, product]);

    //! Validation
    const eventTypeSchema = object().shape({
        id: number().optional(),
        name: string().required('EventType name is required'),
    });
    // let bookingSchema = object({
    //     start_date: date().required("Start date is required"),
    //     end_date: date().required("Start date is required"),
    //     start_time: date().required("Start time is required").optional(),
    //     end_time: date().required("Start time is required").optional(),
    //     eventtype: array().of(eventTypeSchema).required('At least one event type is required'),
    // })

    const bookingSchema = object({
        start_date: date()
            .required("Start date is required")
            .min(new Date(new Date().setHours(0, 0, 0, 0)), "Start date cannot be in the past"),
        end_date: date()
            .required("End date is required")
            .min(new Date(), "End date cannot be in the past")
            .test('is-greater-or-equal', 'End date must be greater than or equal to start date', function (value) {
                const { start_date } = this.parent; // Access the start_date value from the parent object
                return !start_date || value === null || new Date(value) >= new Date(start_date);
            }),
        start_time: date().nullable().optional(),  // Allow null values
        end_time: date().nullable().optional(),    // Allow null values
        // eventtype: array().of(eventTypeSchema).required('At least one event type is required'),
        Hall: array().min(1, "At least one hall must be selected").required("Hall selection is required"),
        events: array().of(object({ id: string().required('Event ID is required') })).required('At least one event is required'),
    });



    // const formik = useFormik({
    //     validationSchema: bookingSchema,
    //     initialValues: {
    //         start_date: '',
    //         end_date: '',
    //         start_time: '',
    //         end_time: '',
    //         userId: session && session.user.id,
    //         productId: product && product.id,
    //         events: [{ id: '' }],
    //         Hall: [],
    //     },
    //     onSubmit: (data, { resetForm }) => {
    //         const formattedData = {
    //             ...data,
    //             start_date: new Date(data.start_date),
    //             end_date: new Date(data.end_date),
    //             start_time: data.start_time ? new Date(data.start_time) : null,
    //             end_time: data.end_time ? new Date(data.end_time) : null,
    //             userId: Number(data.userId),
    //             productId: Number(data.productId),
    //         };

    //         bookingApiCall(formattedData, resetForm);
    //     },
    // });

    const formik = useFormik({
        validationSchema: bookingSchema,
        initialValues: {
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
            start_time: '', // Empty string for optional fields
            end_time: '',   // Empty string for optional fields
            userId: session && session?.user?.id || 0,  // Ensure this is set
            productId: product?.id || 0,
            events: [{ id: '' }],
            Hall: [],
        },
        onSubmit: (data, { resetForm }) => {
            const formattedData = {
                ...data,
                start_date: new Date(data.start_date),  // Only convert if not an empty string
                end_date: new Date(data.end_date),
                start_time: data.start_time ? new Date(data.start_time) : null,  // Optional conversion
                end_time: data.end_time ? new Date(data.end_time) : null,
                userId: Number(data.userId),
                productId: Number(data.productId),
            };
            bookingApiCall(formattedData, resetForm);
        },
        validateOnMount: true,
    });




    const { errors, getFieldProps, touched, isValid } = formik

    useEffect(() => {
        console.log('Errors:', errors);
        console.log('Is Valid:', isValid);
    }, [errors, isValid])

    const bookingApiCall = async (formData: Booking, resetForm: () => void) => {
        try {
            console.log('Submitting booking data:', formData);
            const response = await axios.post('/api/bookings', {
                start_date: formData.start_date,
                end_date: formData.end_date,
                start_time: formData.start_time,
                end_time: formData.end_time,
                userId: formData.userId,
                productId: formData.productId,
                events: formData.events,
                Hall: formData.Hall,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response)
            // if (response.ok) {
            toast.success("Booking created successfully!");
            resetForm();
            router.push('/'); // Navigate to confirmation page or anywhere
            // }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Check if the error status is 409 (Conflict)
                console.log(error.response)
                if (error.response.status === 409) {
                    toast.error(error.response.data.message); // Show the specific booking error message
                } else {
                    toast.error("Error creating booking");
                }
            } else {
                toast.error("Error creating booking");
            }
        }
    };


    return (
        <>
            {session?.user ? <div className="bg-white border border-gray-200 rounded-xl shadow-sm ">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 ">Book Now</h1>
                    </div>

                    <div className="mt-5">
                        <form className='sticky' onSubmit={formik.handleSubmit}>
                            <div className="grid gap-y-4">
                                <div className='flex justify-between items-center '>
                                    <div>
                                        <label htmlFor="start-date" className="block text-sm mb-2 ">Start Date</label>
                                        <input
                                            type="date"
                                            id="start_date"
                                            {...formik.getFieldProps('start_date')}
                                            className={`py-2 px-3 border ${errors.start_date && touched.start_date ? 'border-red-500' : 'border-gray-200'} rounded`}
                                        />
                                        {errors.start_date && touched.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="end-date" className="block text-sm mb-2 ">End Date</label>
                                        <input
                                            type="date"
                                            id="end_date"
                                            {...formik.getFieldProps('end_date')}
                                            className={`py-2 px-3 border ${errors.end_date && touched.end_date ? 'border-red-500' : 'border-gray-200'} rounded`}
                                        />
                                        {errors.end_date && touched.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                                    </div>
                                </div>

                                {/*//! Halls Select */}
                                <div>
                                    <label htmlFor="hall" className="inline-block text-sm text-gray-800 mt-2.5">
                                        Select Halls
                                    </label>
                                    <select
                                        id="Hall"
                                        multiple
                                        onChange={formik.handleChange}
                                        className={`py-2 px-3 block w-full border-gray-200 shadow-sm sm:mt-0 text-sm relative rounded-lg ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                    >
                                        <option value="">Select a hall</option>
                                        {halls && halls.length > 0 ? (
                                            halls.map((hall: { id: string; hall_name: string; hall_capacity: number }) => (
                                                <option key={hall.id} value={hall.id}>
                                                    {hall.hall_name} (Capacity: {hall.hall_capacity})
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No halls available</option>
                                        )}
                                    </select>
                                    {errors.Hall && <div className="text-red-500 text-sm">{errors.Hall}</div>}
                                </div>

                                {/*//! Event Select */}
                                <div>
                                    <label htmlFor="hall" className="inline-block text-sm text-gray-800 mt-2.5">
                                        Select Event
                                    </label>
                                    <select
                                        id="events[0].id"
                                        onChange={(e) => {
                                            const selectedEventId = e.target.value;
                                            formik.setFieldValue('events', [{ id: selectedEventId }]); // Set selected event
                                        }}
                                        className={`py-2 px-3 block w-full border-gray-200 shadow-sm sm:mt-0 text-sm relative rounded-lg ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                                    >
                                        <option value="">Select an Event</option>
                                        {eventTypes && eventTypes.length > 0 ? (
                                            eventTypes.map((event: { id: string; title: string }) => (
                                                <option key={event.id} value={event.id}>
                                                    {event.title}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Events available</option>
                                        )}
                                    </select>
                                    {Array.isArray(errors.events) ? (
                                        errors.events.length > 0 &&
                                        typeof errors.events[0] === 'object' &&
                                        'id' in errors.events[0] && (
                                            <div className="text-red-500 text-sm">{(errors.events[0] as FormikErrors<{ id: string }>).id}</div>
                                        )
                                    ) : (
                                        typeof errors.events === 'string' && (
                                            <div className="text-red-500 text-sm">{errors.events}</div>
                                        )
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white focus:outline-none ${!isValid ? "bg-gray-300 text-gray-500" : "bg-red-600 text-white"
                                        }`}
                                >
                                    Check Availability
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> : <>Login to Book the form</>}

        </>
    )
}
export default BookingForm