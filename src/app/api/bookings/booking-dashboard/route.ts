import prisma from '@/lib/db';
import { addMonths, startOfMonth, endOfMonth, format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const result = await getBookingStats();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve booking stats' }, { status: 500 });
    }
};

// Helper function to get booking stats
async function getBookingStats() {
    const currentDate = new Date();
    const monthsArray = [];

    // Loop through the next 12 months
    for (let i = 0; i < 12; i++) {
        const currentMonth = addMonths(currentDate, i);
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);

        // Fetch events from the database for the current month
        const eventsInMonth = await prisma.event.findMany({
            where: {
                start_date: {
                    gte: monthStart,
                    lte: monthEnd,
                },
            },
        });

        // Count approved and not approved (not approved = !is_approved && !is_rejected)
        const approvedCount = eventsInMonth.filter(event => event.is_approved).length;
        const notApprovedCount = eventsInMonth.filter(event => !event.is_approved && !event.is_rejected).length;

        // Push the data into the array
        monthsArray.push({
            month: format(currentMonth, 'MMM'), // e.g., "Oct" for October
            approved: approvedCount,
            notApproved: notApprovedCount,
        });
    }

    return monthsArray;
}
