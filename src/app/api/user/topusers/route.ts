// pages/api/top-users.ts
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // Fetch the top 3 users who have booked the most approved events
        const topUsers = await prisma.user.findMany({
            take: 3,
            orderBy: {
                events_booked: {
                    _count: 'desc',
                },
            },
            where: {
                events_booked: {
                    some: {
                        is_approved: true,
                    },
                },
            },
            select: {
                firstname: true,
                lastname: true,
                events_booked: true,
            },
        });

        return NextResponse.json(topUsers, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch top users" })
    }
}
