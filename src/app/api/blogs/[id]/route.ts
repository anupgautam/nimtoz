import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(id), // Convert the ID to a number
            },
            include: {
                author: {
                    select: {
                        firstname: true,
                        lastname: true,
                    }
                }
            }
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }

    // return NextResponse.json(id)
}

