import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextResponse } from "next/server";

export const options: NextAuthOptions = {
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                firstname: {
                    label: "Firstname:",
                    type: 'text',
                    placeholder: 'Firstname'
                },
                lastname: {
                    label: "Lastname:",
                    type: 'text',
                    placeholder: 'Lastname'
                },
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "someone@gmail.com"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: 'password'
                }
            },
            async authorize(credentials: any): Promise<any> {
                //! Validate input types
                if (!credentials?.email || !credentials?.password) {
                    // return null;
                    throw new Error("Email and password are required")
                }
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })


                if (!existingUser) {
                    return NextResponse.json({
                        message: "Email not found."
                    }, { status: 400 });
                }

                const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    // return null;
                    throw new Error("Incorrect Password")
                }

                return {
                    id: existingUser.id,
                    firstname: existingUser.firstname,
                    lastname: existingUser.lastname,
                    role: existingUser.role,
                    email: existingUser.email
                }
            }
        })
    ],

    adapter: PrismaAdapter(prisma),
    //! Custom
    pages: {

        signIn: '/login',
        signOut: '/login',
        // signIn: '/auth/sign-in',
        error: '/error',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id.toString();
                token.firstname = user.firstname
                token.lastname = user.lastname
                token.role = user.role
                // return {
                //     ...token,
                //     username: user.username
                // }
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.firstname = token.firstname
                session.user.lastname = token.lastname
                session.user.role = token.role
            }
            return session;

        },
    }

}