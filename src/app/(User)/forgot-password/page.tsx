'use client'

import Link from 'next/link';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ForgotPassword {
    email: string;
}

export default function ForgotPassword() {

    const [message, setMessage] = useState('')
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.push('/');
        }
    }, [session, router]);

    //! Validation

    const userSchema = object({
        email: string().email("Invalid Email Address").required("Email is required"),
    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            email: '',
        },
        onSubmit: (data, { resetForm }) => {
            resetPasswordApiCall(data, resetForm);
        },
    });

    const { errors, getFieldProps, touched } = formik

    useEffect(() => {
    }, [errors])

    const resetPasswordApiCall = async (data: ForgotPassword, resetForm: () => void) => {
        try {
            const res = await fetch('/api/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
                setMessage('Check your email for a reset link.');
                router.push('/reset-password');
            } else {
                setMessage('Failed to send email.');
            }
            resetForm();
        } catch (error) {
            console.error('Some error occurred', error);
        }
    };



    return (
        <section className="min-h-screen">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h1 className="text-3xl font-bold leading-tight text-red-500 sm:text-4xl">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Remember your password?{' '}
                            <Link className="text-red-700 hover:underline focus:outline-none font-" href="/login">
                                Sign in here
                            </Link>
                        </p>

                        <div className="mt-5">
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none"
                                                aria-describedby="email-error"
                                                placeholder='Email'
                                                {...getFieldProps('email')}
                                            />
                                            {touched.email && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
                                            className={`inline-flex w-full items-center justify-center rounded-md mt-4 px-3.5 py-2.5 font-semibold leading-7 text-white ${formik.isValid && formik.dirty ? 'bg-red-600 hover:red-700' : 'bg-gray-300 cursor-not-allowed'}`}
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                </div>
                {/* Hide image on smaller screens */}
                <div className="hidden lg:block h-full w-full">
                    <Image
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="/forgotpassword.svg"
                        alt="Login page illustration"
                        height={200}
                        width={200}
                    />
                </div>
            </div>
        </section>

    );
}
