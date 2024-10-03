'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface User {
    email: string;
    password: string;
}
const LoginPage = () => {

    const { data: session } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.push('/');
        }
    }, [session, router]);

    //! Validation

    const userSchema = object({
        email: string().email("Invalid Email Address").required("Email is required"),
        password: string().min(8, "Password must be at least 8 characters").matches(/[a-zA-Z]/, "Password must contain at least one letter").matches(/[0-9]/, "Password must contain at least one number").required("Password is required")
    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (data, { resetForm }) => {
            loginApiCall(data, resetForm)
        }
    })

    const { errors, getFieldProps, touched } = formik

    useEffect(() => {
    }, [errors])

    const loginApiCall = async (data: User, resetForm: () => void) => {
        try {
            const response = await signIn('credentials', {
                ...data, // Spread the user data (email and password)
                redirect: false, // Prevent automatic redirect
            });

            if (response?.error) {
                console.error('Login failed:', response.error);
                return;
            }
            const res = await fetch('/api/auth/session');
            const session = await res.json();

            if (session?.user?.role === 'Admin') {
                router.push('/dashboard'); // Redirect admin users to the dashboard
            } else {
                router.push('/'); // Redirect regular users to the homepage
            }
            resetForm();
        } catch (error) {
            console.error('Some error occurred', error);
        }
    }

    return (
        <section className="min-h-screen">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-red-500 sm:text-4xl">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                title=""
                                className="font-semibold text-red-600 transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                            {...getFieldProps('email')}
                                        />
                                        {touched.email && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <Link
                                            href="forgot-password"
                                            title=""
                                            className="text-sm font-semibold text-red-600 hover:underline"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            {...getFieldProps('password')}
                                        />
                                        {touched.password && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
                                        className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${formik.isValid && formik.dirty ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'}`}
                                    >
                                        Get started <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* Hide image on smaller screens */}
                <div className="hidden lg:block h-full w-full">
                    <Image
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="/login.svg"
                        alt="Login page illustration"
                        height={200}
                        width={200}
                    />
                </div>
            </div>
        </section>
    )
}

export default LoginPage
