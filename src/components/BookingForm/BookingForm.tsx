'use client'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useFormik, FormikErrors } from 'formik'
import { array, date, number, object, string } from 'yup'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import NepaliDate from 'nepali-date'
import Select, { MultiValue } from 'react-select'
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

//! Types
interface Booking {
    start_date: Date;
    end_date: Date;
    start_time?: String | null;
    end_time?: String | null;
    events: { id: string }[];
    userId: number;
    productId: number;
    Hall: string[];
}

const BookingForm = ({ product, halls }: { product: any; halls: any[] }) => {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [eventTypes, setEventTypes] = useState([])

    const [nepaliStartDate, setNepaliStartDate] = useState('');
    const [nepaliEndDate, setNepaliEndDate] = useState('');

    interface HallOption {
        value: string;
        label: string;
    }

    //! Hall options
    const hallOptions: HallOption[] = halls.map(hall => ({
        value: hall.id,
        label: `${hall.hall_name} (Capacity: ${hall.hall_capacity})`
    }));

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

    const today = new Date();
    const threeDaysFromNow = new Date(today.setDate(today.getDate() + 2));
    // const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const bookingSchema = object({
        //! Only allow booking 3 days from now
        start_date: date()
            .required("Start date is required")
            .min(threeDaysFromNow, "Start date must be at least 3 days from today")
            .test(
                'is-not-in-past',
                'Start date cannot be in the past',
                (value) => value && new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
            ),
        end_date: date()
            .required("End date is required")
            .min(new Date(), "End date cannot be in the past")
            .test(
                'is-greater-or-equal',
                'End date must be greater than the start date',
                function (value) {
                    const { start_date } = this.parent;
                    return !start_date || value === null || new Date(value) > new Date(start_date);
                }
            ),

        //! Allow booking of today with time 
        // start_date: date()
        //     .required("Start date is required")
        //     .min(new Date(new Date().setHours(0, 0, 0, 0)), "Start date cannot be in the past") // Allows today as valid
        //     .test('is-today-or-future', 'Start date cannot be in the past', function (value) {
        //         const today = new Date().setHours(0, 0, 0, 0);
        //         return value === null || new Date(value).setHours(0, 0, 0, 0) >= today;
        //     }),

        // end_date: date()
        //     .required("End date is required")
        //     .test('is-greater-or-equal', 'End date must be greater than or equal to start date', function (value) {
        //         const { start_date } = this.parent;
        //         const startDate = new Date(start_date).setHours(0, 0, 0, 0);
        //         const endDate = new Date(value).setHours(0, 0, 0, 0);
        //         const today = new Date().setHours(0, 0, 0, 0);

        //         return !start_date || (endDate >= startDate && endDate >= today);
        //     }),
        // start_time: string()
        //     .matches(timeRegex, 'Start time must be in HH:MM format')
        //     .required('Start time is required')
        //     .test('is-future-time', 'Start time cannot be in the past', function (value) {
        //         const { start_date } = this.parent;

        //         if (!value) return true;

        //         const [startHour, startMinute] = value.split(':').map(Number);
        //         const currentDate = new Date();

        //         // Check if the selected start date is today
        //         if (new Date(start_date).toDateString() === currentDate.toDateString()) {
        //             const currentHour = currentDate.getHours();
        //             const currentMinute = currentDate.getMinutes();

        //             // Convert both times to minutes for easier comparison
        //             const currentTimeInMinutes = currentHour * 60 + currentMinute;
        //             const startTimeInMinutes = startHour * 60 + startMinute;

        //             return startTimeInMinutes >= currentTimeInMinutes;
        //         }
        //         return true;
        //     }),

        // //! Atleast 2 hours minimum huna paryo
        // end_time: string()
        //     .matches(timeRegex, 'End time must be in HH:MM format')
        //     .required('End time is required')
        //     .test('is-greater-time', 'End time cannot be earlier than start time', function (value) {
        //         const { start_time, start_date, end_date } = this.parent;

        //         if (!start_time || !value) return true;

        //         const [startHour, startMinute] = start_time.split(':').map(Number);
        //         const [endHour, endMinute] = value.split(':').map(Number);

        //         const startTimeInMinutes = startHour * 60 + startMinute;
        //         const endTimeInMinutes = endHour * 60 + endMinute;

        //         // If start_date and end_date are the same, ensure end_time is after start_time
        //         if (new Date(start_date).toDateString() === new Date(end_date).toDateString()) {
        //             return endTimeInMinutes > startTimeInMinutes;
        //         }
        //         return true; // If dates are different, time comparison is not needed
        //     })
        //     // New test for minimum 2-hour gap validation
        //     .test('is-at-least-2-hours-gap', 'There must be at least a 2-hour gap between start and end times', function (value) {
        //         const { start_time, start_date, end_date } = this.parent;

        //         if (!start_time || !value) return true;

        //         const [startHour, startMinute] = start_time.split(':').map(Number);
        //         const [endHour, endMinute] = value.split(':').map(Number);

        //         const startTimeInMinutes = startHour * 60 + startMinute;
        //         const endTimeInMinutes = endHour * 60 + endMinute;

        //         // If start_date and end_date are the same, check for the 2-hour gap
        //         if (new Date(start_date).toDateString() === new Date(end_date).toDateString()) {
        //             const timeDifference = endTimeInMinutes - startTimeInMinutes;
        //             return timeDifference >= 120;
        //         }

        //         return true; // If dates are different, the gap isn't needed (this can be adjusted if necessary)
        //     }),


        Hall: array().min(1, "At least one hall must be selected").required("Hall selection is required"),
        events: array().of(object({ id: string().required('Event ID is required') })).required('At least one event is required'),
    });

    const formik = useFormik({
        validationSchema: bookingSchema,
        initialValues: {
            start_date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
            end_date: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().split('T')[0],
            start_time: '',
            end_time: '',
            userId: session && session?.user?.id || 0,
            productId: product?.id || 0,
            events: [{ id: '' }],
            Hall: [] as string[],
        },
        onSubmit: (data, { resetForm }) => {
            const formattedData = {
                ...data,
                start_date: new Date(data.start_date),
                end_date: new Date(data.end_date),
                start_time: data.start_time ? data.start_time : null,
                end_time: data.end_time ? data.end_time : null,
                userId: Number(data.userId),
                productId: Number(data.productId),
            };
            bookingApiCall(formattedData, resetForm);
        },
        validateOnMount: true,
    });

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e); // Update formik value
        const [year, month, day] = e.target.value.split('-').map(Number);
        const nepaliDateObj = new NepaliDate(new Date(year, month - 1, day));
        const nepaliFormatted = `${nepaliDateObj.getYear()}-${nepaliDateObj.getMonth() + 1}-${nepaliDateObj.getDate() + 1}`;
        setNepaliStartDate(nepaliFormatted);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e); // Update formik value
        const [year, month, day] = e.target.value.split('-').map(Number);
        const nepaliDateObj = new NepaliDate(new Date(year, month - 1, day));
        const nepaliFormatted = `${nepaliDateObj.getYear()}-${nepaliDateObj.getMonth() + 1}-${nepaliDateObj.getDate() + 1}`;
        setNepaliEndDate(nepaliFormatted);
    };

    const { errors, getFieldProps, touched, isValid } = formik

    useEffect(() => {
    }, [errors, isValid])

    const bookingApiCall = async (formData: Booking, resetForm: () => void) => {
        try {
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
            // if (response.ok) {
            toast.success("Event request sent!");
            resetForm();
            router.push('/'); 
            // }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Error creating booking");
                }
            } else {
                toast.error("Error creating booking");
            }
        }
    };

    return (
        <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm">
            {session?.user ? (
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800">Book Now</h1>
                    </div>
                    <div className="mt-5">
                        <form className="sticky" onSubmit={formik.handleSubmit}>
                            <div className="grid gap-y-4">
                                <label htmlFor="start_date" className="block text-sm ">Start Date</label>
                                <input
                                    type="date"
                                    id="start_date"
                                    {...formik.getFieldProps('start_date')}
                                    onChange={handleStartDateChange}
                                    className={`py-2 px-3 border ${formik.touched.start_date && formik.errors.start_date ? 'border-orange-500' : 'border-gray-200'} rounded`}
                                />
                                {formik.touched.start_date && formik.errors.start_date && <div className="text-red-500 text-sm">{formik.errors.start_date}</div>}
                                {nepaliStartDate && (
                                    <div className="mt-1 text-sm text-gray-700">BS: {nepaliStartDate}</div>
                                )}

                                <label htmlFor="end_date" className="block text-sm ">End Date</label>
                                <input
                                    type="date"
                                    id="end_date"
                                    {...formik.getFieldProps('end_date')}
                                    onChange={handleEndDateChange}
                                    className={`py-2 px-3 border ${formik.touched.end_date && formik.errors.end_date ? 'border-orange-500' : 'border-gray-200'} rounded`}
                                />
                                {formik.touched.end_date && formik.errors.end_date && <div className="text-red-500 text-sm">{formik.errors.end_date}</div>}
                                {nepaliEndDate && (
                                    <div className="mt-1 text-sm text-gray-700">BS: {nepaliEndDate}</div>
                                )}

                                {/* //! Time Period wala */}
                                {/* <label htmlFor="start_time" className="block text-sm ">Start Time</label>
                                <input
                                    type="time"
                                    id="start_time"
                                    {...formik.getFieldProps('start_time')}
                                    className={`py-2 px-3 border ${formik.touched.start_time && formik.errors.start_time ? 'border-red-500' : 'border-gray-200'} rounded`}
                                />
                                {formik.errors.start_time && (
                                    <div className="text-red-500 text-sm">{formik.errors.start_time}</div>
                                )}

                                <label htmlFor="end_time" className="block text-sm ">End Time</label>
                                <input
                                    type="time"
                                    id="end_time"
                                    {...formik.getFieldProps('end_time')}
                                    className={`py-2 px-3 border ${formik.touched.end_time && formik.errors.end_time ? 'border-red-500' : 'border-gray-200'} rounded`}
                                />
                                {formik.errors.end_time && (
                                    <div className="text-red-500 text-sm">{formik.errors.end_time}</div>
                                )} */}

                                {/*//! React Select  */}
                                <div>
                                    <label htmlFor="Hall" className="inline-block text-sm text-gray-800 mt-2.5">Select Halls</label>
                                    <Select
                                        id="Hall"
                                        isMulti // Enable multiple selection
                                        name="Hall"
                                        options={hallOptions} // Options to display in the dropdown
                                        classNamePrefix="react-select" // For styling purposes
                                        value={hallOptions.filter(option => formik.values.Hall.includes(option.value))} // Display selected values
                                        onChange={(selectedOptions: MultiValue<HallOption> | null) => {
                                            const selectedHalls = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                            formik.setFieldValue('Hall', selectedHalls); // Update formik value
                                        }}
                                    />
                                    {formik.errors.Hall && (
                                        <div className="text-red-500 text-sm">{formik.errors.Hall}</div>
                                    )}
                                </div>

                                {/* Select Event */}
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
                                        className={`py-2 px-3 block w-full border-gray-200 shadow-sm sm:mt-0 text-sm relative rounded-lg ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none`}
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
                                    disabled={!formik.isValid}
                                    className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white focus:outline-none ${!formik.isValid ? "bg-gray-300 text-gray-500" : "bg-orange-600 text-white"}`}
                                >
                                    Check Availability
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md flex flex-col items-center justify-center rounded-xl">
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-white">Login to Book the Venue</h2>
                        <p className="text-sm text-white">To fill out the form, please log in.</p>
                        <button
                            onClick={() => router.push('/login')} // Redirect to your login page
                            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg"
                        >
                            Log in to fill the form
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}
export default BookingForm