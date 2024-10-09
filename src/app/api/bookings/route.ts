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
    host: 'smtp.gmail.com',
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
        const combinedStartTime = combineDateAndTime(start_date, start_time);
        const combinedEndTime = combineDateAndTime(end_date, end_time);

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

        //! With Time
        // const overlappingBooking = await prisma.event.findFirst({
        //     where: {
        //         productId: productId,
        //         OR: [
        //             // Check if the dates overlap
        //             {
        //                 AND: [
        //                     { start_date: { lt: endDate } },
        //                     { end_date: { gt: startDate } },
        //                 ],
        //             },
        //             // Check if the times overlap within the same date range
        //             combinedStartTime && combinedEndTime
        //                 ? {
        //                     AND: [
        //                         { start_date: startDate },
        //                         { end_date: endDate },
        //                         { start_time: { lt: combinedEndTime } },
        //                         { end_time: { gt: combinedStartTime } },
        //                     ],
        //                 }
        //                 : {},
        //         ],
        //     },
        // });


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

        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productId), // Assuming productId is an integer
            },
            select: {
                title: true, // Assuming the product has a 'title' field
            },
        });

        // Fetch user name by userId
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId), // Assuming userId is an integer
            },
            select: {
                email: true,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Venue Booking Request',
            text: 'You have received a new venue booking request.',
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                        .container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #333;
                        }
                        .details {
                            margin-top: 20px;
                        }
                        .details th {
                            text-align: left;
                            padding: 5px;
                        }
                        .details td {
                            padding: 5px;
                        }
                        .footer {
                            margin-top: 20px;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>New Venue Booking Request</h1>
                        <p>You have received a new booking request. Here are the details:</p>
                        <table class="details">
                            <tr>
                                <th>Start Date:</th>
                                <td>${newBooking.start_date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })}</td>
                            </tr>
                            <tr>
                                <th>End Date:</th>
                                <td>${newBooking.end_date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })}</td>
                            </tr>
                            <tr>
                                <th>Start Time:</th>
                                <td>${newBooking.start_time ? newBooking.start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}</td>
                            </tr>
                            <tr>
                                <th>End Time:</th>
                                <td>${newBooking.end_time ? newBooking.end_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""} </td>
                    </tr>
                    <tr>
                    <th>User Name: </th>
                        <td> ${user?.email}</td>
                            </tr>
                            <tr>
                            <th>Product Name: </th>
                                <td> ${product?.title} </td>
                                    </tr>
                                    </table>
                                    <p> Please review and approve the booking at your earliest convenience.</p>
                                        <div class="footer">
                                            <p>Thank you! </p>
                                                </div>
                                                </div>
                                                </body>
                                                </html>
                                                    `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ booking: newBooking }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}
