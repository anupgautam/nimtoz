// src/app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import nodemailer from 'nodemailer';

function combineDateAndTime(dateString: any, timeString: any) {
    // Check if the time is valid
    if (!timeString) return null;

    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date(dateString);

    // Set the hours and minutes
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

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

        console.log("Initial data", body)
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const combinedStartTime = combineDateAndTime(start_date, start_time);
        const combinedEndTime = combineDateAndTime(end_date, end_time);

        console.log("Change time", combinedStartTime, combinedEndTime)

        // const overlappingBooking = await prisma.event.findFirst({
        //     where: {
        //         productId: productId,
        //         OR: [
        //             {
        //                 start_date: {
        //                     lt: endDate,
        //                 },
        //                 end_date: {
        //                     gt: startDate,
        //                 },
        //             },
        //         ],
        //     },
        // });

        //! With Time
        const overlappingBooking = await prisma.event.findFirst({
            where: {
                productId: productId,
                OR: [
                    // Check if the dates overlap
                    {
                        AND: [
                            { start_date: { lt: endDate } },
                            { end_date: { gt: startDate } },
                        ],
                    },
                    // Check if the times overlap within the same date range
                    combinedStartTime && combinedEndTime
                        ? {
                            AND: [
                                { start_date: startDate },
                                { end_date: endDate },
                                { start_time: { lt: combinedEndTime } },
                                { end_time: { gt: combinedStartTime } },
                            ],
                        }
                        : {},
                ],
            },
        });


        //! Midnight check
        // const overlappingBooking = await prisma.event.findFirst({
        //     where: {
        //         productId: productId,
        //         OR: [
        //             // Date overlap check
        //             {
        //                 AND: [
        //                     { start_date: { lt: endDate } },
        //                     { end_date: { gt: startDate } },
        //                 ],
        //             },
        //             // Time overlap for the same date
        //             {
        //                 AND: [
        //                     { start_date: { equals: startDate } },
        //                     { end_date: { equals: endDate } },
        //                     { start_time: { lt: combinedEndTime } },
        //                     { end_time: { gt: combinedStartTime } },
        //                 ],
        //             },
        //             // Midnight crossing check
        //             {
        //                 AND: [
        //                     { start_date: { lte: endDate } },
        //                     { end_date: { gte: startDate } },
        //                     { start_time: { lt: combinedEndTime } },
        //                     { end_time: { gte: combinedStartTime } },
        //                 ],
        //             },
        //         ],
        //     },
        // });

        if (overlappingBooking) {
            const startDateFormatted = new Date(startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const endDateFormatted = new Date(endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const startTimeFormatted = combinedStartTime; // Assuming combinedStartTime is in 'HH:mm' format
            const endTimeFormatted = combinedEndTime; // Assuming combinedEndTime is in 'HH:mm' format

            return NextResponse.json(
                {
                    message: `Booking already exists from ${startDateFormatted} ${startTimeFormatted} to ${endDateFormatted} ${endTimeFormatted}`,
                },
                { status: 409 }
            );
        }

        // Insert the booking into the Event model
        const newBooking = await prisma.event.create({
            data: {
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                start_time: combinedStartTime,
                end_time: combinedEndTime,
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
