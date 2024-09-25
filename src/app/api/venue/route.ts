import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
    try {
        const venues = await prisma.venue.findMany();
        return NextResponse.json(venues, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching venues' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    try {
        const newVenue = await prisma.venue.create({
            data: body,
        });
        return NextResponse.json(newVenue, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating venue' }, { status: 500 });
    }
}

// For PUT and DELETE, you may create a dynamic route file `app/api/venue/[id]/route.ts`

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    try {
        const updatedVenue = await prisma.venue.update({
            where: { id: Number(id) },
            data: body,
        });
        return NextResponse.json(updatedVenue, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating venue' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await prisma.venue.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({ message: 'Venue deleted' }, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting venue' }, { status: 500 });
    }
}
