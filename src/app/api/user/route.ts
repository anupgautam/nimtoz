import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";

const userSchema = z.object({
    firstname: z.string().min(1, 'Firstname is required').max(100),
    lastname: z.string().min(1, 'Lastname is required').max(100),
    email: z.string().min(1, 'Email is required').email("Invalid email"),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have 8 characters'),
    phone_number: z.string().regex(/^(?:\+?(\d{1,3}))?[-. ]?(\d{1,4})[-. ]?(\d{1,4})[-. ]?(\d{1,9})$/, {
        message: "Invalid phone number format. Please enter a valid phone number."
    }),
})

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const { email, firstname, lastname, password, phone_number } = userSchema.parse(body);

        //! If email already exist
        const userExists = await prisma.user.findUnique({
            where: { email: email }
        })
        if (userExists) {
            return NextResponse.json({ user: null, message: "User with this email already exists." }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                role: 'User',
                phone_number,
            }
        })

        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 200 })
    } catch (err) {
        console.error(err); // Log the error for debugging
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}