// src/app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import nodemailer from 'nodemailer';

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_BASE_URL,
    port: 587, // Usually 587 for TLS
    secure: false, // Set to true for port 465
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});
// Handle POST requests
export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse the incoming JSON body

        const {
            start_date,
            end_date,
            start_time,
            end_time,
            userId,
            productId,
            events,
            Hall,
        } = body;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const overlappingBooking = await prisma.event.findFirst({
            where: {
                productId: productId,
                OR: [
                    {
                        start_date: {
                            lt: endDate,
                        },
                        end_date: {
                            gt: startDate,
                        },
                    },
                ],
            },
        });

        if (overlappingBooking) {
            const startDateFormatted = new Date(start_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const endDateFormatted = new Date(end_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            return NextResponse.json({ message: `Booking already exists for ${startDateFormatted} to ${endDateFormatted}` }, { status: 409 });
        }

        // Insert the booking into the Event model
        const newBooking = await prisma.event.create({
            data: {
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                start_time: start_time ? new Date(start_time) : null,
                end_time: end_time ? new Date(end_time) : null,
                userId: parseInt(userId),
                productId: parseInt(productId),
                is_approved: false, // Default to false until approval
                is_rejected: false,
                EventType: {
                    connect: events.map((event: { id: string }) => ({ id: parseInt(event.id) })),
                },
                Hall: {
                    connect: Hall.map((hallId: string) => ({ id: parseInt(hallId) })),
                },
            },
        });

        // const mailOptions = {
        //     from: process.env.EMAIL_USER, // Sender address
        //     to: process.env.EMAIL_USER, // Recipient address (can be dynamic based on user)
        //     subject: 'Venue Booking Detail',
        //     text: 'Venue Availability',
        //     html: `<p>Venue Availability</p>`,
        // };

        // await transporter.sendMail(mailOptions);

        return NextResponse.json({ booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}
