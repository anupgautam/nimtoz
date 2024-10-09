import type { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');

    if (!productId) {
        return new Response(JSON.stringify({ message: 'Invalid product ID' }), { status: 400 });
    }

    try {
        const halls = await prisma.hall.findMany({
            where: {
                productId: parseInt(productId, 10),
            },
        });

        if (!halls.length) {
            return new Response(JSON.stringify({ message: 'No halls found for this product' }), { status: 404 });
        }

        return new Response(JSON.stringify(halls), { status: 200 });
    } catch (error) {
        console.error('Error fetching halls:', error);
        return new Response(JSON.stringify({ message: 'Server error', error }), { status: 500 });
    }
}
