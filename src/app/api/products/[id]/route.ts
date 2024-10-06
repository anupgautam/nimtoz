import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id), // Convert the ID to a number
            },
            include: {
                halls: {
                    select: {
                        id: true,
                        hall_capacity: true,
                        hall_name: true,
                    }
                },
                product_image: true,
                rules: true,
                amenities: true,
                event: {
                    select: {
                        start_date: true,
                        end_date: true,
                    }
                }
            }

        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }

    // return NextResponse.json(id)
}

