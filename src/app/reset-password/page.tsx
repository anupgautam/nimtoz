'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react'

interface ForgotPassword {
    password: string;
}

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [message, setMessage] = useState('');

    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user) {
            router.push('/');
        }
    }, [session, router]);

    //! Validation

    const userSchema = object({
        password: string().min(8, "Password must be at least 8 characters").matches(/[a-zA-Z]/, "Password must contain at least one letter").matches(/[0-9]/, "Password must contain at least one number").required("Password is required")
    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            password: '',
        },
        onSubmit: (data, { resetForm }) => {
            resetPasswordApiCall(data, resetForm)
        }
    })

    const { errors, getFieldProps, touched } = formik

    useEffect(() => {
    }, [errors])

    const resetPasswordApiCall = async (data: ForgotPassword, resetForm: () => void) => {
        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
                router.push('/login');
            } else {
                setMessage('');
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
                    <h1 className="block text-2xl font-bold text-gray-800">Reset password</h1>
                    {/* <p className="mt-2 text-sm text-gray-600 ">
                        Remember your password?
                        <Link className="text-blue-600 decoration-2 hover:underline focus:outline-none font-" href="/login">
                            Sign in here
                        </Link>
                    </p> */}
                </div>

                <div className="mt-5">
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        aria-describedby="password-error"
                                        placeholder='Password'
                                        {...getFieldProps('password')}
                                    />
                                    {touched.password && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
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
