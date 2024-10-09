'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface ForgotPassword {
    password: string;
}

const ResetPasswordComponent = () => {
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

    // Validation Schema
    const userSchema = object({
        password: string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-zA-Z]/, "Password must contain at least one letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .required("Password is required"),
    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            password: '',
        },
        onSubmit: (data, { resetForm }) => {
            resetPasswordApiCall(data, resetForm);
        },
    });

    const { errors, getFieldProps, touched } = formik;

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
                toast.success("Password reset successful.");
            } else {
                setMessage(''); // Set appropriate error message based on result
            }
            resetForm();
        } catch (error) {
            toast.error("Backend error");
        }
    };

    return (
        <section className="min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                <div className="relative hidden lg:flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <div className="absolute inset-0">
                        <Image
                            className="h-full w-full rounded-md object-cover object-top"
                            src="/resetpassword.svg"
                            alt="Reset Password Illustration"
                            height={200}
                            width={200}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h1 className="text-3xl font-bold leading-tight text-orange-500 sm:text-4xl">Reset password</h1>
                        <p className="mt-2 text-base text-gray-600">
                            Remember your password?{' '}
                            <Link
                                href="/login"
                                title=""
                                className="font-medium text-orange-500 hover:text-orange-600 transition-all duration-200 hover:underline"
                            >
                                Log In
                            </Link>
                        </p>

                        <div className="mt-5">
                            <form noValidate onSubmit={formik.handleSubmit}>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                id="password"
                                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none"
                                                aria-describedby="password-error"
                                                placeholder='Password'
                                                {...getFieldProps('password')}
                                            />
                                            {touched.password && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
                                            className={`inline-flex w-full items-center justify-center rounded-md mt-4 px-3.5 py-2.5 font-semibold leading-7 text-white ${formik.isValid && formik.dirty ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
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
            </div >
        </section >
    );
};

export default function ResetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordComponent />
        </Suspense>
    );
}
