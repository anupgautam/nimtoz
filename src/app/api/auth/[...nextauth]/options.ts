import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from 'next-auth/providers/github'
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
                username: {
                    label: "Username:",
                    type: 'text',
                    placeholder: 'Username'
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
                    return null;
                }
                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })

                console.log("Existing User",existingUser?.role)

                if (!existingUser) {
                    return NextResponse.json({
                        message: "Email not found."
                    }, { status: 400 });
                }

                const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: existingUser.id,
                    username: existingUser.username,
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
                token.username = user.username
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
                session.user.username = token.username
                session.user.role = token.role
            }
            return session;

        },
    }

}