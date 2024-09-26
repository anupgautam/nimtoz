'use client'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import axios from 'axios'
import Footer from '@/components/Footer/Footer'
import VenueNavbar from "@/components/Navbar/VenueNavbar/VenueNavbar"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { Venue } from '../../../types';

interface Venue {
    venue_name: string;
    venue_address: string;
    contact_person: string;
    phone_number?: string;
    email: string;
}

const RegisterVenue = () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/login');
        }
    }, [status, router]);

    if (status === "loading") {
        return null;
    }

    if (!session?.user) {
        return null;
    }

    //! Validation
    let venueSchema = object({
        // venue_name: string().required('Venue Name is required'),
        venue_name: string().required('Venue Name is required'),
        venue_address: string().required('Venue Address is required'),
        contact_person: string().required("Contact Person is required"),
        phone_number: string().matches(/^[0-9]{10}$/, 'Invalid Phone Number').nullable(),
        email: string().email('Invalid Email Address'),
    })

    const formik = useFormik({
        validationSchema: venueSchema,
        initialValues: {
            venue_name: '',
            venue_address: '',
            contact_person: '',
            phone_number: '',
            email: '',
        },
        onSubmit: (data, { resetForm }) => {
            venueApiCall(data, resetForm)
        }
    })

    const { errors, getFieldProps, touched } = formik

    useEffect(() => {
    }, [errors])

    const venueApiCall = async (data: Venue, resetForm: () => void) => {
        try {
            const response = await axios.post('/api/venue', data);
            resetForm();
        } catch (error) {
            console.error('Error registering venue:', error);
        }
    }

    return (
        <>
            <header className="z-50">
                <VenueNavbar />
            </header>
            <div className="max-w-2xl mt-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="bg-white rounded-xl shadow p-4 sm:p-7 ">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 ">
                            Register your Venue
                        </h2>
                        <p className="text-sm text-gray-600">
                            Join our platform and showcase your venue to a wide audience actively searching for spaces to host their special events. Provide your venue details and let us help you connect with clients looking for the perfect location for weddings, parties, corporate events, and more.
                        </p>
                    </div>

                    <form noValidate onSubmit={formik.handleSubmit}>
                        <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 ">
                            <div className="mt-2 space-y-3">
                                <input
                                    // id="af-payment-billing-contact venue_name"
                                    className="py-4 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                    type="text"
                                    placeholder="Venue Name"
                                    id="venue_name"
                                    {...getFieldProps('venue_name')}
                                />
                                {touched.venue_name && errors.venue_name && <span className="text-red-500 text-sm">{errors.venue_name}</span>}

                                <input
                                    className="py-4 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                    type="text"
                                    placeholder="Venue Address"
                                    id="venue_address"
                                    {...getFieldProps('venue_address')}
                                />
                                {touched.venue_address && errors.venue_address && <span className="text-red-500 text-sm">{errors.venue_address}</span>}

                                <input
                                    className="py-4 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                    type="text"
                                    placeholder="Contact Person Name"
                                    id="contact_person"
                                    {...getFieldProps('contact_person')}
                                />
                                {touched.contact_person && errors.contact_person && <span className="text-red-500 text-sm">{errors.contact_person}</span>}

                                <input
                                    className="py-4 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                    type="text"
                                    placeholder="Phone Number"
                                    id="phone_number"
                                    {...getFieldProps('phone_number')}
                                />
                                {errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number}</span>}

                                <input
                                    className="py-4 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 "
                                    type="text"
                                    placeholder="Email"
                                    id="email"
                                    {...getFieldProps('email')}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                            </div>
                        </div>
                        <div className="mt-5 flex justify-end gap-x-2">
                            <button
                                type="submit"
                                className="py-2 px-3 w-full justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Register Venue
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegisterVenue;
