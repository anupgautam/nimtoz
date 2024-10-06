import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const eventtypes = await prisma.eventType.findMany()

    return NextResponse.json(eventtypes)
}