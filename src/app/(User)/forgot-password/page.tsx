'use client'

import Link from 'next/link';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

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
        <div className="mt-36 bg-white border border-gray-200 rounded-xl shadow-sm max-w-md mx-auto">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Forgot password?</h1>
                    <p className="mt-2 text-sm text-gray-600 ">
                        Remember your password?
                        <Link className="text-blue-600 decoration-2 hover:underline focus:outline-none font-" href="/login">
                            Sign in here
                        </Link>
                    </p>
                </div>

                <div className="mt-5">
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        aria-describedby="email-error"
                                        placeholder='Email'
                                        {...getFieldProps('email')}
                                    />
                                    {touched.email && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
                                    className={`inline-flex w-full items-center justify-center rounded-md mt-4 px-3.5 py-2.5 font-semibold leading-7 text-white ${formik.isValid && formik.dirty ? 'bg-black hover:bg-black/80' : 'bg-gray-300 cursor-not-allowed'}`}
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

    );
}
