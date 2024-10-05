import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';

    // Build the `where` condition dynamically
    const whereClause: any = {};

    if (search) {
        whereClause.title = {
            contains: search,
        };
    }

    if (category) {
        whereClause.category = {
            category_name: category,
        };
    }

    // Fetch the products based on the query parameters (all products if no filter is provided)
    const products = await prisma.product.findMany({
        where: Object.keys(whereClause).length ? whereClause : undefined,
        include: { product_image: true },
        orderBy:{
            updatedAt:"desc"
        }
    });

    // Respond with the products
    return NextResponse.json(products);
}


