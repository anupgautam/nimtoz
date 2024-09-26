import crypto from 'crypto';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server'; // For response handling in app directory
import nodemailer from 'nodemailer';

// POST request handler for forgot-password API
export async function POST(req: Request) {
    const { email } = await req.json(); // Use `req.json()` to parse the body

    try {
        // 1. Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 400 });
        }

        // 2. Generate a token and expiration
        const token = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

        // 3. Store the token and expiry in the user record
        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: token,
                resetPasswordTokenExpiry: tokenExpiry,
            },
        });

        // 4. Send email with reset link
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Gmail email address
                pass: process.env.EMAIL_PASS, // Gmail app password
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `
        <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; text-align: center;">
            <div style="max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">Reset Your Password</h2>
                <p style="font-size: 16px; color: #555;">
                    You requested to reset your password. Click the button below to create a new password:
                </p>
                <a href="${resetLink}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
                <p style="font-size: 14px; color: #777;">
                    If you did not request a password reset, please ignore this email.
                </p>
                <p style="font-size: 14px; color: #777;">
                    Thank you,<br>Nimtoz
                </p>
            </div>
        </div>
    `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
