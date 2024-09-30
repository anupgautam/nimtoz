// pages/api/posts/create.ts
import prisma from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files, File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: Fields; files: Files }> => {
    const form = new formidable.IncomingForm({
        uploadDir: './public/uploads',
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

// Type-safe handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Parse form data (fields and files)
        const { fields, files } = await parseForm(req);

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const author = Array.isArray(fields.author) ? fields.author[0] : fields.author; // Assuming author is the ID of a User

        const imageFile = files.image as File | undefined;

        const shortDesc = title.split(" ").slice(0, 2).join(" ");

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ message: 'Title is required and must be a string.' });
        }
        if (!description || typeof description !== 'string') {
            return res.status(400).json({ message: 'Content is required and must be a string.' });
        }

        let imageUrl: string | null = null;
        if (imageFile) {
            const oldPath = imageFile.filepath;
            const newFileName = imageFile.originalFilename ? imageFile.originalFilename : 'uploaded-image';
            const newPath = path.join('./public/uploads', newFileName);
            fs.renameSync(oldPath, newPath); // Move the file to the desired location
            imageUrl = `/uploads/${newFileName}`; // Store the relative image URL
        }

        // Create post using Prisma
        const blog = await prisma.blog.create({
            data: {
                title: title,
                short_description: shortDesc,
                description: description,
                author: author ?? "Unknown author",
                image: imageUrl || '', // If image upload fails or is missing, store an empty string
            },
        });

        res.status(201).json(blog);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
