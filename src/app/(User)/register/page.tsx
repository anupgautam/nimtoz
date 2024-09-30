'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface User {
    username: string;
    email: string;
    password: string;
    role: string,
    phone_number: string,
}

const RegisterPage = () => {
    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.push('/');
        }
    }, [session, router]);
    //! Validation

    const userSchema = object({
        username: string().required("Username is required"),
        email: string().email("Invalid Email Address").required("Email is required"),
        phone_number: string()
            .required('Phone number is required')
            .matches(/^(?:\+?(\d{1,3}))?[-. ]?(\d{1,4})[-. ]?(\d{1,4})[-. ]?(\d{1,9})$/,
                'Invalid phone number format. Please enter a valid phone number.'),
        password: string().min(8, "Password must be at least 8 characters").matches(/[a-zA-Z]/, "Password must contain at least one letter").matches(/[0-9]/, "Password must contain at least one number").required("Password is required")
    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            username: '',
            email: '',
            password: '',
            phone_number: '',
            role: 'User'
        },
        onSubmit: (data, { resetForm }) => {
            registerApiCall(data, resetForm)
            console.log(data)
        }
    })

    const { errors, getFieldProps, touched } = formik

    useEffect(() => {
    }, [errors])

    const registerApiCall = async (data: User, resetForm: () => void) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log('User Successfully Created', response);
            if (response.ok) {
                router.push('/login')
            }
            else {
                console.log("Registration Failed")
            }
            resetForm();
        } catch (error) {
            console.error('Some error occured', error);
        }
    }

    return (
        <section className="min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Hide image on smaller screens */}
                <div className="relative hidden lg:flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <div className="absolute inset-0">
                        <img
                            className="h-full w-full rounded-md object-cover object-top"
                            src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2lnbnVwfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                            alt="Signup illustration"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="relative">
                        <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                            <h3 className="text-4xl font-bold text-white">
                                Now you don't have to rely on your designer to create a new page
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        User Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="User Name"
                                            id="username"
                                            {...getFieldProps('username')}
                                        />
                                        {touched.username && errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
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
                                    <label htmlFor="phone_number" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Phone Number{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Phone Number"
                                            id="phone_number"
                                            {...getFieldProps('phone_number')}
                                        />
                                        {touched.phone_number && errors.phone_number && <span className="text-red-500 text-sm">{errors.phone_number}</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
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
                                        className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${formik.isValid && formik.dirty ? 'bg-black hover:bg-black/80' : 'bg-gray-300 cursor-not-allowed'}`}
                                    >
                                        Get started <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage
