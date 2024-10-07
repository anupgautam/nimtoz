import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const GET = async () => {
    try {
        // Fetch the counts of users, blogs, event types, and products from the database
        const [userCount, blogCount, eventTypeCount, productCount] = await Promise.all([
            prisma.user.count(),
            prisma.blog.count(),
            prisma.eventType.count(),
            prisma.product.count(),
        ]);

        return NextResponse.json({
            users: userCount,
            blogs: blogCount,
            eventTypes: eventTypeCount,
            products: productCount,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};
