import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const blogs = await prisma.blog.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
        },
        orderBy: {
            updatedAt: "desc"
        },
        take: 5,
    })
    if (blogs.length === 0) {
        return NextResponse.json({ error: "No blogs to show right now" }, { status: 404 });
    } else {
        // console.log(blogs);
        return NextResponse.json(blogs);
    }


}