import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const blogs = await prisma.blog.findMany({
        where: {
            is_approved: true
        },
        include: {
            author: {
                select: {
                    firstname: true,
                    lastname: true,
                }
            }
        },
        orderBy: {
            updatedAt: "desc"
        }
    })
    if (blogs.length === 0) {
        return NextResponse.json({ error: "No blogs to show right now" }, { status: 404 });
    } else {
        // console.log(blogs);
        return NextResponse.json(blogs);
    }


}