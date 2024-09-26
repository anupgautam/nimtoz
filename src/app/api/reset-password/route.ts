import { hash } from 'bcryptjs'; // For password hashing
import prisma from '@/lib/db'; // Ensure this points to your Prisma client
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json(); // Parse the JSON body

        // Your existing logic for finding user and resetting password
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid or expired token' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const hashedPassword = await hash(password, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpiry: null,
            },
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
