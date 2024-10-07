import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const categoriesWithProductCount = await prisma.category.findMany({
        select: {
            category_name: true,
            _count: {
                select: {
                    products: true, // Assuming 'products' is the relation name in your Prisma schema
                }
            }
        },
        orderBy: {
            updatedAt: "desc"
        }
    });

    return NextResponse.json(categoriesWithProductCount);
}
