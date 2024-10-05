import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

    const category = await prisma.category.findMany({
        orderBy: {
            updatedAt: "desc"
        }
    })

    return NextResponse.json(category);
}
