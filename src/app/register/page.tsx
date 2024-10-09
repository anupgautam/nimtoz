'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { toast } from 'react-toastify';

interface User {
    firstname: string;
    lastname: string;
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
        firstname: string().required("FirstName is required"),
        lastname: string().required("LastName is required"),
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
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone_number: '',
            role: 'User'
        },
        onSubmit: (data, { resetForm }) => {
            registerApiCall(data, resetForm)
        }
    })

    const { errors, getFieldProps, touched } = formik

    useEffect(() => {
    }, [errors])

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Step 2: Toggle password visibility function
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };


    const registerApiCall = async (data: User, resetForm: () => void) => {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            toast.success("User Successfully Created");
            if (response.ok) {
                router.push('/login')
            }
            else {
                toast.error("Registration Failed")
            }
            resetForm();
        } catch (error) {
            toast.error("Backend Error")
        }
    }



    return (
        <section className="h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Hide image on smaller screens */}
                {/* <div className="relative hidden lg:flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <div className="absolute inset-0">
                        <Image
                            className="h-full w-full rounded-md object-cover object-top"
                            src="/register.svg"
                            alt="Register Illusratation"
                            height={100}
                            width={100}

                        />
                    </div>
                </div> */}
                <div className="relative hidden lg:flex items-end h-[900px] w-[700px] px-4 pb-5 pt-5 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <Image
                        className="h-full w-full rounded-md object-cover object-top"
                        src="/register.svg"
                        alt="Register Illustration"
                        width={100}
                        height={100}
                    />
                </div>

                <div className="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-orange-500 sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                title=""
                                className="font-medium text-orange-600 transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        First Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="First Name"
                                            id="firstname"
                                            {...getFieldProps('firstname')}
                                        />
                                        {touched.firstname && errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Last Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Last Name"
                                            id="lastname"
                                            {...getFieldProps('lastname')}
                                        />
                                        {touched.lastname && errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
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
                                    <div className="mt-2 relative">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            placeholder="Password"
                                            id="password"
                                            {...getFieldProps('password')}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 focus:mb-1 transform -translate-y-1/2"
                                            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                        >
                                            {isPasswordVisible ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-700">
                                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                    <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                                </svg>

                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-700">
                                                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                                </svg>

                                            )}
                                        </button>
                                        {touched.password && errors.password && <span className="text-orange-500 text-sm">{errors.password}</span>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={!formik.isValid || !formik.dirty} // Disable button if form is invalid or untouched
                                        className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${formik.isValid && formik.dirty ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
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
