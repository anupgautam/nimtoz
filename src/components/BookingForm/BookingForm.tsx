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
    start_time?: Date | null;
    end_time?: Date | null;
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

    const bookingSchema = object({
        //! Dont' book of today
        // start_date: date()
        //     .required("Start date is required")
        //     .min(new Date(new Date().setHours(0, 0, 0, 0)), "Start date cannot be in the past"),
        // end_date: date()
        //     .required("End date is required")
        //     .min(new Date(), "End date cannot be in the past")
        //     .test('is-greater-or-equal', 'End date must be greater than or equal to start date', function (value) {
        //         const { start_date } = this.parent; // Access the start_date value from the parent object
        //         return !start_date || value === null || new Date(value) >= new Date(start_date);
        //     }),

        //! Allow booking of today 
        start_date: date()
            .required("Start date is required")
            .min(new Date(new Date().setHours(0, 0, 0, 0)), "Start date cannot be in the past") // Allows today as valid
            .test('is-today-or-future', 'Start date cannot be in the past', function (value) {
                const today = new Date().setHours(0, 0, 0, 0);
                return value === null || new Date(value).setHours(0, 0, 0, 0) >= today;
            }),

        end_date: date()
            .required("End date is required")
            .test('is-greater-or-equal', 'End date must be greater than or equal to start date', function (value) {
                const { start_date } = this.parent; // Access the start_date from parent object
                const startDate = new Date(start_date).setHours(0, 0, 0, 0);
                const endDate = new Date(value).setHours(0, 0, 0, 0);
                const today = new Date().setHours(0, 0, 0, 0);

                // Allow if both dates are today, or if end date is today or later and equal/greater than start date
                return !start_date || (endDate >= startDate && endDate >= today);
            }),
        start_time: date().nullable().optional(),  // Allow null values
        end_time: date().nullable().optional(),    // Allow null values
        // eventtype: array().of(eventTypeSchema).required('At least one event type is required'),
        Hall: array().min(1, "At least one hall must be selected").required("Hall selection is required"),
        events: array().of(object({ id: string().required('Event ID is required') })).required('At least one event is required'),
    });

    const formik = useFormik({
        validationSchema: bookingSchema,
        initialValues: {
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
            start_time: '',
            end_time: '',
            userId: session && session?.user?.id || 0,
            productId: product?.id || 0,
            events: [{ id: '' }],
            Hall: [],
        },
        onSubmit: (data, { resetForm }) => {
            const formattedData = {
                ...data,
                start_date: new Date(data.start_date),
                end_date: new Date(data.end_date),
                start_time: data.start_time ? new Date(data.start_time) : null,
                end_time: data.end_time ? new Date(data.end_time) : null,
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

    // const handleStartDateChange = (date: Date | null) => {
    //     if (date) {
    //         setStartDate(date);
    //         const nepaliDateObj = new NepaliDate(date);
    //         const nepaliFormatted = `${nepaliDateObj.getYear()}-${nepaliDateObj.getMonth() + 1}-${nepaliDateObj.getDate() + 1}`;
    //         setNepaliStartDate(nepaliFormatted);
    //     }
    // };

    // const handleEndDateChange = (date: Date | null) => {
    //     if (date) {
    //         setEndDate(date);
    //         const nepaliDateObj = new NepaliDate(date);
    //         const nepaliFormatted = `${nepaliDateObj.getYear()}-${nepaliDateObj.getMonth() + 1}-${nepaliDateObj.getDate() + 1}`;
    //         setNepaliEndDate(nepaliFormatted);
    //     }
    // };

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
            toast.success("Event request sent!");
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
                                    className={`py-2 px-3 border ${formik.touched.start_date && formik.errors.start_date ? 'border-red-500' : 'border-gray-200'} rounded`}
                                />
                                {/* <DatePicker
                                    selected={new Date(formik.values.start_date)}
                                    onChange={(date: Date) => {
                                        formik.setFieldValue('start_date', date.toISOString().split('T')[0]);
                                        handleStartDateChange({
                                            target: { value: date.toISOString().split('T')[0] },
                                        } as React.ChangeEvent<HTMLInputElement>);
                                    }}
                                    dateFormat="yyyy-MM-dd"
                                    className={`py-2 px-3 border ${formik.touched.start_date && formik.errors.start_date ? 'border-red-500' : 'border-gray-200'} rounded custom-date-input`}
                                /> */}
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
                                    className={`py-2 px-3 border ${formik.touched.end_date && formik.errors.end_date ? 'border-red-500' : 'border-gray-200'} rounded`}
                                />
                                {formik.touched.end_date && formik.errors.end_date && <div className="text-red-500 text-sm">{formik.errors.end_date}</div>}
                                {nepaliEndDate && (
                                    <div className="mt-1 text-sm text-gray-700">BS: {nepaliEndDate}</div>
                                )}

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
                                    disabled={!formik.isValid}
                                    className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white focus:outline-none ${!formik.isValid ? "bg-gray-300 text-gray-500" : "bg-red-600 text-white"}`}
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