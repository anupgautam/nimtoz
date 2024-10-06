import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.query;

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (!productId || typeof productId !== 'string') {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        // Fetch halls associated with the productId
        const halls = await prisma.hall.findMany({
            where: {
                productId: parseInt(productId, 10),
            },
        });

        if (!halls.length) {
            return res.status(404).json({ message: 'No halls found for this product' });
        }

        // Return the list of halls
        return res.status(200).json(halls);
    } catch (error) {
        console.error('Error fetching halls:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
}
